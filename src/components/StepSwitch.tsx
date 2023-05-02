import { useState, useEffect, useImperativeHandle, forwardRef, Ref } from 'react';

type StepSwitchProps = {
    steps: number,
    defaultStep?: number,
    onUpdate?: (currentStep: number) => void
}

export type StepSwitchType = { forward: () => void };

type Step = {
    stepNumber: number,
    selected: boolean
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
        if (!onUpdate) return;

        const currentSelectedStep = stepsArray.find(currentStep => currentStep.selected);
        if (!currentSelectedStep) return;
        onUpdate(currentSelectedStep.stepNumber);
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
        <div className='step-slider'>
            {stepsArray.map(({ stepNumber }) =>
                <input 
                    key={stepNumber}
                    type="radio" 
                    checked={stepNumber === stepsArray.find(step => step.selected)?.stepNumber ? true : false}
                    name={name}
                    onChange={() => switchToStep(stepNumber)}
                />
            )}
        </div>
    );
}

export default forwardRef(StepSwitch);