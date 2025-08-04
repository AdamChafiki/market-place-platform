export function getPublicIdFromUrl(url: string): string | null {
  if (!url) return null;

  try {
    const urlParts = url.split('/');
    const filenameWithExt = urlParts[urlParts.length - 1];
    const publicId = filenameWithExt.split('.')[0];

    const folderIndex = urlParts.findIndex((part) => part === 'upload') + 1;
    const folderPath = urlParts
      .slice(folderIndex, urlParts.length - 1)
      .join('/');

    return folderPath ? `${folderPath}/${publicId}` : publicId;
  } catch {
    return null;
  }
}
