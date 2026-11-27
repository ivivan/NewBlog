// Reading time for mixed Chinese / English markdown.
// ~400 CJK characters or ~220 English words per minute.
export function readingMinutes(markdown: string | undefined): number {
  if (!markdown) return 1;
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`\-\[\]()!|]/g, " ");
  const cjk = (text.match(/[㐀-鿿豈-﫿]/g) ?? []).length;
  const words = (text.replace(/[㐀-鿿豈-﫿]/g, " ").match(/[A-Za-z0-9]+/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 400 + words / 220));
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
