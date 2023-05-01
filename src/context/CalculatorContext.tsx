import { useState, useEffect, useContext, createContext, ReactNode } from "react";

export type Operation = 
    typeof OPERATIONS.ADD |
    typeof OPERATIONS.SUBTRACT |
    typeof OPERATIONS.MULTIPLY |
    typeof OPERATIONS.DIVIDE;

export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ".";

type CalculatorContextType = {
    display: string,
    calculate: () => void,
    chooseOperation: (operation: Operation) => void,
    addDigit: (digit: Digit) => void,
    deleteDigit: () => void,
    reset: () => void
}
   
export const OPERATIONS = {
    ADD: "+",
    SUBTRACT: "-",
    MULTIPLY: "x",
    DIVIDE: "/"
} as const;

const CalculatorContext = createContext<CalculatorContextType>(null!);

export function useCalculator() {
    return useContext(CalculatorContext);
}

//Make it so you can do other operations on the result from a previous calculation

export default function CalculatorProvider({ children }: { children: ReactNode }) {
    const [currentOperation, setCurrentOperation] = useState<Operation>();
    const [currentOperand, setCurrentOperand] = useState<string>("0");
    const [previousOperand, setPreviousOperand] = useState<string>("0");
    const [display, setDisplay] = useState<string>("0");

    useEffect(() => {
        setDisplay(currentOperand);
    }, [currentOperand]);

    function calculate() {
        const currentOperandAsNumber = +currentOperand;
        const previousOperandAsNumber = +previousOperand;
        let calculationResult: string = "0";

        switch(currentOperation) {
            case OPERATIONS.ADD:
                calculationResult = (previousOperandAsNumber + currentOperandAsNumber).toString();
                break;
            case OPERATIONS.SUBTRACT:
                calculationResult = (previousOperandAsNumber - currentOperandAsNumber).toString();
                break;
            case OPERATIONS.MULTIPLY:
                calculationResult = (previousOperandAsNumber * currentOperandAsNumber).toString();
                break;
            case OPERATIONS.DIVIDE:
                calculationResult = (previousOperandAsNumber / currentOperandAsNumber).toString();
                break;
        }

        setPreviousOperand(calculationResult);
        setCurrentOperand(calculationResult);
        setDisplay(calculationResult);
    }

    function chooseOperation(operation: Operation) {
        setCurrentOperation(operation);
        setPreviousOperand(currentOperand);
        setCurrentOperand("0");
    }

    function addDigit(digit: Digit) {
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
        setCurrentOperation(undefined);
        setCurrentOperand("0");
        setPreviousOperand("0");
    }

    return (
        <CalculatorContext.Provider value={{ display, calculate, chooseOperation, addDigit, deleteDigit, reset }}>
            { children }
        </CalculatorContext.Provider>
    );
}