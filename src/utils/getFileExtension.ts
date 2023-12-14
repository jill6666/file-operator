const getFileExtension = (filename: string) => {
  const index = filename.lastIndexOf(".");
  if (index === -1) return "";

  const result = filename.substring(index, filename.length);
  return result as string;
};

export default getFileExtension;
