import { ISchema } from "@data/types/interface";

const clearNoParentItem = (schema: ISchema[], targetId: string) => {
  const tmpMap = new Map();

  schema.forEach((i) => {
    if (i.id !== targetId) tmpMap.set(i.id, i);
  });

  let result: any = [];

  tmpMap.forEach((item) => {
    const hasParent = tmpMap.get(item.parentId);
    const isRoot = !item.parentId;

    if (hasParent || isRoot) result.push(item);
  });

  return result;
};
export default clearNoParentItem;
