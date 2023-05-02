import { useEffect, useRef } from 'react';
import "./scss/App.scss";
import { useCalculator, Digit, Operation } from './context/CalculatorContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import StepSwitch, { StepSwitchType } from './components/StepSwitch';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';

function App() {
	const { display, calculate, deleteDigit, reset } = useCalculator();
	const [theme, setTheme] = useLocalStorage<string>("calc-app-theme", "1");
	const themeSwitchRef = useRef<StepSwitchType>(null!);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<main>
			<div className="calculator">
				<header className="calculator-header">
					<div className='title'>calc</div>
					<div className="theme-toggle-container">
						<label onClick={() => themeSwitchRef.current.forward()}>Theme</label>
						<StepSwitch
							ref={themeSwitchRef}
							steps={3}
							defaultStep={+theme}
							onUpdate={currentStep => setTheme(currentStep.toString())}
						/>
					</div>
				</header>

				<div className="calculator-display">
					<div className="calculator-display-text">
						{ new Intl.NumberFormat().format(+display.split(".")[0]) } 
						{ display.includes(".") && "." }
						{ display.split(".")[1] }
					</div>
				</div>

				<div className="key-pad">
					{(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."] as Digit[]).map(digit => 
						<DigitButton 
							key={digit} 
							digit={digit}
						/>
					)}
					{(["+", "-", "x", "/"] as Operation[]).map(operation => 
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
			
			<div className="attribution">
				Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
				Coded by <a href="https://www.frontendmentor.io/profile/liquidwater0">@liquidwater0</a>.
			</div>
		</main>
	)
}

export default App;