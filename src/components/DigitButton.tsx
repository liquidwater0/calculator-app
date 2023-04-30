import { useCalculator } from "../context/CalculatorContext";

export default function DigitButton({ digit }: { digit: string }) {
    const { addDigitToOperand } = useCalculator();

    return (
        <button 
            className={`digit-button digit-${digit === "." ? "period" : digit}-button`}
            onClick={() => addDigitToOperand(digit)}
        >
            { digit }
        </button>
    );
}