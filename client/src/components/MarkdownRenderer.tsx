/*
 * MarkdownRenderer — Simple markdown to HTML for article content
 * Handles: headings, paragraphs, blockquotes, bold, italic, lists, hr, links
 */
import { useMemo } from "react";

function parseMarkdown(md: string): string {
  let html = md;

  // Remove leading reading time line if present (e.g. "_8 min read_")
  html = html.replace(/^_\d+ min read_\n*/m, '');

  // Remove the first H1 (title) since the page component already renders it
  html = html.replace(/^# .+$/m, '');

  // Escape HTML entities (but preserve our markdown)
  // We'll do this carefully to not break markdown syntax
  
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr />');
  html = html.replace(/^\*\*\*$/gm, '<hr />');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Blockquotes (can be multi-line)
  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>');
  // Merge adjacent blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Unordered lists
  html = html.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Paragraphs — wrap remaining text lines
  const lines = html.split('\n');
  const result: string[] = [];
  let inParagraph = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      continue;
    }

    // Skip if it's already an HTML element
    if (line.startsWith('<h') || line.startsWith('<blockquote') || line.startsWith('<hr') || line.startsWith('<ul') || line.startsWith('<ol') || line.startsWith('<li') || line.startsWith('</')) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      result.push(line);
      continue;
    }

    if (!inParagraph) {
      result.push('<p>');
      inParagraph = true;
    }
    result.push(line);
  }

  if (inParagraph) {
    result.push('</p>');
  }

  return result.join('\n');
}

export default function MarkdownRenderer({ content }: { content: string }) {
  const html = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div
      className="article-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
