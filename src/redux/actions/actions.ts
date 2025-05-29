import {
  ALL_SUBJECTS, CURRENT_SUB_TOPIC,
  CURRENT_SUBJECT, CURRENT_TOPIC,
  CURRENT_TOPICS, LEARNING_PROGRESS, LEARNING_STREAK,
  OVERALL_PROGRESS,
  RECENT_PERFORMANCE, RECOMMENDATION, USER_SESSION, WELCOME_MESSAGE
} from "../actionTypes/types";
import {Subject} from "../../types/subject";

export const setUserSession = (data: any) => ({
  type: USER_SESSION,
  payload: data,
});


export const setAllSubject = (subjects: Subject[]) => ({
  type: ALL_SUBJECTS,
  payload: subjects,
});

export const setSubject = (subject: Subject) => ({
  type: CURRENT_SUBJECT,
  payload: subject,
});

export const setSubjectProgress = (data: any) => ({
  type: OVERALL_PROGRESS,
  payload: data,
});
export const setSubjectPerformance = (data: any) => ({
  type: RECENT_PERFORMANCE,
  payload: data,
});
export const setSubjectLearningStreak = (data: any) => ({
  type: LEARNING_STREAK,
  payload: data,
});

export const setCurrentTopics = (data: any) => ({
  type: CURRENT_TOPICS,
  payload: data,
});

export const setWelcomeMessage = (data: any) => ({
  type: WELCOME_MESSAGE,
  payload: data,
});

export const setLearningProgress = (data: any) => ({
  type: LEARNING_PROGRESS,
  payload: data,
});

export const setRecommendations = (data: any) => ({
  type: RECOMMENDATION,
  payload: data,
});

export const setTopic = (data: any) => ({
  type: CURRENT_TOPIC,
  payload: data,
});

export const setSubTopic = (data: any) => ({
  type: CURRENT_SUB_TOPIC,
  payload: data,
});

//
// setTopicTests
// setTopicInsights
// setConcept

// todo: add more actions
