import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '/':
        return firstValue / secondValue;
      case '*':
        return firstValue * secondValue;
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const deleteLast = () => {
    if (!waitingForNewValue && display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="bg-gray-800 text-white text-4xl font-mono p-4 rounded-lg mb-4 text-right overflow-hidden">
          {display}
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={clear}
            className="bg-red-500 text-white font-semibold rounded-lg p-4 text-xl hover:bg-red-600 active:scale-95 transition-all"
          >
            C
          </button>
          <button
            onClick={() => performOperation('/')}
            className="bg-purple-500 text-white font-semibold rounded-lg p-4 text-xl hover:bg-purple-600 active:scale-95 transition-all"
          >
            ÷
          </button>
          <button
            onClick={() => performOperation('*')}
            className="bg-purple-500 text-white font-semibold rounded-lg p-4 text-xl hover:bg-purple-600 active:scale-95 transition-all"
          >
            ×
          </button>
          <button
            onClick={deleteLast}
            className="bg-gray-500 text-white font-semibold rounded-lg p-4 text-xl hover:bg-gray-600 active:scale-95 transition-all"
          >
            ←
          </button>
          
          <button
            onClick={() => inputNumber(7)}
            className="bg-gray-200 hover:bg-gray-300 font-semibold rounded-lg p-4 text-xl active:scale-95 transition-all"
          >
            7
          </button>
          <button
            onClick={() => inputNumber(8)}
            className="bg-gray-200 hover:bg-gray-300 font-semibold rounded-lg p-4 text-xl active:scale-95 transition-all"
          >
            8
          </button>
          <button
            onClick={() => inputNumber(9)}
            className="bg-gray-200 hover:bg-gray-300 font-semibold rounded-lg p-4 text-xl active:scale-95 transition-all"
          >
            9
          </button>
          <button
            onClick={() => performOperation('-')}
            className="bg-purple-500 text-white font-semibold rounded-lg p-4 text-xl hover:bg-purple-600 active:scale-95 transition-all"
          >
            −
          </button>
          
          <button
            onClick={() => inputNumber(4)}
            className="bg-gray-200 hover:bg-gray-300 font-semibold rounded-lg p-4 text-xl active:scale-95 transition-all"
          >
            4
          </button>
          <button
            onClick={() => inputNumber(5)}
            className="bg-gray-200 hover:bg-gray-300 font-semibold rounded-lg p-4 text-xl active:scale-95 transition-all"
          >
            5
          </button>
          <button
            onClick={() => inputNumber(6)}
            className="bg-gray-200 hover:bg-gray-300 font-semibold rounded-lg p-4 text-xl active:scale-95 transition-all"
          >
            6
          </button>
          <button
            onClick={() => performOperation('+')}
            className="bg-purple-500 text-white font-semibold rounded-lg p-4 text-xl hover:bg-purple-600 active:scale-95 transition-all"
          >
            +
          </button>
          
          <button
            onClick={() => inputNumber(1)}
            className="bg-gray-200 hover:bg-gray-300 font-semibold rounded-lg p-4 text-xl active:scale-95 transition-all"
          >
            1
          </button>
          <button
            onClick={() => inputNumber(2)}
            className="bg-gray-200 hover:bg-gray-300 font-semibold rounded-lg p-4 text-xl active:scale-95 transition-all"
          >
            2
          </button>
          <button
            onClick={() => inputNumber(3)}
            className="bg-gray-200 hover:bg-gray-300 font-semibold rounded-lg p-4 text-xl active:scale-95 transition-all"
          >
            3
          </button>
          <button
            onClick={inputDecimal}
            className="bg-gray-200 hover:bg-gray-300 font-semibold rounded-lg p-4 text-xl active:scale-95 transition-all"
          >
            .
          </button>
          
          <button
            onClick={() => inputNumber(0)}
            className="bg-gray-200 hover:bg-gray-300 font-semibold rounded-lg p-4 text-xl active:scale-95 transition-all col-span-2"
          >
            0
          </button>
          <button
            onClick={performCalculation}
            className="bg-green-500 text-white font-semibold rounded-lg p-4 text-xl hover:bg-green-600 active:scale-95 transition-all col-span-2"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}