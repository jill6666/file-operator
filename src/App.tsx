import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import redux from "./data/redux";
import { useSelector } from "react-redux";
import { folderSelector } from "./data/slice/folderSlice";

function App() {
  const folderId = useSelector(folderSelector.id);

  useEffect(() => {
    // init folder
    redux.initFolder({ id: "", schema: [] });
  }, []);

  useEffect(() => {
    console.log("folderId changed === ", folderId);
  }, [folderId]);

  const handleOnClick = () => {
    redux.setFolderId("AAAA");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={handleOnClick}>Click me</button>
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
