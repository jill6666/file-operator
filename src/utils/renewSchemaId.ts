import { ITreeSchema, IFileSchema } from "../data/types/interface";
import { v4 as uuidv4 } from "uuid";

type Union = IFileSchema & ITreeSchema;

// FIXME: flattern
function renewSchemaId(data: Union) {
  function replaceIds(obj: any) {
    if (obj && typeof obj === "object") {
      if (obj.hasOwnProperty("id")) {
        obj.id = uuidv4();
      }

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          replaceIds(obj?.[key]);
        }
      }
    }
  }

  replaceIds(data);
  return data;
}
export default renewSchemaId;
