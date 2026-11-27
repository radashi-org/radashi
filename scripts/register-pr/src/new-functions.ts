export function getNewFunctions<
  File extends { status: string; filename: string },
>(files: File[]): File[] {
  return files.filter(
    file =>
      file.status === 'added' &&
      file.filename.startsWith('src/') &&
      file.filename.endsWith('.ts') &&
      !file.filename.endsWith('.test.ts'),
  )
}
