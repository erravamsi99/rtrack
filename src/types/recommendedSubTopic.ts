import { SubTopic } from "./subtopic";

export interface RecommendedSubTopic {
    subjectName: string;
    difficulty: string;
    recommendedTime: number;
    subTopic: SubTopic;
}