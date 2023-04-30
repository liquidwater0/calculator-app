import { useCalculator } from "../context/CalculatorContext";

export default function DigitButton({ digit }: { digit: string }) {
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