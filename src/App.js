import React, { useState } from "react";
export const App = () => {
  const symbols = [
    "7",
    "8",
    "9",
    "+",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "*",
    "0",
    "=",
    "C",
    "/",
  ];
  const numbers = "0123456789";
  const actions = "+-*/";

  const [numberActive, setNumberActive] = useState("");
  const [symbol, setSymbol] = useState("");
  const [numberTemp, setNumberTemp] = useState("");
  /*Функция в зависимости от переданного 
ей символа определяет поведение состояния приложения*/
  function change(mark) {
    /*Если принимается арифметическое значение, 
    то состоянию с активным числом в конец 
    добавляется полученная цифра*/
    if (numbers.indexOf(mark) !== -1) {
      setNumberActive(numberActive + mark);
    } /*Если получен символ арифметического действия, 
    то в зависимости от состояния "symbol", 
    определяется поведение приложения*/ else if (actions.indexOf(mark) !== -1) {
      /*Если состояния "sybmol" && "numberActive" пустуют, 
      то вспомогательному состоянию присваивается 
      значение текущего состояния, состоянию 
      символа присваивается значение вводимого 
      символа, активному состоянию присваивается пустая строка*/
      if (!symbol && !numberTemp) {
        setSymbol(mark);
        setNumberTemp(numberActive);
        setNumberActive("");
        /* Если оба состояния не пустые, то состоянию "numberTemp`"*/ 
      } else if (symbol && numberActive) {
        setSymbol(mark);
        setNumberTemp(doAction().toString());
        setNumberActive("");
      } else {
        setSymbol(mark);
      }
    } else if (mark === "C") {
      setSymbol("");
      setNumberTemp("");
      setNumberActive("");
    } else if (mark === "=") {
      setNumberActive(doAction().toString());
      setNumberTemp("");
      setSymbol("");
    }
  }

  function doAction() {
    switch (symbol) {
      case "+":
        return Number(numberActive) + Number(numberTemp);
      case "-":
        return Number(numberTemp) - Number(numberActive);
      case "*":
        return Number(numberActive) * Number(numberTemp);
      case "/":
        return Number(numberTemp) / Number(numberActive);
    }
  }

  function remove() {
    setNumberActive(numberActive.slice(0, numberActive.length - 1));
  }

  return (
    <div className="text-center body">
      <h1>Калькулятор</h1>
      <div className="output">
        <span>
          <h4>{symbol}</h4>
        </span>
        <span>
          <p>{numberTemp}</p>
        </span>
        <span>
          <h4>{numberActive}</h4>
        </span>
        <button
          className="btn btn-success"
          onClick={() => {
            remove();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </button>
      </div>
      <div className="calc">
        {symbols.map((el) => {
          return (
            <button
              onClick={() => {
                change(el);
              }}
              className={`btn ${el === "C" ? "btn-danger" : "btn-dark"}`}
            >
              {el}
            </button>
          );
        })}
      </div>
    </div>
  );
};
