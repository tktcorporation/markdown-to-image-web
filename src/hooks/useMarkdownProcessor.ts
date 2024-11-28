import { marked } from 'marked';

interface MarkdownProcessorOptions {
  breaks?: boolean;
  gfm?: boolean;
  mangle?: boolean;
}

const defaultOptions: MarkdownProcessorOptions = {
  breaks: true,
  gfm: true,
  mangle: false,
};

const processMarkdownBase = (markdown: string, options: MarkdownProcessorOptions = {}): string => {
  try {
    const mergedOptions = { ...defaultOptions, ...options };
    return marked(markdown, mergedOptions);
  } catch (error) {
    console.error('Error processing markdown:', error);
    return '<p>Error processing markdown</p>';
  }
};

export const processMarkdownForPreview = (markdown: string): string => {
  return processMarkdownBase(markdown, defaultOptions);
};

export const processMarkdownForExport = (markdown: string): string => {
  return processMarkdownBase(markdown, {
    ...defaultOptions,
    mangle: false,
  });
};