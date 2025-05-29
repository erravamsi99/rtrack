import {ProgressWidget} from "./progressWidget";
import {PerformanceWidget} from "./performanceWidget";
import {LearningStreakWidget} from "./learningStreakWidget";
import {Topic} from "./topic";
import {Insights} from "./insights";
import { Practice } from "./practice";

export interface Subject {
  id: string;
  name: string;
  subjectCode: string;
  gradeLevel: string;
  difficulty: string;
  description: string;

  overallProgress: ProgressWidget;
  recentPerformance: PerformanceWidget;
  learningStreak: LearningStreakWidget;

  allTopics: Topic[];
  completedTopics: Topic[];
  inProgressTopics: Topic[];
  insights: Insights;
  practice: Practice;
}