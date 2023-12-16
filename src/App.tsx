import { useEffect } from "react";
import "./App.css";
import useFileSchema from "./hook/useFileSchema";
import MenuPanel from "./partial/MenuPanel";
import PreviewPanel from "./partial/PreviewPanel";
import SearchBar from "./components/SearchBar";

function App() {
  const { initSchema, searchResource, clearSearchResult } = useFileSchema();

  useEffect(() => {
    // init folder
    initSchema();
  }, []);

  const handleOnKeyDown = (e: any) => searchResource(e);
  const handleOnClear = (e: any) => clearSearchResult();

  return (
    <div className="App flex w-full h-screen">
      <div className="w-[20%] h-full min-w-[250px]">
        <MenuPanel />
      </div>
      <header className="w-[80%] flex flex-col h-full">
        <div className="w-full p-2">
          <SearchBar onKeyDown={handleOnKeyDown} onClear={handleOnClear} />
        </div>
        <PreviewPanel />
      </header>
    </div>
  );
}

export default App;
