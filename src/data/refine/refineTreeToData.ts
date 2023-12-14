import { ISchema, ITreeSchema } from "@data/types/interface";

function refineTreeToData(tree: ITreeSchema): ISchema[] {
  const result: ISchema[] = [];

  function traverse(node: any) {
    const { id, parentId, name, extension = "", children = [] } = node;
    result.push({ id, parentId, name, extension });

    if (children && children.length > 0) children.forEach(traverse);
  }

  traverse(tree);

  return result;
}

export default refineTreeToData;
