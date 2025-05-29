import { Problem } from "./problem";

export interface Practice {
    id: string;
    solvedProblems: Problem;
    unsolvedProblems: Problem;
}