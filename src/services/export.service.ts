import { Theme } from '../types/theme';
import { ImageWidth } from '../types/imageWidth';
import { exportToImage } from '../utils/imageExporter';
import { copyImageToClipboard } from '../utils/clipboard';

export class ExportService {
  static async exportImage(
    element: HTMLElement,
    theme: Theme,
    width: ImageWidth
  ): Promise<void> {
    if (!element) throw new Error('No element provided for export');
    return exportToImage(element, theme, width);
  }

  static async copyToClipboard(
    element: HTMLElement,
    theme: Theme,
    width: ImageWidth
  ): Promise<void> {
    if (!element) throw new Error('No element provided for copying');
    return copyImageToClipboard(element, theme, width);
  }
}