import { ISchema, ITreeSchema } from "@data/types/interface";

/**
 *
 * @description refine to tree-map for left side menu
 * @param data
 * @returns
 */
function refineDataToTree(data: ISchema[]): ITreeSchema[] {
  const map = new Map();

  // Create a map to efficiently look up items by their id
  data.forEach((item) => {
    if (item.parentId === null) map.set(item.id, { ...item, children: [] });
    else map.set(item.id, { ...item });
  });

  // Build the tree structure
  const tree: any = [];

  map.forEach((item) => {
    if (item.parentId === null) {
      tree.push(item);
    } else {
      const parent = map.get(item.parentId);
      if (!parent) return;

      const children = parent?.children;
      parent["children"] = children ? [...children, item] : [item];
    }
  });

  return tree;
}

export default refineDataToTree;
