import {
  ALL_SUBJECTS, CURRENT_SUB_TOPIC,
  CURRENT_SUBJECT, CURRENT_TOPIC,
  CURRENT_TOPICS, LEARNING_PROGRESS, LEARNING_STREAK,
  OVERALL_PROGRESS,
  RECENT_PERFORMANCE, RECOMMENDATION, USER_SESSION, WELCOME_MESSAGE
} from "../actionTypes/types";

const initialState = {
  subjects: null,
  subject: null,
  session: null,
  overallProgress: null,
  recentPerformance: null,
  learningStreak: null,
  currentTopics: null,

  welcomeMessage: '',
  learningProgressChartData: null,

  topic: null,

  recommendedTopics: null,
  subTopic: null
  // todo: add more fields
};

const AppReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_SESSION:
      return { ...state, session: action.payload };
    case ALL_SUBJECTS:
      return { ...state, subjects: action.payload };
    case CURRENT_SUBJECT:
      return { ...state, subject: action.payload };
    case OVERALL_PROGRESS:
      return { ...state, overallProgress: action.payload };
    case RECENT_PERFORMANCE:
      return { ...state, recentPerformance: action.payload };
    case LEARNING_STREAK:
      return { ...state, learningStreak: action.payload };
    case CURRENT_TOPIC:
      return { ...state, topic: action.payload };
    case CURRENT_TOPICS:
      return { ...state, currentTopics: action.payload };
    case WELCOME_MESSAGE:
      return { ...state, welcomeMessage: action.payload };
    case LEARNING_PROGRESS:
      return { ...state, learningProgressChartData: action.payload };
    case RECOMMENDATION:
      return { ...state, recommendedTopics: action.payload };
    case CURRENT_SUB_TOPIC:
      return { ...state, subTopic: action.payload };
    // todo: add more cases
    default:
      return state;
  }
};

export default AppReducer;
