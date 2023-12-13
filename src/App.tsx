import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import useFileSchema from "./hook/useFileSchema";
import MenuPanel from "./partial/MenuPanel";

function App() {
  const { initSchema } = useFileSchema();

  useEffect(() => {
    // init folder
    initSchema();
  }, []);

  return (
    <div className="App flex w-full">
      <div className="w-[20%] min-w-[250px]">
        <MenuPanel />
      </div>
      <header className="App-header w-[80%]">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className="border p-8">HHHH</div>
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
