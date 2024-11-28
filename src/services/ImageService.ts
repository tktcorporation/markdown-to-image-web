import { Theme } from '../types/theme';
import html2canvas from 'html2canvas';
import { extractTitleFromMarkdown } from '../utils/titleExtractor';

interface ImageProcessingOptions {
  element: HTMLElement;
  theme: Theme;
  markdown: string;
  scale?: number;
  quality?: number;
}

interface ProcessedImage {
  blob: Blob;
  width: number;
  height: number;
}

export class ImageService {
  private static validateElement(element: HTMLElement): void {
    if (!element) {
      throw new Error('No element provided for processing');
    }
    if (!element.innerHTML.trim()) {
      throw new Error('Element has no content');
    }
  }

  private static async waitForImages(document: Document): Promise<void> {
    const images = Array.from(document.getElementsByTagName('img'));
    await Promise.all(
      images.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            })
      )
    );
  }

  private static async waitForFonts(): Promise<void> {
    if ('fonts' in document) {
      await document.fonts.ready;
    }
  }

  private static async processElement(element: HTMLElement): Promise<HTMLCanvasElement> {
    await Promise.all([
      this.waitForFonts(),
      this.waitForImages(document),
      new Promise(resolve => setTimeout(resolve, 100))
    ]);

    const scale = Math.max(window.devicePixelRatio || 1, 2);
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      onclone: async (doc) => {
        await this.waitForImages(doc);
        await this.waitForFonts();
      }
    });

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const hasContent = imageData.data.some((pixel, index) => index % 4 === 3 && pixel !== 0);
    
    if (!hasContent) {
      throw new Error('Generated image is empty');
    }

    return canvas;
  }

  static async processImage(options: ImageProcessingOptions): Promise<ProcessedImage> {
    this.validateElement(options.element);

    const canvas = await this.processElement(options.element);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob && blob.size > 0) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create valid image blob'));
          }
        },
        'image/png',
        1.0
      );
    });

    return {
      blob,
      width: canvas.width,
      height: canvas.height
    };
  }

  static async exportImage(options: ImageProcessingOptions): Promise<void> {
    const { blob } = await this.processImage(options);
    const title = extractTitleFromMarkdown(options.markdown);
    
    const link = document.createElement('a');
    link.download = `${title}-${Date.now()}.png`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }

  static async copyToClipboard(options: ImageProcessingOptions): Promise<void> {
    if (!navigator.clipboard) {
      throw new Error('Clipboard API is not supported in this browser');
    }

    const { blob } = await this.processImage(options);
    const clipboardItem = new ClipboardItem({ [blob.type]: blob });
    await navigator.clipboard.write([clipboardItem]);
  }
}