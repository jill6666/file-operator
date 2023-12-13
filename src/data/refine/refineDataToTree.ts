import { ISchema, ITreeSchema } from "@data/types/interface";

/**
 * sample
 * from:
 * const mockFolderData = [
  { id: "root", parentId: null, name: "root" },
  { id: "1", parentId: "root", name: "1" },
  { id: "2", parentId: "root", name: "2" },
  {
    id: "04",
    parentId: "root",
    name: "file04.js",
    extension: ".js",
    browserVisible: true,
  },
  { id: "3", parentId: "root", name: "3" },
  {
    id: "01",
    parentId: "1",
    name: "file01.tsx",
    extension: ".tsx",
    browserVisible: false,
  },
  {
    id: "03",
    parentId: "3",
    name: "file03.test.ts",
    extension: ".ts",
    browserVisible: true,
  },
  { id: "2-1", parentId: "2", name: "2-1" },
  { id: "02", parentId: "2", name: "02" },
  {
    id: "02-1",
    parentId: "02",
    name: "file02-1.txt",
    extension: ".txt",
    browserVisible: true,
  },
];
 * to:
const mockMapTreeData: ITreeSchema = {
  id: "root",
  name: "root",
  parentId: null,
  children: [
    {
      id: "1",
      name: "1",
      parentId: "root",
      children: [
        { id: "01", parentId: "1", name: "file01", extension: ".tsx" },
      ],
    },
    {
      id: "2",
      name: "2",
      parentId: "root",
      children: [
        { id: "2-1", parentId: "2", name: "2-1", children: [] },
        {
          id: "02",
          name: "02",
          parentId: "2",
          children: [
            {
              id: "02-1",
              parentId: "02",
              name: "file02-1",
              extension: ".text",
            },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "3",
      parentId: "root",
      children: [
        { id: "03", parentId: "3", name: "file03", extension: ".test.ts" },
      ],
    },
    { id: "04", parentId: "root", name: "file04", extension: ".js" },
  ],
};
 */

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
