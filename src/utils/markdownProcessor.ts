import { marked, MarkedOptions } from 'marked';

interface MarkdownProcessorOptions extends MarkedOptions {
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
    return marked(markdown, mergedOptions as MarkedOptions);
  } catch (error) {
    console.error('Error processing markdown:', error);
    return '<p>Error processing markdown</p>';
  }
};

export const processMarkdownForPreview = (markdown: string): string => {
  return processMarkdownBase(markdown, {
    ...defaultOptions,
  });
};

export const processMarkdownForExport = (markdown: string): string => {
  return processMarkdownBase(markdown, {
    ...defaultOptions,
    mangle: false,
  });
};