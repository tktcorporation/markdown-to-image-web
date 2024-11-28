import { marked } from 'marked';

export function extractTitleFromMarkdown(markdown: string): string {
  let title = 'markdown-export';

  // Create a custom renderer to catch the first heading
  const renderer = new marked.Renderer();
  let firstHeadingFound = false;

  renderer.heading = (text, level) => {
    if (!firstHeadingFound && (level === 1 || level === 2)) {
      title = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
      firstHeadingFound = true;
    }
    return ''; // We don't need the actual HTML output
  };

  // Parse the markdown just to extract the title
  marked(markdown, { renderer });
  
  return title;
}