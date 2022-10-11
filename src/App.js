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

  const [result, setResult] = useState("");
  const memory = [];

  const handleClick = (value) => {
    // if (!isNaN(value)) {
    //   // memory.push(parseInt(value));
    //   console.log("is number");
    // } else {
    //   //memory.push(value);
    //   console.log("not number");
    // }

    if (value == "C") {
      // setPrev("");
      setTyped("");
      setResult("");
    } else if (value == "ln") {
      setTyped(typed + value);
      setResult(result + value);
    } else if (value == "log") {
      //var calc = Math.log10(value);
      setTyped(typed + value);
      setResult(result + value);
    } else if (value == ")") {
      for (let i = 1; i <= result.length; i++) {
        var log = result.slice(-i);

        if (log.includes("log(")) {
          var chunk = result.slice(-(i - 4));
          var cleaned = "";
          console.log("chunk: " + chunk);
          // chunk.forEach((element) => {
          //   if (!NaN(element)) {
          //     cleaned += element;
          //   }
          // });
          console.log("number: " + cleaned);
          var prev = result.substring(0, result.length - i);

          var calc = Math.log10(result.slice(-(i - 4)));
          calc = calc.toFixed(4);

          setTyped(typed + value);
          setResult(prev + calc);
          break;
        } else if (log.includes("ln(")) {
          console.log("prev : " + prev);
          var prev = result.substring(0, result.length - i);
          var calc = Math.log(result.slice(-(i - 3)));
          calc = calc.toFixed(4);
          console.log("calc : " + calc);
          setTyped(typed + value);
          setResult(prev + calc);
          break;
        } else if (log.includes("sin(")) {
          var prev = result.substring(0, result.length - i);
          var calc = Math.sin((result.slice(-(i - 4)) * Math.PI) / 180);
          console.log("number : " + result.slice(-(i - 4)));
          calc = calc.toFixed(4);
          console.log("calc : " + calc);
          setTyped(typed + value);
          setResult(prev + calc);
          break;
        } else if (log.includes("cos(")) {
          var prev = result.substring(0, result.length - i);
          var calc = Math.cos((result.slice(-(i - 4)) * Math.PI) / 180);
          console.log("number : " + result.slice(-(i - 4)));
          calc = calc.toFixed(4);
          console.log("calc : " + calc);
          setTyped(typed + value);
          setResult(prev + calc);
          break;
        } else if (log.includes("tan(")) {
          var prev = result.substring(0, result.length - i);
          var calc = Math.tan((result.slice(-(i - 4)) * Math.PI) / 180);
          console.log("number : " + result.slice(-(i - 4)));
          calc = calc.toFixed(4);
          console.log("calc : " + calc);
          setTyped(typed + value);
          setResult(prev + calc);
          break;
        } else if (log.includes("cot(")) {
          var prev = result.substring(0, result.length - i);
          var calc = 1 / Math.tan((result.slice(-(i - 4)) * Math.PI) / 180);
          console.log("number : " + result.slice(-(i - 4)));
          calc = calc.toFixed(4);
          console.log("calc : " + calc);
          setTyped(typed + value);
          setResult(prev + calc);
          break;
        }

        console.log("not found : " + log);
      }
    } else if (value == "=") {
      setResult(result);
    } else {
      setTyped(typed + value);
      setResult(result + value);
    }

    console.log("result: " + result);

    console.log("size: " + result.length);
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
