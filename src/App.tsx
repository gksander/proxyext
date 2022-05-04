import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [val, setVal] = React.useState("");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => {
        setVal(JSON.stringify(json, null, 2));
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p className="text-lg font-bold text-gray-200">{val}</p>
      </header>
    </div>
  );
}

export default App;
