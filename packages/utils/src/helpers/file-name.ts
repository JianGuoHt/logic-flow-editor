export function getFileName(name: string): string {
  const fileName = name.split('/').pop()?.split('.')[0] || '';

  return fileName;
}
