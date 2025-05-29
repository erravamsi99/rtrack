import {Subject} from "../types/subject";
import {AxiosResponse } from "axios";
import api from "./apiService";
import envUrls from "../utils/apiConfig";
import { Topic } from "../types/topic";
import { SubTopic } from "../types/subtopic";
import { ProgressWidget } from "../types/progressWidget";
import { PerformanceWidget } from "../types/performanceWidget";
import { LearningStreakWidget } from "../types/learningStreakWidget";
import { RecommendationsWidget } from "../types/recommendationsWidget";
import { Test } from "../types/test";
import { Concept } from "../types/concept";
import { Insights } from "../types/insights";
import { Problem } from "../types/problem";
import { Solution } from "../types/solution";
import { Practice } from "../types/practice";
import { RecommendationCarousels } from "../types/recommendationCarousels";
class AppService {

  getAllSubjects = async (): Promise<AxiosResponse<Subject[]>> => {
    const response: AxiosResponse<any> = await api.get(envUrls.apis.subjects);
    if (!response) throw new Error("Failed to fetch subjects");
    return response;
  };

  getSubject = async (
    subjectCode: string
  ): Promise<AxiosResponse<Subject>> => {
    const response: AxiosResponse<any> = await api.get(envUrls.apis.subject, {params: {subjectCode}});
    if (!response) throw new Error("Failed to fetch subject");
    return response;
  };

  getTopic = async (
    subjectCode: string, 
    topicId: string, 
    userId: string
  ): Promise<AxiosResponse<Topic>> => {
    console.log({subjectCode, topicId, userId});
    const response: AxiosResponse<Topic> = await api.get(
      envUrls.apis.topic, 
      {params: {subjectCode, topicId, userId}}
    );
    if (!response) throw new Error("Failed to fetch topics");
    return response;
  };

  getSubTopic = async (
    subjectCode: string, 
    topicId: string, 
    subTopicId: string, 
    userId: string
  ): Promise<AxiosResponse<SubTopic>> => {
    const response: AxiosResponse<SubTopic> = await api.get(
      envUrls.apis.subtopic,
      {params: {subjectCode, topicId, subTopicId, userId}}
    );
    if (!response) throw new Error("Failed to fetch subTopics");
    return response;
  };

  getSubjectProgress = async(
    subjectCode: string,
    userId: string
  ): Promise<AxiosResponse<ProgressWidget>> => {
    const response: AxiosResponse<ProgressWidget> = await api.get(
      envUrls.apis.progress,
      {params: {subjectCode, userId}}
    );
    if (! response) throw new Error("Failed to fetch subject progress widget");
    return response;
  };

