export default function OperationButton({ operation }: { operation: string }) {
    function getClassToUse() {
        if (operation === "+") return "plus-button";
        if (operation === "-") return "minus-button";
        if (operation === "x") return "multiply-button";
        if (operation === "/") return "divide-button";
        if (operation === ".") return "period-button";
    }
    
    return (
        <button 
            className={`operation-button ${getClassToUse()}`}
        >
            { operation }
        </button>
    );
}