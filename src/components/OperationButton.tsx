import { useCalculator, OPERATIONS, Operation } from "../context/CalculatorContext";

export default function OperationButton({ operation }: { operation: Operation }) {
    const { chooseOperation } = useCalculator();

    function getClassToUse() {
        if (operation === OPERATIONS.ADD) return "plus-button";
        if (operation === OPERATIONS.SUBTRACT) return "minus-button";
        if (operation === OPERATIONS.MULTIPLY) return "multiply-button";
        if (operation === OPERATIONS.DIVIDE) return "divide-button";
    }
    
    return (
        <button 
            className={`button-primary ${getClassToUse()}`}
            onClick={() => chooseOperation(operation)}
        >
            { operation }
        </button>
    );
}