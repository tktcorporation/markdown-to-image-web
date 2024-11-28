import html2canvas from 'html2canvas';
import { Theme } from '../types/theme';
import { ImageWidth } from '../types/imageWidth';

const validateInput = (element: HTMLElement) => {
  if (!element) throw new Error('No element provided for export');
  if (!element.innerHTML.trim()) throw new Error('No content to export');
};

const getOptimalScale = (): number => {
  return Math.max(1, window.devicePixelRatio || 1);
};

const prepareClone = (element: HTMLElement, width: number): HTMLElement => {
  const clone = element.cloneNode(true) as HTMLElement;
  
  clone.style.width = `${width}px`;
  clone.style.height = 'auto';
  clone.style.position = 'absolute';
  clone.style.top = '0';
  clone.style.left = '0';
  clone.style.visibility = 'hidden';
  clone.style.backgroundColor = '#ffffff';
  clone.style.padding = '20px';
  
  return clone;
};

const waitForImages = async (document: Document): Promise<void> => {
  const images = document.getElementsByTagName('img');
  const imagePromises = Array.from(images).map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  });
  await Promise.all(imagePromises);
};

export const exportToImage = async (
  element: HTMLElement, 
  theme: Theme,
  width: ImageWidth
): Promise<void> => {
  try {
    validateInput(element);

    const contentWidth = element.scrollWidth;
    const targetWidth = width.value === 'auto' ? contentWidth : width.value;
    const scale = getOptimalScale();

    const clone = prepareClone(element, targetWidth);
    document.body.appendChild(clone);

    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      await waitForImages(document);

      const contentHeight = clone.scrollHeight;
      if (contentHeight === 0) throw new Error('Content has no height');

      const canvas = await html2canvas(clone, {
        backgroundColor: theme.background,
        scale: scale,
        useCORS: true,
        logging: false,
        width: targetWidth,
        height: contentHeight,
        windowWidth: targetWidth,
        onclone: (clonedDoc) => waitForImages(clonedDoc)
      });

      const context = canvas.getContext('2d');
      if (!context) throw new Error('Failed to get canvas context');

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData.data.some(pixel => pixel !== 0)) {
        throw new Error('Generated image is empty');
      }

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

      const link = document.createElement('a');
      const widthLabel = width.value === 'auto' ? 'preview' : `${width.value}px`;
      link.download = `markdown-export-${widthLabel}-${Date.now()}.png`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    } finally {
      if (clone.parentNode) {
        document.body.removeChild(clone);
      }
    }
  } catch (error) {
    console.error('Error exporting image:', error);
    throw error instanceof Error ? error : new Error('Failed to export image');
  }
};