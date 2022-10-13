import "./App.css";
import { useReducer, useState } from "react";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

const ACTION = {
  NUMBER: "number",
  OPERATION: "operation",
  CLEAR: "clear",
  EVALUATE: "evaluate",
};

function App() {
  //const [{ operand, operation }, setInput] = useReducer(reducer, {});

  const [typed, setTyped] = useState("");
  //const [prev, setPrev] = useState("");

  const [result, setResult] = useState("");
  const operations = ["-", "+", "/", "x"];

  function EvaltrigAnLog(operate, number) {
    {
      if (operate == "log") {
        return Math.log10(number);
      } else if (operate == "ln") {
        return Math.log(number);
      } else if (operate == "sin") {
        return Math.sin(number);
      } else if (operate == "cos") {
        return Math.cos(number);
      } else if (operate == "tan") {
        return Math.tan(number);
      } else if (operate == "cot") {
        var ans = 1 / Math.tan(number);
        return ans;
      }
    }
  }

  function evaluateOper(operate, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    console.log("here :" + num1 + num2);
    let ans = 0;
    if (operate == "-") {
      return num1 - num2;
    } else if (operate == "+") {
      ans = num1 + num2;

      return ans;
    } else if (operate == "/") {
      if (num2 == 0) {
        return "Error";
      }

      return num1 / num2;
    } else if (operate == "x") {
      return num1 * num2;
    } else {
      return "Error";
    }
  }

  function evaluateExpression(expression) {
    let numbers = [];
    let Err = false;
    expression.forEach((element) => {
      if (Err) {
        return "Error";
      }

      if (element == "") {
        return;
      }

      // operators
      if (isNaN(element)) {
        // ln, log, sin, cos, tan, cot
        if (isTrigOrLog(element) == true) {
          var ans = EvaltrigAnLog(element, parseFloat(numbers.pop()));

          if (isNaN(ans)) {
            Err = true;
            return "Error";
          }

          ans = ans.toFixed(8);

          numbers.push(ans);
        }
        // - + / and *
        else {
          var num1 = parseFloat(numbers.pop());
          var num2 = parseFloat(numbers.pop());
          console.log(" before: " + num1 + " : " + num2);

          var ans = evaluateOper(element, num2, num1);

          if (ans == "Error") {
            Err = true;
            return "Error";
          }
          numbers.push(ans);
        }
      } else {
        numbers.push(element);
      }
    });
    if (Err) {
      return "Error";
    } else {
      //numbers = numbers[0].toFixed(8);
      return numbers;
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
  function isTrigOrLog(element) {
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

  // converts the given expression to PostFix
  function convertToPostFix(ans) {
    if (ans == -1) {
      return "Error";
    }

    var expression;
    ans = ans.replace(/\s+/g, "");
    expression = ans.split(",");

    let stack = [];
    let numbers = [];
    const operator = ["-", "+", "/", "x", "log", "sin", "cos", "tan", "cot"];

    console.log("expression: " + expression);

    var expectingOperator = false;
    var skip = false;
    expression.forEach((element) => {
      console.log("heeerrreeee: ");
      if (skip) {
        return;
      }

      // if opening
      else if (element == "(") {
        //expectingOperator = false;
        if (expectingOperator) {
          console.log("busted: ");
          skip = true;
          return;
        }
        stack.push(element);
      }

      // if closing
      else if (element == ")") {
        if (!expectingOperator) {
          skip = true;
          return;
        }
        var top = stack.pop();
        while (stack.length != 0 && top != "(") {
          numbers.push(top);
          top = stack.pop();
        }

        // if stack is empty before opening is found
        if (top != "(") {
          skip = true;
          return;
        }
        // console.log("stack : " + stack);
        // console.log("number : " + numbers);

        expectingOperator = true;
      }

      // if operators
      else if (isTrigOrLog(element) || operator.includes(element)) {
        if (
          element == "log" ||
          element == "ln" ||
          element == "sin" ||
          element == "cos" ||
          element == "tan" ||
          element == "cot"
        ) {
          var top = "";
          while (
            stack.length != 0 &&
            operator.includes(stack[stack.length - 1]) &&
            precedenceOf(stack[stack.length - 1]) >= precedenceOf(element)
          ) {
            numbers.push(stack[stack.length - 1]);
            stack.pop();
          }
          //console.log("push this in stack : " + element);
          stack.push(element);
          expectingOperator = false;

          return;
        }

        if (!expectingOperator) {
          skip = true;
          return;
        }

        while (
          stack.length != 0 &&
          operator.includes(stack[stack.length - 1]) &&
          precedenceOf(stack[stack.length - 1]) >= precedenceOf(element)
        ) {
          numbers.push(stack[stack.length - 1]);
          stack.pop();
        }

        stack.push(element);
        expectingOperator = false;
      }

      // if its number
      else {
        console.log("current elem: " + element);
        if (expectingOperator) {
          console.log("trouble: " + element);
          skip = true;
          return;
        }

        if (element == "") {
          return;
        }

        numbers.push(element);
        expectingOperator = true;
        console.log("element : " + element);
        console.log("stack : " + stack);
        console.log("number : " + numbers);
      }
    });

    if (!expectingOperator) {
      return;
    }

    // the rest of operators to numbers
    while (stack.length != 0) {
      var top = stack.pop();
      if (top == "(") {
        return "Error";
      }
      numbers.push(top);
    }

    console.log("converted: " + numbers);
    var ans = evaluateExpression(numbers);

    if (ans == "Error") {
      return "Error";
    }
    expectingOperator = false;
    return ans;
  }

  const handleClick = (value) => {
    var delim = ",";

    if (value == "") {
      return;
    }

    if (value == "C") {
      setTyped("");
      setResult("");
    }

    // if logarithmic or trigonometry
    else if (
      value == "ln" ||
      value == "log" ||
      value == "sin" ||
      value == "cos" ||
      value == "tan" ||
      value == "cot"
    ) {
      console.log("atleast here: " + value);
      console.log("atleast typed: " + typed + " : size " + typed.length);

      // if no operators before
      if (
        typed == "" ||
        typed.slice(-1) == "(" ||
        operations.includes(typed.slice(-1))
      ) {
        setTyped(typed + value + "(");
        setResult(result + value + ",(,");
        return;
      }

      // if after open paren or operator
      else if (operations.includes(typed.slice(-1)) || typed.slice(-1) == "(") {
      } else if (typed.slice(-1) == ".") {
        return;
      }
      setTyped(typed + value + "(");
      setResult(result + delim + value + delim + "(" + delim);
    }

    // opening parentheses
    else if (value == "(") {
      // operation before parenthesis
      if (operations.includes(typed.slice(-1)) || typed.slice(-1) == "(") {
        setTyped(typed + value);
        setResult(result + value + delim);
      } else if (typed == "") {
        setTyped(typed + value);
        setResult(result + value + delim);
      }
    }

    // closing parentheses
    else if (value == ")") {
      if (
        operations.includes(typed.slice(-1)) ||
        typed.slice(-1) == "(" ||
        typed == ""
      ) {
        return;
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

      // counts both opening and closing and compare
      if (countOp <= countCl) {
        return "Error";
      } else {
        if (!isNaN(typed.slice(-1))) {
          setTyped(typed + value);
          setResult(result + delim + value + delim);
          return;
        }
        setTyped(typed + value);
        setResult(result + value + delim);
      }
    }

    // opening bracket
    else if (value == "{") {
      return;
    }

    // closing parentheses
    else if (value == "}") {
      return;
    }
    // closing parentheses
    else if (value == "(-)") {
      return;
    }

    // end of expression
    else if (value == "=") {
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

          if (i == lasPos) {
            var subs = convertToPostFix(-1);
            console.log("subs : " + subs);
            setTyped(subs);
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

      ans = convertToPostFix(ans);
      console.log("ans : " + ans);
      setTyped(ans);

      return;
    }

    // if -
    else if (value == "-") {
      // - at the beginning
      if (typed == "" || typed.slice(-2) == "--" || typed.slice(-1) == "(") {
        setTyped(typed + value);
        setResult(result + "(,0,-,`");
        console.log("in1 : ");
      }

      // after a number
      else if (!isNaN(typed.slice(-1)) || typed.slice(-1).includes(".")) {
        setTyped(typed + value);
        setResult(result + delim + value + delim);
        return;
      }
      // - after operators
      else if (
        !typed.slice(-2).includes("-") &&
        typed.slice(-2) != "--" &&
        value == "-"
      ) {
        setTyped(typed + value);
        setResult(result + "(,0,-,`");
      }
    } else {
      // wont allow censecutive operations or at the begginning
      if (
        (typed == "" || operations.includes(typed.slice(-1))) &&
        operations.includes(value)
      ) {
        console.log("nah dude : " + value);
        return;
        // no operators after opening except -
      } else if (
        !(value == "-") &&
        typed.slice(-1) == "(" &&
        operations.includes(value)
      ) {
      }

      // no consec dots
      else if (value == ".") {
        if (typed.slice(-4).includes(".")) {
          return;
        }
        // join . onto previous number
        else if (!isNaN(typed.slice(-1)) || typed.slice(-1) != ")") {
          setResult(result + ".");
          setTyped(typed + value);
          console.log("res : " + result);
          //console.log("temp : " + temp);
        }
      }

      //+ x and /
      else if (value == "+" || value == "/" || value == "x") {
        console.log("the three ops : " + value);
        if (!isNaN(typed.slice(-1))) {
          setTyped(typed + value);
          setResult(result + delim + value + delim);
          return;
        }
        setTyped(typed + value);
        setResult(result + value + delim);
      }

      // if its number
      else {
        // no unnecessary zeros
        if (typed.length == 1 && typed.slice(-1) == "0" && value == "0") {
        } else {
          if (typed.slice(-1) == "(") {
            setTyped(typed + value);
            setResult(result + value);
            return;
          }

          setTyped(typed + value);
          setResult(result + value);
          console.log("current value : " + value);
          console.log("here : " + result);
        }
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="calculator">
          <div className="screen">
            <div className="result">{typed || 0}</div>
          </div>
          <div className="firstLayer">
            <button onClick={() => handleClick("C")}>C</button>
            <button onClick={() => handleClick("sin")}>sin</button>
            <button onClick={() => handleClick("cos")}>cos</button>
            <button onClick={() => handleClick("tan")}>tan</button>
            <button onClick={() => handleClick("cot")}>cot</button>
            <button className="leftcol" onClick={() => handleClick("/")}>
              /
            </button>
          </div>
          <div className="secondLayer">
            <button onClick={() => handleClick("(")}> (</button>
            <button onClick={() => handleClick(")")}> )</button>
            <button onClick={() => handleClick("7")}>7</button>
            <button onClick={() => handleClick("8")}>8</button>
            <button onClick={() => handleClick("9")}>9</button>
            <button className="leftcol" onClick={() => handleClick("x")}>
              x
            </button>
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
            <button className="leftcol" onClick={() => handleClick("-")}>
              -
            </button>
          </div>

          <div className="fourthLayer">
            <button onClick={() => handleClick("log")}>log</button>
            <button onClick={() => handleClick("ln")}>ln</button>
            <button onClick={() => handleClick("1")}>1</button>
            <button onClick={() => handleClick("2")}>2</button>
            <button onClick={() => handleClick("3")}>3</button>
            <button className="leftcol" onClick={() => handleClick("+")}>
              +
            </button>
          </div>
          <div className="finalLayer">
            <button>...</button>
            <button>...</button>
            <button onClick={() => handleClick("0")}>0</button>
            <button onClick={() => handleClick(".")}>.</button>
            <button onClick={() => handleClick("(-)")}>(-)</button>
            <button className="leftcol" onClick={() => handleClick("=")}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
