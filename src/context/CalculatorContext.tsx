import { useState, useContext, createContext, ReactNode } from "react";

type CalculatorContextType = {
    currentOperand: string,
    calculate: () => void,
    chooseOperation: (operation: string) => void,
    addDigit: (digit: string) => void,
    deleteDigit: () => void,
    reset: () => void
}

const CalculatorContext = createContext<CalculatorContextType>(null!);

export function useCalculator() {
    return useContext(CalculatorContext);
}

export const OPERATIONS = {
    ADD: "+",
    SUBTRACT: "-",
    MULTIPLY: "x",
    DIVIDE: "/"
} as const;

export default function CalculatorProvider({ children }: { children: ReactNode }) {
    const [currentOperand, setCurrentOperand] = useState<string>("0");
    const [previousOperand, setPreviousOperand] = useState<string>("0");
    const [currentOperation, setCurrentOperation] = useState<string>();

    function calculate() {
        const currentOperandAsNumber = +currentOperand;
        const previousOperandAsNumber = +previousOperand;

        switch(currentOperation) {
            case OPERATIONS.ADD:
                //fix calculating being backwards

                break;
            case OPERATIONS.SUBTRACT:
                
                break;
            case OPERATIONS.MULTIPLY:
                
                break;
            case OPERATIONS.DIVIDE:
                
                break;
        }
    }

    function chooseOperation(operation: string) {
        setCurrentOperation(operation);
        setPreviousOperand(currentOperand);
        setCurrentOperand("0");
    }

    function addDigit(digit: string) {
        setCurrentOperand(prevOperand => {
            if (prevOperand[0] === "0") return digit;
            if (digit === "." && prevOperand.includes(".")) return prevOperand;
            return prevOperand + digit;
        });
    }

    function deleteDigit() {
        setCurrentOperand(prevOperand => {
            if (prevOperand === "0") return prevOperand;
            if (prevOperand.length <= 1) return "0";
            return prevOperand.slice(0, prevOperand.length - 1);
        });
    }

    function reset() {
        setCurrentOperand("0");
        setPreviousOperand("0");
        setCurrentOperation(undefined);
    }

    return (
        <CalculatorContext.Provider value={{ currentOperand, calculate, chooseOperation, addDigit, deleteDigit, reset }}>
            { children }
        </CalculatorContext.Provider>
    );
}