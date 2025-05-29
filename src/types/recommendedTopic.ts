import { Topic } from "./topic";

export interface RecommendedTopic {
    subjectName: string;
    difficulty: string;
    recommendedTime: number;
    subTopic: Topic;
}