export function cleanHtmlSpace(html: string): string {
  return html // prettier-ignore
    .replace(/\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/ </g, '<')
    .replace(/> /g, '>')
}
