import { SubTopic } from "./subtopic";
import { Topic } from "./topic";

export interface Test {
  id: string;
  title: string;
  type: string;
  questions: number;
  duration: string;
  topics: Topic[];
  subTopics: SubTopic[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  lastScore?: number;
}