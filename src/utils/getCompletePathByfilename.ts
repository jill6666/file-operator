import { ITreeSchema } from "../data/types/interface";

const getCompletePathByfilename = (filename: string, data: ITreeSchema) => {
  function findPath(node: ITreeSchema, currentPath: string) {
    if (node?.name?.includes(filename)) {
      result.push({ label: currentPath, value: node?.id, ...node });
      return;
    }

    if (node?.children) {
      for (const child of node?.children) {
        const childPath = currentPath
          ? `${currentPath}/${child?.name}`
          : child?.name;
        findPath(child, childPath);
      }
    }
  }

  const result: any = [];

  findPath(data, "");

  return result;
};

export default getCompletePathByfilename;
