import { ITreeSchema, IFileSchema } from "../data/types/interface";
import { v4 as uuidv4 } from "uuid";
import refineTreeToData from "../data/refine/refineTreeToData";
import flattenDeep from "lodash/flattenDeep";

type Union = IFileSchema & ITreeSchema;

function renewSchemaId(parentId: string, data: Union) {
  let result: any = [];
  let tmp: any = { [data.id]: uuidv4() };

  const refined = data?.children?.map((item) => refineTreeToData(item));
  const flattened = flattenDeep(refined);

  flattened.forEach((item) => (tmp[item.id] = uuidv4()));
  flattened.forEach(
    (item) =>
      item?.parentId &&
      result.push({
        id: tmp?.[item?.id],
        parentId: tmp?.[item?.parentId] || "root",
        extension: item?.extension,
        name: item?.name,
        // @ts-ignore
        browserVisible: item?.browserVisible,
      })
  );

  result.push({
    name: data?.name,
    extension: data?.extension,
    id: tmp[data.id],
    parentId: parentId,
    browserVisible: data?.browserVisible,
  });

  return result;
}
export default renewSchemaId;
