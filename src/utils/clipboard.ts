import html2canvas from 'html2canvas';
import { Theme } from '../types/theme';
import { ImageWidth } from '../types/imageWidth';

interface ClipboardError extends Error {
  code?: number;
  name: string;
}

const blobToDataURL = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read image data'));
    reader.readAsDataURL(blob);
  });

const getDetailedErrorMessage = (error: ClipboardError): string => {
  switch (error.name) {
    case 'NotAllowedError':
      return 'Permission denied: The clipboard operation was not allowed. This might be because:\n' +
             '- The page is not secure (HTTPS)\n' +
             '- Clipboard permission was not granted\n' +
             '- The browser does not support clipboard access';
    case 'SecurityError':
      return 'Security error: The operation was blocked due to security restrictions';
    case 'NotFoundError':
      return 'The clipboard API is not available in this browser';
    case 'DataError':
      return 'Failed to process the image data for clipboard';
    default:
      return `Clipboard error: ${error.message || 'Unknown error occurred'}`;
  }
};

export const copyImageToClipboard = async (
  element: HTMLElement, 
  theme: Theme,
  width: ImageWidth
): Promise<void> => {
  if (!navigator.clipboard) {
    throw new Error('Clipboard API is not supported in this browser');
  }

  if (!element) {
    throw new Error('No element provided for copying');
  }

  try {
    // Get the content width and calculate the scale
    const contentWidth = element.scrollWidth;
    const targetWidth = width.value === 'auto' ? contentWidth : width.value;
    const scale = targetWidth / contentWidth;

    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = `${targetWidth}px`;
    clone.style.visibility = 'hidden';
    clone.style.position = 'absolute';
    document.body.appendChild(clone);

    try {
      // Create canvas with proper dimensions
      const canvas = await html2canvas(clone, {
        backgroundColor: theme.background,
        scale: Math.max(scale, 1),
        useCORS: true,
        logging: false,
        width: targetWidth,
        height: Math.round(element.scrollHeight * scale),
        windowWidth: targetWidth,
        onclone: (document) => {
          // Ensure all images are loaded
          const images = document.getElementsByTagName('img');
          return Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });
          }));
        }
      });

      // Convert canvas to blob
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

      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard.write) {
        const clipboardItem = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([clipboardItem]);
      } else {
        const dataUrl = await blobToDataURL(blob);
        await navigator.clipboard.writeText(dataUrl);
      }
    } catch (error) {
      throw new Error(`Failed to process image: ${(error as Error).message}`);
    } finally {
      // Clean up the clone
      document.body.removeChild(clone);
    }
  } catch (error) {
    const detailedMessage = getDetailedErrorMessage(error as ClipboardError);
    console.error('Clipboard operation failed:', error);
    throw new Error(detailedMessage);
  }
};