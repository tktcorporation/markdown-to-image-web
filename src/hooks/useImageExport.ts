import { useState, useCallback } from 'react';
import { Theme } from '../types/theme';
import { ImageService } from '../services/ImageService';
import { useToast } from './useToast';

export function useImageExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const { toast } = useToast();

  const handleExport = useCallback(async (element: HTMLElement) => {
    if (!element) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No content to export",
      });
      return;
    }

    setIsExporting(true);
    try {
      await ImageService.exportImage({ 
        element, 
        markdown: '', // We don't need markdown for the filename in this case
        theme: {} as Theme // Theme will be handled by the current styles
      });
      toast({
        title: "Success",
        description: "Image exported successfully",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to export image';
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  }, [toast]);

  const handleCopy = useCallback(async (element: HTMLElement) => {
    if (!element) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No content to copy",
      });
      return;
    }

    setIsCopying(true);
    try {
      await ImageService.copyToClipboard({ 
        element,
        markdown: '', // We don't need markdown for copying
        theme: {} as Theme // Theme will be handled by the current styles
      });
      toast({
        title: "Success",
        description: "Image copied to clipboard",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to copy image';
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
      console.error('Copy failed:', error);
    } finally {
      setIsCopying(false);
    }
  }, [toast]);

  return {
    isExporting,
    isCopying,
    handleExport,
    handleCopy
  };
}