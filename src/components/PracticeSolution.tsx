import {ProblemChoices} from "./ProblemChoices";
import {useEffect, useState} from "react";
import {appService} from "../services/appService";

export const PracticeSolution = (props: any) => {
  const {id} = props;

  const [solution, setSolution] = useState<any>(null);

  useEffect(() => {
    console.log('useEffect PracticeSolution', id);
    // TODO: Hardcoded id with phy_1, remove this and put the id
    appService.getSolution('phy_1').then(response => {
      console.log('getSolution', response.data);
      setSolution(response.data);
    });
  }, [id]);

  return (
    <div className="border rounded p-4" data-comp-id="practice-solutions">
      {solution?.choices && <ProblemChoices choices={solution.choices} isSolution={true} />}
      {solution?.detailedSolution && <div>{solution.detailedSolution}</div>}
    </div>
  );
};