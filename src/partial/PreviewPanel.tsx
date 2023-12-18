import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { controlSelector } from "../data/slice/controlSlice";
import logo from "../logo.svg";
import size from "lodash/size";
import store from "store2";
import Highlight from "react-highlight";

const PreviewPanel = () => {
  const [fileContent, setFileContent] = useState<any>();
  const [browserVisible, setBrowserVisible] = useState(false);
  const currentSchema = useSelector(controlSelector.currentShema);
  const selected = Boolean(size(currentSchema));

  useEffect(() => {
    const isFile = !currentSchema?.children;
    if (!isFile) return;
    //@ts-ignore
    const visibility = currentSchema?.browserVisible;
    setBrowserVisible(visibility);

    const data = visibility && getFileContent(currentSchema.id);
    // @ts-ignore
    const isJson = currentSchema?.extension === ".json";
    const fileData = isJson ? JSON.stringify(data, null, 4) : data;
    data && setFileContent(fileData);
  }, [currentSchema]);

  const getFileContent = (id: string) => {
    const storedData = store.get(id);

    return storedData;
  };
  return (
    <div className="w-full h-[calc(100%-60px)] overflow-scroll bg-[#2b2b2b]">
      {!selected && (
        <div className="w-full h-full flex justify-center items-center">
          <img src={logo} className="App-logo opacity-[.3]" alt="react logo" />
        </div>
      )}
      <div className="border-t">
        {!browserVisible ||
          (!selected && (
            <div className="text-lg text-[#555]">
              The file extension is not supported.
            </div>
          ))}
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
