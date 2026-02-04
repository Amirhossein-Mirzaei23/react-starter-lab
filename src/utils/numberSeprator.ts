export function numberSeprator(value: number | string, locale: string = 'en-US'): string {
  if (value === null || value === undefined || value === '') return '';

  const num = typeof value === 'string' ? Number(value) : value;

  if (isNaN(num)) return '';

  return new Intl.NumberFormat(locale).format(num);
}
