import { breadCrumbElement } from "./breadCrumbElement";
import { Concept } from "./concept";
import { Insights } from "./insights";
import { Practice } from "./practice";

export interface SubTopic {
  subTopicId: string;
  name: string;
  breadCrumbs: breadCrumbElement[];
  grade: string;
  allConcepts: Concept[];
  completedConcepts: Concept[];
  currentConcept: Concept;
  insights: Insights;
  practice: Practice;
}
