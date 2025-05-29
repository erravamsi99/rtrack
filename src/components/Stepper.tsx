import React, {useState} from 'react';
import {ProgressBar, Button, ButtonGroup} from 'react-bootstrap';
import {ArrowLeft, ArrowRight, Check} from "lucide-react";

export interface Step {
  content: React.ReactNode;
}

interface StepperProps {
  steps?: Step[]
}

export const Stepper: React.FC<StepperProps> = (props: StepperProps) => {
  const steps: Step[] = props.steps || [];
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([1]));

  const nextStep = () => {
    if (currentStep < steps.length + 1) {
      setCurrentStep(prev => prev + 1);
      setCompletedSteps(prev => new Set(prev).add(currentStep));
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
    setCompletedSteps(prev => new Set(prev).add(step));
  };

  const renderStepButton = (step: number) => {
    const isActive = step === currentStep;
    const isCompleted = completedSteps.has(step);
    return (
      <Button
        key={step}
        onClick={() => handleStepClick(step)}
        variant={isActive ? 'primary' : 'outline-secondary'}
        className="mx-1 px-4 flex-grow-1 rounded-1"
      >
        {isCompleted && step !== currentStep ? <Check /> : step}
      </Button>
    );
  };

  return (
    <div>
      <ProgressBar
        now={((currentStep) / steps.length) * 100}
        style={{height: 10}}
      />

      <div className="border rounded my-3">
        <div>
          {steps[currentStep-1]?.content}
        </div>

        <div className="mt-3 d-flex justify-content-between px-4 pb-4">
          <Button variant="outline-secondary" onClick={prevStep} disabled={currentStep === 1}>
            <ArrowLeft />
            Previous Step
          </Button>
          <Button variant="primary" onClick={nextStep} disabled={currentStep === steps.length}>
            Next Step
            <ArrowRight />
          </Button>
        </div>
      </div>
      <ButtonGroup className="d-flex">
        {Array.from({ length: steps.length }, (_, i) => renderStepButton(i + 1))}
      </ButtonGroup>
    </div>
  );
};