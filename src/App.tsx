import { useState, useEffect } from 'react';
import "./scss/App.scss";
import { useCalculator } from './context/CalculatorContext';
import Switch from './components/Switch';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';

/*
	TODO:
	Fix number formatter limiting to 3 decimal places and adding 0s on long number
*/

function App() {
	const { display, calculate, deleteDigit, reset } = useCalculator();
	const [theme, setTheme] = useState<string>("1");

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<main>
			<div className="calculator">
				<header className="calculator-header">
					<div className='title'>calc</div>
					<div className="theme-toggle-container">
						<label htmlFor="">Theme</label>
						<Switch/>
					</div>
				</header>

				<div className="calculator-display">
					<div className="calculator-display-text">
						{/* { new Intl.NumberFormat(undefined).format(+currentOperand) } */}
						{ display }
					</div>
				</div>

				<div className="key-pad">
					{["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].map(digit => 
						<DigitButton 
							key={digit} 
							digit={digit}
						/>
					)}
					{["+", "-", "x", "/"].map(operation => 
						<OperationButton 
							key={operation} 
							operation={operation}
						/>
					)}
					<button 
						className="button-secondary reset-button"
						onClick={reset}
					>
						Reset
					</button>
					<button 
						className="button-secondary del-button"
						onClick={deleteDigit}
					>
						Del
					</button>
					<button 
						className="equals-button"
						onClick={calculate}
					>
						=
					</button>
				</div>
			</div>
			
			{/* <div className="attribution">
				Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
				Coded by <a href="#">Your Name Here</a>.
			</div> */}
		</main>
	)
}

export default App;