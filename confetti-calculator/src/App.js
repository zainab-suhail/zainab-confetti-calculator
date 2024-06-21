import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Display from './components/Display';
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
    { label: '(', className: 'hidden-mobile' },
    { label: ')', className: 'hidden-mobile' },
    { label: 'mc', className: 'hidden-mobile' },
    { label: 'm+', className: 'hidden-mobile' },
    { label: 'm-', className: 'hidden-mobile' },
    { label: 'mr', className: 'hidden-mobile' },
    { label: 'C', className: '' },
    { label: '±', className: '' },
    { label: '%', className: '' },
    { label: '÷', className: 'operator' },
    { label: '2nd', className: 'hidden-mobile' },
    { label: 'x²', className: 'hidden-mobile' },
    { label: 'x³', className: 'hidden-mobile' },
    { label: 'xʸ', className: 'hidden-mobile' },
    { label: 'eˣ', className: 'hidden-mobile' },
    { label: '10ˣ', className: 'hidden-mobile' },
    { label: '7', className: 'number' },
    { label: '8', className: 'number' },
    { label: '9', className: 'number' },
    { label: '×', className: 'operator' },
    { label: '¹/x', className: 'hidden-mobile' },
    { label: '²√x', className: 'hidden-mobile' },
    { label: '³√x', className: 'hidden-mobile' },
    { label: 'ʸ√x', className: 'hidden-mobile' },
    { label: 'ln', className: 'hidden-mobile' },
    { label: 'log₁₀', className: 'hidden-mobile' },
    { label: '4', className: 'number' },
    { label: '5', className: 'number' },
    { label: '6', className: 'number' },
    { label: '−', className: 'operator' },
    { label: 'x!', className: 'hidden-mobile' },
    { label: 'sin', className: 'hidden-mobile' },
    { label: 'cos', className: 'hidden-mobile' },
    { label: 'tan', className: 'hidden-mobile' },
    { label: 'e', className: 'hidden-mobile' },
    { label: 'EE', className: 'hidden-mobile' },
    { label: '1', className: 'number' },
    { label: '2', className: 'number' },
    { label: '3', className: 'number' },
    { label: '+', className: 'operator' },
    { label: 'Rad', className: 'hidden-mobile' },
    { label: 'sinh', className: 'hidden-mobile' },
    { label: 'cosh', className: 'hidden-mobile' },
    { label: 'tanh', className: 'hidden-mobile' },
    { label: 'π', className: 'hidden-mobile' },
    { label: 'Rand', className: 'hidden-mobile' },
    { label: '0', className: 'zero number' },
    { label: '.', className: 'number' },
    { label: '=', className: 'operator' },
  ];

  return (
    <div className="calculator">
      {isExploding && <ConfettiExplosion />}
      <Display value={display} />
      <div className="buttons">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            label={btn.label}
            className={btn.className}
            onClick={() => handleClick(btn.label)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
