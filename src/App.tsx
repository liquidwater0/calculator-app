import { useState, useEffect } from 'react';
import "./scss/App.scss";
import Switch from './components/Switch';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';

function App() {
	const [theme, setTheme] = useState<string>("1");

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<>
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
						399,981
					</div>
				</div>

				<div className="key-pad">
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(digit => 
						<DigitButton 
							key={digit} 
							digit={digit}
						/>
					)}
					{["+", "-", "x", "/", "."].map(operation => 
						<OperationButton 
							key={operation} 
							operation={operation}
						/>
					)}
					<button className="secondary reset-button">
						Reset
					</button>
					<button className="secondary del-button">
						Del
					</button>
					<button className="equals-button">
						=
					</button>
				</div>
			</div>
			
			{/* <div className="attribution">
				Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
				Coded by <a href="#">Your Name Here</a>.
			</div> */}
		</>
	)
}

export default App;