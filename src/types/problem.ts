export interface Problem {
    id: string;
    title: string;
    type: string;
    difficulty: string;
    duration: number;
    statement: string;
    choices: string[];
    hints: string[];
}