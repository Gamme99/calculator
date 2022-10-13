import "./App.css";
import { useReducer, useState } from "react";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

const ACTION = {
  NUMBER: "number",
  OPERATION: "operation",
  CLEAR: "clear",
  EVALUATE: "evaluate",
};

function calculateAns(expression) {
  return 5;
}

function App() {
  //const [{ operand, operation }, setInput] = useReducer(reducer, {});

  const [typed, setTyped] = useState("");
  //const [prev, setPrev] = useState("");

  const [result, setResult] = useState("");
  const operations = ["-", "+", "/", "x"];

  function othersCalc(operate, number) {
    {
      if (operate == "log") {
        return Math.log10(number);
      } else if (operate == "ln") {
        return Math.log(number);
      } else if (operate == "sin") {
        return Math.sin(number * (180 / Math.PI));
      } else if (operate == "cos") {
        return Math.cos(number * (180 / Math.PI));
      } else if (operate == "tan") {
        return Math.tan(number * (180 / Math.PI));
      } else if (operate == "cot") {
        return 1 / Math.tan(number * (180 / Math.PI));
      }
    }
  }

  function precedenceOf(oper) {
    if (oper == "+" || oper == "-") return 0;
    if (oper == "x" || oper == "/") return 1;
    if (
      oper == "log" ||
      oper == "ln" ||
      oper == "sin" ||
      oper == "cos" ||
      oper == "tan" ||
      oper == "cot"
    )
      return 2;
  }

  // checks if element is logarithmic or trig
  function isOther(element) {
    if (
      element == "log" ||
      element == "ln" ||
      element == "sin" ||
      element == "cos" ||
      element == "tan" ||
      element == "cot"
    ) {
      return true;
    } else {
      return false;
    }
  }

  function numberCalc(operate, number1, number2) {}
  function overralResult(ans) {
    //console.log("Error : " + ans);
    if (ans == -1) {
      return "Error";
    }
    var expression;
    ans = ans.replace(/\s+/g, "");
    expression = ans.split(",");
    //console.log("expression |" + expression.join("") + "|");

    let stack = [];
    let numbers = [];
    const operator = ["-", "+", "/", "x", "log", "sin", "cos", "tan", "cot"];

    //console.log("expression " + expression.join(" "));
    // check if operator amount is one less than numbers
    //array.forEach((element) => {});
    var expectingOperator = false;
    var skip = false;
    expression.forEach((element) => {
      console.log("stack " + stack);
      console.log("numbers " + numbers);
      if (skip) {
        console.log("mission aborted ");
        return;
      }

      // if its number
      console.log("element: " + element);
      if (!isNaN(element)) {
        if (expectingOperator) {
          skip = true;
          console.log("retrned cuz found: " + element);
          return;
        }
        numbers.push(element);
        console.log("here all cool " + element);

        expectingOperator = true;
        console.log("numbers " + numbers);
      }

      // if opening
      else if (element == "(") {
        if (expectingOperator) {
          skip = true;
          console.log(" couldnt pushed ( into stack ");
          return;
        }
        console.log("pushed ( into stack ");
        stack.push(element);
      }

      // if closing
      else if (element == ")") {
        if (!expectingOperator) {
          skip = true;
          return;
        }
        console.log("stack " + stack);
        var top = stack.pop();
        while (stack.length != 0 && top != "(") {
          numbers.push(top);
          top = stack.pop();
        }

        // if stack is empty before opening is found
        if (top != "(") {
          console.log("no matching parentheses " + top);
          skip = true;
          return;
        }

        expectingOperator = true;
      }

      // if operators
      else {
        if (
          element == "log" ||
          element == "ln" ||
          element == "sin" ||
          element == "cos" ||
          element == "tan" ||
          element == "cot"
        ) {
          console.log("top: " + " : " + (stack.slice(-1) == "+"));
          console.log("stack length: " + stack.length);
          console.log("top is trig or logar: " + isOther(stack.slice(-1)));
          console.log(
            stack.slice(-1) +
              " >  " +
              element +
              " : " +
              (precedenceOf(stack[stack.length - 1]) >= precedenceOf(element))
          );
          console.log(
            "top is operator: " + operator.includes(stack[stack.length - 1])
          );

          let count = 0;
          var top = "";
          var recent = stack[stack.length - 1];
          while (
            stack.length != 0 &&
            operator.includes(stack[stack.length - 1]) &&
            precedenceOf(stack[stack.length - 1]) >= precedenceOf(element)
          ) {
            //var top = stack[stack.length - 1];
            console.log(
              "inside the while loppppppppp: " + stack[stack.length - 1]
            );

            numbers.push(stack[stack.length - 1]);
            stack.pop();

            count++;
          }
          console.log("number here: " + numbers);
          console.log("stack here1: " + stack);

          stack.push(element);
          expectingOperator = false;
          //skip = true;
          return;
        }

        if (!expectingOperator) {
          skip = true;
          return;
        }

        //console.log("stack length: " + stack.length);

        while (
          stack.length != 0 &&
          operator.includes(stack[stack.length - 1]) &&
          precedenceOf(stack[stack.length - 1]) >= precedenceOf(element)
        ) {
          //var top = stack[stack.length - 1];
          console.log(
            "inside the while loppppppppp: " + stack[stack.length - 1]
          );

          numbers.push(stack[stack.length - 1]);
          stack.pop();

          //count++;
        }
        console.log("number here: " + numbers);
        console.log("stack here1: " + stack);

        stack.push(element);
        expectingOperator = false;
        console.log("stack here2: " + stack);
      }
    });

    if (!expectingOperator) {
      console.log("something wrong: ");
      return;
    }

    console.log("before we finish" + stack.length);

    // the rest of operators to numbers
    while (stack.length != 0) {
      var top = stack.pop();
      if (top == "(") {
        return "Errorrr";
      }
      numbers.push(top);
    }
    console.log("numbers: " + numbers.join(" "));
    //console.log("oper: " + stack);
    //console.log("shunting: " + numbers);
    return expression;
  }

  const handleClick = (value) => {
    var delim = ",";
    if (value == "C") {
      setTyped("");
      setResult("");
    } else if (
      value == "ln" ||
      value == "log" ||
      value == "sin" ||
      value == "cos" ||
      value == "tan" ||
      value == "cot"
    ) {
      if (!operations.includes(typed.slice(-1)) && typed != "") {
        //console.log("no consec ops");
        setTyped(typed + value + "(");
        setResult(result + delim + "x" + delim + value + delim + "(");
        return;
      }

      setTyped(typed + value + "(");
      setResult(result + delim + value + delim + "(");
    }
    // else if (value == "log") {
    //   //var calc = Math.log10(value);
    //   setTyped(typed + value + "(");
    //   setResult(result + value + "(");
    // } 6)
    else if (value == ")") {
      console.log("previous: " + result.slice(-1));
      if (operations.includes(typed.slice(-1)) || typed == "") {
        //return;
      }
      let countOp = 0;
      let countCl = 0;
      for (let i = 0; i < typed.length; i++) {
        if (typed[i] == "(") {
          countOp++;
        }
        if (typed[i] == ")") {
          countCl++;
        }
      }

      // no opening to match
      if (countOp <= countCl) {
        console.log("no opening to match");
        return;
      } else {
        setTyped(typed + value);
        setResult(result + delim + value);
      }

      //return;
    } else if (value == "=") {
      let count = 0;
      let pos = 0;
      var befor = "";
      var chunk = "";
      var lastPart = "";
      var ans = "";
      for (let i = 0; i < result.length; i++) {
        befor += result[i];
        if (result[i + 1] == "`") {
          let j = i + 2;
          while (j < result.length && !operations.includes(result[j])) {
            pos = j;
            chunk += result[j];
            j++;
          }
          let lasPos = result.length - 2;
          console.log(i + " : " + lasPos);
          if (i == lasPos) {
            var subs = overralResult(-1);
            setTyped(subs);
            console.log("final1: " + subs);
            return;
          }

          lastPart = result.substring(pos + 1, result.length);
          if (lastPart == "") {
            ans = befor + chunk + ",)" + lastPart;
          } else {
            ans = befor + chunk + ")," + lastPart;
          }

          break;
        } else {
          ans = befor;
        }
      }
      console.log("before: " + befor);
      console.log("chunk: " + chunk);
      console.log("lastPart: " + lastPart);
      console.log("ans : " + ans.length + " : " + ans);

      ans = overralResult(ans);
      setTyped(ans);
      console.log("final2: " + ans);

      return;
    } else {
      // wont allow censecutive operations or at the begginning
      // isNaN(typed.slice(-1)) ||
      if (
        (typed == "" || operations.includes(typed.slice(-1))) &&
        operations.includes(value)
      ) {
        if (value == "-" && typed.slice(-2) != "--") {
          setTyped(typed + value);
          setResult(result + delim + "(,0,-`");
        } else {
          console.log("no consec allowed here");
        }

        //return;
      } else if (
        !(value == "-") &&
        typed.slice(-1) == "(" &&
        operations.includes(value)
      ) {
        //return;
        // no number after closing and before opening parenthesis
      } else if (
        typed != "" &&
        ((value == "(" && !isNaN(typed.slice(-1))) ||
          (typed.slice(-1) == ")" && !isNaN(value)))
      ) {
        //return;
      }
      // if its number
      else {
        if (typed.length == 1 && typed.slice(-1) == 0 && value == "0") {
        } else if (
          (!isNaN(typed.slice(-1)) || typed.slice(-1) == ".") &&
          (!isNaN(value) || value == ".")
        ) {
          setTyped(typed + value);
          setResult(result + value);
          //return;
        } else {
          setTyped(typed + value);
          setResult(result + delim + value);
        }
      }

      // closing the 0 - number
      // if (result.slice(-1) == "`") {
      //   var modif = result.substring(0, result.length - 1);
      //   modif += delim + value + delim + ")";
      //   setResult(modif);
      //   console.log("modif :" + modif);
      // }
    }

    console.log("result: " + result);
    console.log("size: " + result.length);
  };

  // if (result.slice(-1) == "`") {
  //   var delim = ",";
  //   var modif = result.substring(0, result.length - 1);
  //   modif += delim + value + delim + ")";
  //   setResult(modif);
  //   console.log("modif :" + modif);
  // }

  /* 
 





 X          
  -             8


      })} */

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
