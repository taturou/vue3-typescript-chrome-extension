export function printDate(date: Date): string {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return date.getFullYear() + '/' + ('00' + (date.getMonth() + 1)).slice(-2) + '/' + ('00' + date.getDate()).slice(-2)
}

export function printTime(date: Date): string {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return ('00' + date.getHours()).slice(-2) + ':' + ('00' + date.getMinutes()).slice(-2)
}
