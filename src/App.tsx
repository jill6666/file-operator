import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import useFileSchema from "./hook/useFileSchema";
import MenuPanel from "./partial/MenuPanel";
import { useSelector } from "react-redux";
import { controlSelector } from "./data/slice/controlSlice";
import SearchBar from "./components/SearchBar";

function App() {
  const currentSchema = useSelector(controlSelector.currentShema);
  const { initSchema, searchResource, clearSearchResult } = useFileSchema();

  useEffect(() => {
    // init folder
    initSchema();
  }, []);

  const handleOnKeyDown = (e: any) => searchResource(e);
  const handleOnClear = (e: any) => clearSearchResult();

  return (
    <div className="App flex w-full">
      <div className="w-[20%] min-w-[250px]">
        <MenuPanel />
      </div>
      <header className="App-header w-[80%]">
        <div className="w-full p-2">
          <SearchBar onKeyDown={handleOnKeyDown} onClear={handleOnClear} />
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className="border p-8">{JSON.stringify(currentSchema?.name)}</div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
