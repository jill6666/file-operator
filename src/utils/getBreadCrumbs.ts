import { ITreeSchema } from "../data/types/interface";

interface IGetBreadCrumbs {
  treeMap: ITreeSchema[];
  currentSchema: ITreeSchema;
}

const getBreadCrumbs = ({ treeMap, currentSchema }: IGetBreadCrumbs) => {
  console.log({ treeMap, currentSchema });

  const breadcrumbs: string[] = [];

  const findSchema = (node: ITreeSchema, schemaId: string) => {
    if (node.id === schemaId) {
      breadcrumbs.unshift(node.name);
      return true;
    }

    if (node.children) {
      for (const childNode of node.children) {
        if (findSchema(childNode, schemaId)) {
          breadcrumbs.unshift(node.name);
          return true;
        }
      }
    }

    return false;
  };

  for (const node of treeMap) {
    if (findSchema(node, currentSchema.id)) {
      break;
    }
  }

  return breadcrumbs;
};

export default getBreadCrumbs;
