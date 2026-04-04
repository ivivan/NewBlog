import { marked } from 'marked';

export function parseMarkdown(text: string): string {
  return marked(text) as string;
}
