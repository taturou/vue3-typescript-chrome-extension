export function cleanHtmlSpace (html: string): string {
  return html.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').replace(/ </g, '<').replace(/> /g, '>')
}