  getTopicProgress = async(
    subjectCode: string,
    topicId: string,
    userId: string
  ): Promise<AxiosResponse<ProgressWidget>> => {
    const response: AxiosResponse<ProgressWidget> = await api.get(
      envUrls.apis.progress,
      {params: {subjectCode, topicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch topic progress widget");
    return response;
  };

  getSubTopicProgress = async(
    subjectCode: string,
    topicId: string,
    subTopicId: string,
    userId: string
  ): Promise<AxiosResponse<ProgressWidget>> => {
    const response: AxiosResponse<ProgressWidget> = await api.get(
      envUrls.apis.progress,
      {params: {subjectCode, topicId, subTopicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch subTopic progress widget");
    return response;
  };

  getSubjectPerformance = async(
    subjectCode: string,
    userId: string
  ): Promise<AxiosResponse<PerformanceWidget>> => {
    const response: AxiosResponse<PerformanceWidget> = await api.get(
      envUrls.apis.recent_performance,
      {params: {subjectCode, userId}}
    );
    if (! response) throw new Error("Failed to fetch subject performance widget");
    return response;
  }

  getTopicPerformance = async(
    subjectCode: string,
    topicId: string,
    userId: string
  ): Promise<AxiosResponse<PerformanceWidget>> => {
    const response: AxiosResponse<PerformanceWidget> = await api.get(
      envUrls.apis.recent_performance,
      {params: {subjectCode, topicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch topic performance widget");
    return response;
  }

  getSubTopicPerformance = async(
    subjectCode: string,
    topicId: string,
    subTopicId: string,
    userId: string
  ): Promise<AxiosResponse<PerformanceWidget>> => {
    const response: AxiosResponse<PerformanceWidget> = await api.get(
      envUrls.apis.recent_performance,
      {params: {subjectCode, topicId, subTopicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch subTopic performance widget");
    return response;
  }

  getSubjectLearningStreak = async(
    subjectCode: string,
    userId: string
  ): Promise<AxiosResponse<LearningStreakWidget>> => {
    const response: AxiosResponse<LearningStreakWidget> = await api.get(
      envUrls.apis.learning_streak,
      {params: {subjectCode, userId}}
    );
    if (! response) throw new Error("Failed to fetch subject learning streak");
    return response;
  }

  getTopicLearningStreak = async(
    subjectCode: string,
    topicId: string,
    userId: string
  ): Promise<AxiosResponse<LearningStreakWidget>> => {
    const response: AxiosResponse<LearningStreakWidget> = await api.get(
      envUrls.apis.learning_streak,
      {params: {subjectCode, topicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch topic learning streak");
    return response;
  }

  getSubTopicLearningStreak = async(
    subjectCode: string,
    topicId: string,
    subTopicId: string,
    userId: string
  ): Promise<AxiosResponse<LearningStreakWidget>> => {
    const response: AxiosResponse<LearningStreakWidget> = await api.get(
      envUrls.apis.learning_streak,
      {params: {subjectCode, topicId, subTopicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch subTopic learning streak");
    return response;
  }

  getRecommendations = async(
    userId: string
  ): Promise<AxiosResponse<RecommendationsWidget>> => {
    const response: AxiosResponse<RecommendationsWidget> = await api.get(
      envUrls.apis.recommendations,
      {params: {userId}}
    );
    if (! response) throw new Error("Failed to fetch recommendations");
    return response;
  }

  getRecommendationCarouselsForSubject = async(
    subjectCode: string,
    userId: string,
  ): Promise<AxiosResponse<RecommendationCarousels>> => {
    const response: AxiosResponse<RecommendationCarousels> = await api.get(
      envUrls.apis.recommendationCarousels,
      {params: {subjectCode, userId}}
    );
    if (! response) throw new Error("Failed to fetch recommendations");
    return response;
  }

  getRecommendationCarouselsForTopic = async(
    topicId: string,
    userId: string,
  ): Promise<AxiosResponse<RecommendationCarousels>> => {
    const response: AxiosResponse<RecommendationCarousels> = await api.get(
      envUrls.apis.recommendationCarousels,
      {params: {topicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch recommendations");
    return response;
  }

  getRecommendationCarouselsForSubTopic = async(
    subTopicId: string,
    userId: string,
  ): Promise<AxiosResponse<RecommendationCarousels>> => {
    const response: AxiosResponse<RecommendationCarousels> = await api.get(
      envUrls.apis.recommendationCarousels,
      {params: {subTopicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch recommendations");
    return response;
  }

  getSubjectTests = async(
    subjectCode: string, 
    userId: string
  ): Promise<AxiosResponse<Test[]>> => {
    const response: AxiosResponse<Test[]> = await api.get(
      envUrls.apis.tests,
      {params: {subjectCode, userId}}
    );
    if (! response) throw new Error("Failed to fetch subject tests");
    return response;
  }

  getTopicTests = async(
    subjectCode: string, 
    topicId: string, 
    userId: string
  ): Promise<AxiosResponse<Test[]>> => {
    const response: AxiosResponse<Test[]> = await api.get(
      envUrls.apis.tests,
      {params: {subjectCode, topicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch topic tests");
    return response;
  }

  getSubTopicTests = async(
    subjectCode: string, 
    topicId: string, 
    subTopicId: string,
    userId: string
  ): Promise<AxiosResponse<Test[]>> => {
    const response: AxiosResponse<Test[]> = await api.get(
      envUrls.apis.tests,
      {params: {subjectCode, topicId, subTopicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch subtopic tests");
    return response;
  }

  getSubjectInsights = async(
    subjectCode: string, 
    userId: string
  ): Promise<AxiosResponse<Insights>> => {
    const response: AxiosResponse<Insights> = await api.get(
      envUrls.apis.insights,
      {params: {subjectCode, userId}}
    );
    if (! response) throw new Error("Failed to fetch subject insights");
    return response;
  }

  getTopicInsights = async(
    subjectCode: string, 
    topicId: string, 
    userId: string
  ): Promise<AxiosResponse<Insights>> => {
    const response: AxiosResponse<Insights> = await api.get(
      envUrls.apis.insights,
      {params: {subjectCode, topicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch topic insights");
    return response;
  }

  getSubTopicInsights = async(
    subjectCode: string, 
    topicId: string, 
    subTopicId: string,
    userId: string
  ): Promise<AxiosResponse<Insights>> => {
    const response: AxiosResponse<Insights> = await api.get(
      envUrls.apis.insights,
      {params: {subjectCode, topicId, subTopicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch subtopic insights");
    return response;
  }

  getSubjectLearning = async(
    subjectCode: string, 
    userId: string
  ): Promise<AxiosResponse<Subject>> => {
    const response: AxiosResponse<Subject> = await api.get(
      envUrls.apis.subject_learning,
      {params: {subjectCode, userId}}
    );
    if (! response) throw new Error("Failed to fetch subject learning data");
    return response;
  }

  getTopicLearning = async(
    subjectCode: string, 
    topicId: string,
    userId: string
  ): Promise<AxiosResponse<Topic>> => {
    const response: AxiosResponse<Topic> = await api.get(
      envUrls.apis.topic_learning,
      {params: {subjectCode, topicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch topic learning data");
    return response;
  }

  getSubTopicLearning = async(
    subjectCode: string, 
    topicId: string,
    subTopicId: string,
    userId: string
  ): Promise<AxiosResponse<SubTopic>> => {
    const response: AxiosResponse<SubTopic> = await api.get(
      envUrls.apis.subtopic_learning,
      {params: {subjectCode, topicId, subTopicId, userId}}
    );
    if (! response) throw new Error("Failed to fetch subtopic learning data");
    return response;
  }

  getConcept = async(
    subjectCode: string,
    topicId: string,
    subTopicId: string,
    conceptId: string,
    userId: string
  ): Promise<AxiosResponse<Concept>> => {
    const response: AxiosResponse<Concept> = await api.get(
      envUrls.apis.concept,
      {params: {subjectCode, topicId, subTopicId, conceptId, userId}}
    );
    if (! response) throw new Error("Failed to fetch concept");
    return response;
  }

  getProblem = async(
    problemId: string,
  ): Promise<AxiosResponse<Problem>> => {
    const response: AxiosResponse<Problem> = await api.get(
      envUrls.apis.problem,
      {params: {problemId}}
    );
    if (! response) throw new Error("Failed to fetch problem");
    return response;
  }

  getProblemHint = async(
    problemId: string,
    hintId: string,
  ): Promise<AxiosResponse<string>> => {
    const response: AxiosResponse<string> = await api.get(
      envUrls.apis.problemHint,
      {params: {problemId, hintId}}
    );
    if (! response) throw new Error("Failed to fetch problem hint");
    return response;
  }

  getSolution = async(
    problemId: string,
  ): Promise<AxiosResponse<Solution>> => {
    const response: AxiosResponse<Solution> = await api.get(
      envUrls.apis.solution,
      {params: {problemId}}
    );
    if (! response) throw new Error("Failed to fetch solution");
    return response;
  }

  getPractice = async(
    studentId: string,
    practiceId: string,
  ): Promise<AxiosResponse<Practice>> => {
    const response: AxiosResponse<Practice> = await api.get(
      envUrls.apis.practice,
      {params: {studentId, practiceId}}
    );
    if (! response) throw new Error("Failed to fetch practice");
    return response;
  }

  // Home Page
  getWelcomeMessage = async(): Promise<AxiosResponse<string>> => {
    const response: AxiosResponse<string> = await api.get(envUrls.apis.student_welcome_message);
    if (! response) throw new Error("Failed to fetch welcome message");
    return response;
  }

  getLearningProgress = async(): Promise<AxiosResponse<any>> => {
    const response: AxiosResponse<any> = await api.get(envUrls.apis.student_chart_data);
    if (! response) throw new Error("Failed to fetch charts");
    return response;
  }
}

export const appService: AppService = new AppService();