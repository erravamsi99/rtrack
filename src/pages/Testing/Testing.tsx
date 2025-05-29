import React, {useEffect} from 'react';
import {appService} from "../../services/appService";
import {authService} from "../../services/authService";

const Testing = () => {
  useEffect(() => {
    appService.getAllSubjects().then(response => console.log(response.data));
    appService.getTopic('phy', 'phy_2', '1').then(response => console.log(response.data));
    appService.getSubTopic('phy', 'phy_2', 'phy_2_2', '1').then(response => console.log(response.data))
    appService.getSubjectProgress('phy', '1').then(response => console.log(response.data))
    appService.getTopicProgress('phy', 'phy_1_1', '1').then(response => console.log(response.data))
    appService.getSubTopicProgress('phy', 'phy_1', 'phy_1_1','1').then(response => console.log(response.data))
    appService.getSubjectPerformance('phy', '1').then(response => console.log(response.data))
    appService.getTopicPerformance('phy', 'phy_1', '1').then(response => console.log(response.data))
    appService.getSubTopicPerformance('phy', 'phy_1', 'phy_1_1','1').then(response => console.log(response.data))
    appService.getTopicLearningStreak('phy', 'phy_1','1').then(response => console.log(response.data))
    appService.getSubTopicLearningStreak('phy', 'phy_1', 'phy_1_1','1').then(response => console.log(response.data))
    appService.getSubjectLearningStreak('phy', '1').then(response => console.log(response.data))

    appService.getRecommendations('1').then(response => console.log(response.data))
    appService.getRecommendationCarouselsForSubject('phy','1').then(response => console.log(response.data))
    appService.getRecommendationCarouselsForTopic('phy_1','1').then(response => console.log(response.data))
    appService.getRecommendationCarouselsForSubTopic('phy_1_1','1').then(response => console.log(response.data))
    

    appService.getSubjectTests('phy', '1').then(response => console.log(response.data))
    appService.getTopicTests('phy', 'phy_1', '1').then(response => console.log(response.data))
    appService.getSubTopicTests('phy', 'phy_1', 'phy_1_1', '1').then(response => console.log(response.data))
    appService.getConcept('phy', '2', '1', '11','1').then(response => console.log(response.data))

    appService.getSubjectInsights('phy', '1').then(response => console.log(response.data))
    appService.getTopicInsights('phy', 'phy_1', '1').then(response => console.log(response.data))
    appService.getSubTopicInsights('phy', 'phy_1', 'phy_1_1', '1').then(response => console.log(response.data))
    appService.getSubjectLearning('phy', '1').then(response => console.log(response.data))
    appService.getTopicLearning('phy', 'phy_1', '1').then(response => console.log(response.data))
    appService.getSubTopicLearning('phy', 'phy_1', 'phy_1_1', '1').then(response => console.log(response.data))
    appService.getProblem("phy_1").then(response => console.log(response.data))
    appService.getSolution("phy_1").then(response => console.log(response.data))
    appService.getPractice("1", "phy_1").then(response => console.log(response.data))

    authService.getUserSession().then(response => console.log(response.data))
  }, [])

  return (
    <div className="py-4">
      This is a API testing component
    </div>
  );
};

export default Testing;