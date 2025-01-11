import html2canvas from 'html2canvas';
import { Theme } from '../types/theme';
import { ImageWidth } from '../types/imageWidth';

interface ClipboardError extends Error {
  code?: number;
  name: string;
}

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

const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

const copyImageToClipboardIOS = async (element: HTMLElement): Promise<void> => {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }

  try {
    document.execCommand('copy');
  } catch (error) {
    throw new Error('Failed to copy image on iOS');
  } finally {
    if (selection) {
      selection.removeAllRanges();
    }
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

  if (isIOS()) {
    await copyImageToClipboardIOS(element);
    return;
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

      // Create ClipboardItem and write to clipboard
      const clipboardItem = new ClipboardItem({
        [blob.type]: blob
      });

      await navigator.clipboard.write([clipboardItem]);
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
