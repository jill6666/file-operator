import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { controlSelector } from "../data/slice/controlSlice";
import logo from "../logo.svg";
import size from "lodash/size";
import store from "store2";

const PreviewPanel = () => {
  const [fileContent, setFileContent] = useState<any>();
  const [browserVisible, setBrowserVisible] = useState(false);
  const currentSchema = useSelector(controlSelector.currentShema);

  useEffect(() => {
    const isFile = !currentSchema?.children;
    if (!isFile) return;
    //@ts-ignore
    const visibility = currentSchema?.browserVisible;
    setBrowserVisible(visibility);

    const data = visibility && getFileContent(currentSchema.id);
    data && setFileContent(data);
  }, [currentSchema]);

  const getFileContent = (id: string) => {
    const storedData = store.get(id);

    return storedData;
  };
  return (
    <div className="w-full h-full">
      {!Boolean(size(currentSchema)) && (
        <div className="w-full h-full flex justify-center items-center">
          <img src={logo} className="App-logo" alt="react logo" />
        </div>
      )}
      <div className="p-2 border h-full">
        {!browserVisible && (
          <div className="text-lg text-[#555]">
            The file extension is not supported.
          </div>
        )}
        {browserVisible && (
          <div>fileContent: {JSON.stringify(fileContent)}</div>
        )}
      </div>
    </div>
  );
};
export default PreviewPanel;
