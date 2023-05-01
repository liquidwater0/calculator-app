import { useCalculator, Operand } from "../context/CalculatorContext";

export default function DigitButton({ digit }: { digit: Operand }) {
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