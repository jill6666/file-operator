import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { controlSelector } from "../data/slice/controlSlice";
import logo from "../logo.svg";
import size from "lodash/size";
import store from "store2";
import Highlight from "react-highlight";
import BreadCrumbs from "../components/BreadCurmb";
import useFileSchema from "../hook/useFileSchema";
import getBreadCrumbs from "../utils/getBreadCrumbs";

const PreviewPanel = () => {
  const [fileContent, setFileContent] = useState<any>();
  const [browserVisible, setBrowserVisible] = useState(false);
  const currentSchema = useSelector(controlSelector.currentShema);
  const { treeMap } = useFileSchema();
  const selected = Boolean(size(currentSchema));
  const breadCrumbsData = getBreadCrumbs({ treeMap, currentSchema });

  useEffect(() => {
    const isFile = !currentSchema?.children;
    //@ts-ignore
    const visibility = currentSchema?.browserVisible;
    const data = store.get(currentSchema.id);

    if (!isFile || !visibility || !data) setFileContent(undefined);

    // @ts-ignore
    const isJson = currentSchema?.extension === ".json";
    const fileData = isJson ? JSON.stringify(data, null, 4) : data;

    setBrowserVisible(visibility);
    setFileContent(fileData);
  }, [currentSchema]);

  return (
    <div className="w-full h-[calc(100%-60px)] overflow-scroll bg-primary-dark">
      {!selected && (
        <div className="w-full h-full flex justify-center items-center">
          <img src={logo} className="App-logo opacity-[.3]" alt="react logo" />
        </div>
      )}
      <div className="border-t">
        <BreadCrumbs data={breadCrumbsData} />
        {!browserVisible && selected && (
          <div className="text-lg text-primary-light pt-4 h-full">
            The file extension is not supported.
          </div>
        )}
        {browserVisible && (
          <div className="text-left">
            <Highlight className="javascript h-full">{fileContent}</Highlight>
          </div>
        )}
      </div>
    </div>
  );
};
export default PreviewPanel;
