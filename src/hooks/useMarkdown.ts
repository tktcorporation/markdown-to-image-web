import { useState, useCallback, useEffect } from 'react';
import { processMarkdownForPreview, processMarkdownForExport } from '../utils/markdownProcessor';

export const useMarkdown = (initialMarkdown: string = '') => {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [previewHtml, setPreviewHtml] = useState('');
  const [exportHtml, setExportHtml] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!markdown.trim()) {
        setPreviewHtml('<p>Enter some markdown to see the preview</p>');
        setExportHtml('<p>Enter some markdown to see the preview</p>');
        return;
      }

      const preview = processMarkdownForPreview(markdown);
      const exportVersion = processMarkdownForExport(markdown);
      
      setPreviewHtml(preview);
      setExportHtml(exportVersion);
      setError(null);
    } catch (err) {
      console.error('Error processing markdown:', err);
      setError('Error processing markdown');
      setPreviewHtml('<p>Error processing markdown</p>');
      setExportHtml('<p>Error processing markdown</p>');
    }
  }, [markdown]);

  const updateMarkdown = useCallback((newMarkdown: string) => {
    setMarkdown(newMarkdown);
  }, []);

  return {
    markdown,
    previewHtml,
    exportHtml,
    error,
    updateMarkdown
  };
};