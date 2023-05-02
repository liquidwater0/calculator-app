import { useState, useEffect, useRef, useImperativeHandle, forwardRef, Ref } from 'react';

export type StepSwitchType = { forward: () => void };

type Step = {
    stepNumber: number,
    selected: boolean
}

type StepSwitchProps = {
    steps: number,
    defaultStep?: number,
    onUpdate?: (currentStep: number) => void
}

type StepButtonProps = {
    step: Step,
    name: string,
    stepsArray: Step[],
    switchToStep: (step: number) => void
} 

function StepButton({ step, name, stepsArray, switchToStep }: StepButtonProps) {
    const { stepNumber } = step;
    
    return (
        <>
            <button 
                aria-label={`step-${stepNumber}-toggle`}
                aria-controls={`step-${stepNumber}-input`}
                data-step={stepNumber}
                onClick={() => switchToStep(stepNumber)}
            ></button>
            <input
                style={{ display: "none" }}
                type="radio" 
                defaultChecked={stepNumber === stepsArray.find(step => step.selected)?.stepNumber ? true : false}
                name={name}
                id={`step-${stepNumber}-input`}
            />
        </>
    );
}

function StepSwitch({ steps, defaultStep, onUpdate }: StepSwitchProps, ref: Ref<StepSwitchType>) {
    const [stepsArray, setStepsArray] = useState<Step[]>(() => {
        let stepAmount = steps;

        if (steps <= 2) stepAmount = 2;

        return new Array(stepAmount).fill(1).map((_, index) => {
            const object = { stepNumber: index + 1, selected: false };

            if (
                object.stepNumber === defaultStep || 
                !defaultStep && 
                object.stepNumber === 1 ||
                defaultStep && 
                defaultStep > steps && 
                object.stepNumber === 1
            ) object.selected = true;

            return object;
        });
    });
    const stepSliderRef = useRef<HTMLDivElement>(null!);
    const name = crypto.randomUUID();

    useImperativeHandle(ref, () => {
        return {
            forward: () => {
                const selectedStep = stepsArray.find(step => step.selected);
                if (!selectedStep) return;
                
                if (selectedStep.stepNumber >= stepsArray.length) {
                    switchToStep(1);
                } else {
                    switchToStep(selectedStep.stepNumber + 1);
                }
            }
        }
    }, []);

    useEffect(() => {
        const currentSelectedStep = stepsArray.find(currentStep => currentStep.selected);
        if (!currentSelectedStep) return;

        if (stepSliderRef.current) {
            stepSliderRef.current.style.setProperty("--step-number", currentSelectedStep.stepNumber.toString());
        }

        if (onUpdate) {
            onUpdate(currentSelectedStep.stepNumber);
        }
    }, [stepsArray]);

    function switchToStep(step: number) {
        setStepsArray(prevSteps => {
            const newArray = [...prevSteps];

            const selectedStep = newArray.find(currentStep => currentStep.selected);
            if (!selectedStep) return prevSteps;
            selectedStep.selected = false;

            const clickedStep = newArray.find(currentStep => currentStep.stepNumber === step);
            if (!clickedStep) return prevSteps;
            clickedStep.selected = true;

            return newArray;
        });
    }
    
    return (
        <div className='step-slider' ref={stepSliderRef}>
            <div className="slider-thumb"/>

            {stepsArray.map(step =>
                <StepButton
                    key={step.stepNumber}
                    step={step}
                    name={name}
                    stepsArray={stepsArray}
                    switchToStep={switchToStep}
                />
            )}
        </div>
    );
}

export default forwardRef(StepSwitch);