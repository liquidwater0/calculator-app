import { useCalculator, Digit } from "../context/CalculatorContext";

export default function DigitButton({ digit }: { digit: Digit }) {
    const { addDigit } = useCalculator();

    return (
        <button 
            className={`button-primary digit-${digit === "." ? "period" : digit}-button`}
            onClick={() => addDigit(digit)}
        >
            { digit }
        </button>
    );
}