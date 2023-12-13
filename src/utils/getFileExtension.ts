const getFileExtension = (filename: string) => {
  const index = filename.lastIndexOf(".");
  if (index === -1) return undefined;

  const arr = filename.substring(index, filename.length);
  return arr?.[1];
};

export default getFileExtension;
