import { RecommendedSubTopic } from "./recommendedSubTopic";
import { RecommendedTopic } from "./recommendedTopic";

export interface RecommendationsWidget {
    topics: RecommendedTopic[];
    subTopics: RecommendedSubTopic[];
}