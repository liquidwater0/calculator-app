import { useState, useEffect } from 'react';
import "./scss/App.scss";

function App() {
	const [theme, setTheme] = useState<string>("1");

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<>
			app
			
			{/* <div className="attribution">
				Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
				Coded by <a href="#">Your Name Here</a>.
			</div> */}
		</>
	)
}

export default App;