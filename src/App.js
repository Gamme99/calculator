import "./App.css";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");

  var allInput = "";
  const handleClick = (value) => {
    //e.preventDefault();
    setInput(value++);
    //console.log(e);
    allInput = value;
  };

  const handleClear = () => {
    setInput();
  };

  return (
    <div className="App">
      <div className="container">
        <div className="display">
          <div className="screen">
            {input} {allInput}
          </div>
          {/* <input type="text" value={input}></input> */}
        </div>
        <form className="number">
          <table>
            <tr className="rows">
              <button type="button" onClick={() => handleClear()}>
                <th>C</th>
              </button>
              <button type="button" onClick={() => handleClick("sin")}>
                <th>sin</th>
              </button>

              <button type="button" onClick={() => handleClick("cos")}>
                <th>cos</th>
              </button>

              <button type="button" onClick={() => handleClick("tan")}>
                <th>tan</th>
              </button>

              <button type="button" onClick={() => handleClick("cot")}>
                <th>cot</th>
              </button>

              <button type="button" onClick={() => handleClick("/")}>
                <th>/</th>
              </button>
            </tr>
            <tr className="rows">
              <button type="button" onClick={() => handleClick("(")}>
                <th> (</th>
              </button>
              <button type="button" onClick={() => handleClick(")")}>
                <th>)</th>
              </button>

              <button type="button" onClick={() => handleClick(7)}>
                <th>7</th>
              </button>

              <button type="button" onClick={() => handleClick(8)}>
                <th>8</th>
              </button>

              <button type="button" onClick={() => handleClick(9)}>
                <th>9</th>
              </button>

              <button type="button" onClick={() => handleClick("*")}>
                <th className="product">+</th>
              </button>
            </tr>
            <tr className="rows">
              <button type="button" onClick={() => handleClick("{")}>
                <th>
                  {" "}
                  <span>&#123;</span>
                </th>
              </button>
              <button type="button" onClick={() => handleClick("}")}>
                <th>
                  <span>&#x7D;</span>
                </th>
              </button>
              <button type="button" onClick={() => handleClick(4)}>
                <th>4</th>
              </button>
              <button type="button" onClick={() => handleClick(5)}>
                <th>5</th>
              </button>
              <button type="button" onClick={() => handleClick(6)}>
                <th>6</th>
              </button>
              <button type="button" onClick={() => handleClick("-")}>
                <th className="subtract">-</th>
              </button>
            </tr>
            <tr className="rows">
              <button type="button" onClick={() => handleClick("log")}>
                <th> log</th>
              </button>
              <button type="button" onClick={() => handleClick("ln")}>
                <th>ln</th>
              </button>
              <button type="button" onClick={() => handleClick(1)}>
                <th>1</th>
              </button>
              <button type="button" onClick={() => handleClick(2)}>
                <th>2</th>
              </button>
              <button type="button" onClick={() => handleClick(3)}>
                <th>3</th>
              </button>
              <button type="button" onClick={() => handleClick("+")}>
                <th className="addition">+</th>
              </button>
            </tr>
            <tr className="rows">
              <button>
                <th> ...</th>
              </button>
              <button>
                <th> ...</th>
              </button>
              <button type="button" onClick={() => handleClick("0")}>
                <th>0</th>
              </button>
              <button>
                <th>...</th>
              </button>
              <button type="button" onClick={() => handleClick(".")}>
                <th className="dot">.</th>
              </button>
              <button>
                <th>=</th>
              </button>
            </tr>
          </table>
        </form>
      </div>

      <div className="test">
        <div className="content">I am here</div>
      </div>
    </div>
  );
}

export default App;
