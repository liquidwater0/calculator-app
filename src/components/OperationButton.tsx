import { OPERATIONS, useCalculator } from "../context/CalculatorContext";

export default function OperationButton({ operation }: { operation: string }) {
    const { chooseOperation } = useCalculator();

    function getClassToUse() {
        if (operation === OPERATIONS.ADD) return "plus-button";
        if (operation === OPERATIONS.SUBTRACT) return "minus-button";
        if (operation === OPERATIONS.MULTIPLY) return "multiply-button";
        if (operation === OPERATIONS.DIVIDE) return "divide-button";
    }
    
    return (
        <button 
            className={`operation-button ${getClassToUse()}`}
            onClick={() => chooseOperation(operation)}
        >
            { operation }
        </button>
    );
}