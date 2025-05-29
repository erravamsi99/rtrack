import {Step, Stepper} from "./Stepper";
import React, {useEffect, useState} from "react";
import {Brain} from "lucide-react";
import {AnalysisStepperContent} from "./AnalysisStepperContent";

export const PracticeAnalysis = (props: any) => {
  const {steps} = props;
  const [analysisSteps, setAnalysisSteps] = useState<Step[]>([]);


  useEffect(() => {
    console.log('useEffect', steps);
    const updatedSteps: Step[] = steps.map((step: any) => ({ content: <AnalysisStepperContent title={step?.title} content={step?.content}/> }));
    setAnalysisSteps(updatedSteps);
  }, [steps]);

  return (
    <div className="border rounded p-4" data-comp-id="practice-analysis">
      <div className="d-flex align-items-center gap-2">
        <Brain />
        <h3 className="mb-0">AI Analysis</h3>
      </div>
      <p>Walk through the problem step by step.</p>
      {analysisSteps && <Stepper steps={analysisSteps} />}
    </div>
  );
};