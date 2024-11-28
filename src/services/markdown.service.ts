import { processMarkdownForPreview, processMarkdownForExport } from '../utils/markdownProcessor';

export class MarkdownService {
  static processForPreview(markdown: string): string {
    return processMarkdownForPreview(markdown);
  }

  static processForExport(markdown: string): string {
    return processMarkdownForExport(markdown);
  }
}