import React, { useState } from 'react';
import './App.css';
import CustomButton from './components/Button'; // Changed import to CustomButton
import CustomDisplay from './components/Display'; // Changed import to CustomDisplay
import ConfettiExplosion from 'react-confetti-explosion';

const App = () => {
  const [display, setDisplay] = useState('');
  const [isExploding, setIsExploding] = useState(false);
  const [angleUnit, setAngleUnit] = useState('deg');
  const [isSecondary, setIsSecondary] = useState(false); // For 2nd function toggling
  const [memory, setMemory] = useState(0);
  const operators = ['+', '-', '×', '÷'];

  const calculateResult = (expression) => {
    try {
      let result = eval(expression.replace('×', '*').replace('÷', '/'));
      if (result === Infinity || result === -Infinity) {
        return 'Error';
      }
      return Number(result.toFixed(10)); // Limit precision to 10 decimal places
    } catch (e) {
      return 'Error';
    }
  };

  const handleClick = (label) => {
    if (label === 'C') {
      setDisplay('');
      return;
    }

    if (label === '=') {
      const result = calculateResult(display);
      setDisplay(result.toString());
      // Confetti check
      if (display.includes('5') && display.includes('6')) {
        setIsExploding(true);
        setTimeout(() => setIsExploding(false), 3000);
      }
      return;
    }

    if (label === '±') {
      setDisplay((prev) => (prev.charAt(0) === '-' ? prev.slice(1) : '-' + prev));
      return;
    }

    if (label === '%') {
      setDisplay((prev) => (eval(prev) / 100).toString());
      return;
    }

    if (label === '(' || label === ')') {
      setDisplay((prev) => prev + label);
      return;
    }

    if (label === '2nd') {
      setIsSecondary(!isSecondary);
      // Toggle display changes for secondary functions here if needed
      return;
    }

    if (label === 'x²') {
      setDisplay((prev) => Math.pow(eval(prev), 2).toString());
      return;
    }

    if (label === 'x³') {
      setDisplay((prev) => Math.pow(eval(prev), 3).toString());
      return;
    }

    if (label === 'xʸ') {
      setDisplay((prev) => prev + '**');
      return;
    }

    if (label === 'eˣ') {
      setDisplay((prev) => Math.exp(eval(prev)).toString());
      return;
    }

    if (label === '10ˣ') {
      setDisplay((prev) => Math.pow(10, eval(prev)).toString());
      return;
    }

    if (label === '¹/x') {
      setDisplay((prev) => (1 / eval(prev)).toString());
      return;
    }

    if (label === '²√x') {
      setDisplay((prev) => Math.sqrt(eval(prev)).toString());
      return;
    }

    if (label === '³√x') {
      setDisplay((prev) => Math.cbrt(eval(prev)).toString());
      return;
    }

    if (label === 'ʸ√x') {
      setDisplay((prev) => `Math.pow(${prev}, 1/`); // To complete this operation user needs to input 'y' and '='
      return;
    }

    if (label === 'ln') {
      setDisplay((prev) => Math.log(eval(prev)).toString());
      return;
    }

    if (label === 'log₁₀') {
      setDisplay((prev) => Math.log10(eval(prev)).toString());
      return;
    }

    if (label === 'x!') {
      const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
      setDisplay((prev) => factorial(eval(prev)).toString());
      return;
    }

    if (label === 'sin') {
      const angle = angleUnit === 'deg' ? (eval(display) * Math.PI) / 180 : eval(display);
      setDisplay(Math.sin(angle).toString());
      return;
    }

    if (label === 'cos') {
      const angle = angleUnit === 'deg' ? (eval(display) * Math.PI) / 180 : eval(display);
      setDisplay(Math.cos(angle).toString());
      return;
    }

    if (label === 'tan') {
      const angle = angleUnit === 'deg' ? (eval(display) * Math.PI) / 180 : eval(display);
      setDisplay(Math.tan(angle).toString());
      return;
    }

    if (label === 'e') {
      setDisplay((prev) => prev + Math.E.toString());
      return;
    }

    if (label === 'EE') {
      setDisplay((prev) => prev + 'e');
      return;
    }

    if (label === 'Rad') {
      setAngleUnit(angleUnit === 'deg' ? 'rad' : 'deg');
      return;
    }

    if (label === 'sinh') {
      setDisplay((prev) => Math.sinh(eval(prev)).toString());
      return;
    }

    if (label === 'cosh') {
      setDisplay((prev) => Math.cosh(eval(prev)).toString());
      return;
    }

    if (label === 'tanh') {
      setDisplay((prev) => Math.tanh(eval(prev)).toString());
      return;
    }

    if (label === 'π') {
      setDisplay((prev) => prev + Math.PI.toString());
      return;
    }

    if (label === 'Rand') {
      setDisplay(Math.random().toString());
      return;
    }

    if (label === 'MC') {
      setMemory(0);
      return;
    }

    if (label === 'M+') {
      setMemory((prevMemory) => prevMemory + eval(display));
      return;
    }

    if (label === 'M-') {
      setMemory((prevMemory) => prevMemory - eval(display));
      return;
    }

    if (label === 'MR') {
      setDisplay(memory.toString());
      return;
    }

    // Append the label for other numeric and operator buttons
    setDisplay((prev) => prev + label);
  };

  const buttons = [
    { label: '(', className: 'hide' },
    { label: ')', className: 'hide' },
    { label: 'mc', className: 'hide' },
    { label: 'm+', className: 'hide' },
    { label: 'm-', className: 'hide' },
    { label: 'mr', className: 'hide' },
    { label: 'C', className: '' },
    { label: '±', className: '' },
    { label: '%', className: '' },
    { label: '÷', className: 'op' },
    { label: '2nd', className: 'hide' },
    { label: 'x²', className: 'hide' },
    { label: 'x³', className: 'hide' },
    { label: 'xʸ', className: 'hide' },
    { label: 'eˣ', className: 'hide' },
    { label: '10ˣ', className: 'hide' },
    { label: '7', className: 'num' },
    { label: '8', className: 'num' },
    { label: '9', className: 'num' },
    { label: '×', className: 'op' },
    { label: '¹/x', className: 'hide' },
    { label: '²√x', className: 'hide' },
    { label: '³√x', className: 'hide' },
    { label: 'ʸ√x', className: 'hide' },
    { label: 'ln', className: 'hide' },
    { label: 'log₁₀', className: 'hide' },
    { label: '4', className: 'num' },
    { label: '5', className: 'num' },
    { label: '6', className: 'num' },
    { label: '−', className: 'op' },
    { label: 'x!', className: 'hide' },
    { label: 'sin', className: 'hide' },
    { label: 'cos', className: 'hide' },
    { label: 'tan', className: 'hide' },
    { label: 'e', className: 'hide' },
    { label: 'EE', className: 'hide' },
    { label: '1', className: 'num' },
    { label: '2', className: 'num' },
    { label: '3', className: 'num' },
    { label: '+', className: 'op' },
    { label: 'Rad', className: 'hide' },
    { label: 'sinh', className: 'hide' },
    { label: 'cosh', className: 'hide' },
    { label: 'tanh', className: 'hide' },
    { label: 'π', className: 'hide' },
    { label: 'Rand', className: 'hide' },
    { label: '0', className: 'zero' },
    { label: '.', className: 'num' },
    { label: '=', className: 'op' },
  ];

  return (
    <div className="calculator">
      <CustomDisplay display={display} />
      <div className="buttons">
        {buttons.map((button, index) => (
          <CustomButton
            key={index}
            label={button.label}
            className={`button ${button.className}`}
            onClick={() => handleClick(button.label)}
          />
        ))}
      </div>
      {isExploding && <ConfettiExplosion />}
    </div>
  );
};

export default App;
