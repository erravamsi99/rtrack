import {Test} from "./test";
import {Insights} from "./insights";
import {SubTopic} from "./subtopic";
import { Practice } from "./practice";
import { breadCrumbElement } from "./breadCrumbElement";

export interface Topic {
  topicId: string;
  name: string;
  breadCrumbs: breadCrumbElement[];
  description: string;
  grade: string;
  concepts: SubTopic[];
  tests: Test[];
  insights: Insights;

  completedSubtopics: SubTopic[];
  totalSubtopics: SubTopic[];
  currentSubtopic: SubTopic; // e.g., "Heat Engine Efficiency"
  practice: Practice;
}
