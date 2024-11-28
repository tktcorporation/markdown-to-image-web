import { useState, useCallback } from 'react';
import { Theme } from '../types/theme';
import { ImageWidth } from '../types/imageWidth';
import { ExportService } from '../services/export.service';

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const handleExport = useCallback(async (
    element: HTMLElement,
    theme: Theme,
    width: ImageWidth
  ) => {
    setIsExporting(true);
    try {
      await ExportService.exportImage(element, theme, width);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  }, []);

  const handleCopy = useCallback(async (
    element: HTMLElement,
    theme: Theme,
    width: ImageWidth
  ) => {
    setIsCopying(true);
    try {
      await ExportService.copyToClipboard(element, theme, width);
    } catch (error) {
      console.error('Copy failed:', error);
    } finally {
      setIsCopying(false);
    }
  }, []);

  return {
    isExporting,
    isCopying,
    handleExport,
    handleCopy
  };
}