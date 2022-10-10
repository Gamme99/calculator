import "./App.css";
import { useReducer, useState } from "react";

const ACTION = {
  NUMBER: "number",
  OPERATION: "operation",
  CLEAR: "clear",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  // switch(type){
  //   case ACTION.CLEAR:
  //     return {
  //       ...state,
  //       operation: ${operand || ""}${payload}
  //     }
  // }
}

function App() {
  const [{ operand, operation }, setInput] = useReducer(reducer, {});

  const [typed, setTyped] = useState("");
  const [prev, setPrev] = useState("");
  const memory = [];

  const handleClick = (value) => {
    if (!isNaN(value)) {
      // memory.push(parseInt(value));
      console.log("is number");
    } else {
      //memory.push(value);
      console.log("not number");
    }

    if (value == "C") {
      // setPrev("");
      setTyped(typed.slice("1", -1));
    } else if (value == "ln") {
      setTyped(" " + typed + value + "(");
    } else {
      setTyped(" " + typed + value);
    }

    //console.log("size: " + memory.length);
  };

  // const initialState = {
  //   input:
  // }
  //console.log("size: " + memory.length);

  return (
    <div className="App">
      {/* {memory.forEach((element) => {
        console.log(element);
        if (element != undefined) {
          console.log(element);
        }
      })} */}
      <div className="container">
        <div className="screen">
          <div className="result">{typed || 0}</div>
        </div>
        <div className="firstLayer">
          <button onClick={() => handleClick("C")}>C</button>
          <button onClick={() => handleClick("sin")}>sin</button>
          <button onClick={() => handleClick("cos")}>cos</button>
          <button onClick={() => handleClick("tan")}>tan</button>
          <button onClick={() => handleClick("cot")}>cot</button>
          <button onClick={() => handleClick("/")}>/</button>
        </div>
        <div className="secondLayer">
          <button onClick={() => handleClick("(")}> (</button>
          <button onClick={() => handleClick(")")}> )</button>
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("x")}>x</button>
        </div>

        <div className="thirdLayer">
          <button>
            <span onClick={() => handleClick("{")}>&#123;</span>
          </button>
          <button onClick={() => handleClick("}")}>
            <span>&#x7D;</span>
          </button>
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("-")}>-</button>
        </div>

        <div className="fourthLayer">
          <button onClick={() => handleClick("log")}>log</button>
          <button onClick={() => handleClick("ln")}>ln</button>
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("+")}>+</button>
        </div>
        <div className="finalLayer">
          <button>...</button>
          <button>...</button>
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={() => handleClick("(-)")}>(-)</button>
          <button onClick={() => handleClick("=")}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
