import {RTChart} from "./RTChart";
import {LineChartData, RadarChartData} from "../types/chartTypes";
import {useEffect, useState} from "react";
import {appService} from "../services/appService";
import {useParams} from "react-router-dom";

export const Insights = () => {

  const params = useParams();

  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<string>('');

  const [performanceTrend, setPerformanceTrend] = useState<LineChartData | null>(null);
  const [skillAnalysis, setSkillAnalysis] = useState<RadarChartData | null>(null);

  const preparePerformanceTrend = (data: any) => {
    const labels = Object.keys(data.performanceData).map((key: string) => key);
    const datasets = [
      {
        label: data.title,
        data: Object.entries(data.performanceData).map((entry: any) => entry[1]),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)'
      },
    ];
    return { labels, datasets };
  }

  const prepareSkillAnalysis = (data: any) => {
    const labels = Object.keys(data).filter((key: string) => key !== 'title');
    const datasets = [
      {
        label: data.title,
        data: Object.entries(data).filter((entry: any) => entry[0] !== 'title').map((entry: any) => entry[1]),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        border: 2,
      },
    ];
    return { labels, datasets };
  }

  useEffect(() => {
    const subjectCode = params.code || '';
    const topicId = params.topic || '';
    const subTopicId = params.subtopic || '';
    setSelectedSubjectCode(subjectCode);
    setSelectedTopicId(topicId);
    setSelectedSubTopicId(subTopicId);
  }, [params]);

  useEffect(() => {

    async function fetchAllSubTopicData()
    {
      const subTopicInsights = appService.getSubTopicInsights(selectedSubjectCode, selectedTopicId, selectedSubTopicId, '1');
      subTopicInsights.then(response => {
        setPerformanceTrend(preparePerformanceTrend(response.data.performanceData));
        setSkillAnalysis(prepareSkillAnalysis(response.data.skillAnalysisData));
      }).catch(err => console.log(err));
    }

    async function fetchAllTopicData() {
      const topicInsights = appService.getTopicInsights(selectedSubjectCode, selectedTopicId, '1');
      topicInsights.then(response => {
        setPerformanceTrend(preparePerformanceTrend(response.data.performanceData));
        setSkillAnalysis(prepareSkillAnalysis(response.data.skillAnalysisData));
      }).catch(err => console.log(err));
    }

    async function fetchAllSubjectData() {
      const subjectInsights = appService.getSubjectInsights(selectedSubjectCode,'1');
      subjectInsights.then(response => {
        setPerformanceTrend(preparePerformanceTrend(response.data.performanceData));
        setSkillAnalysis(prepareSkillAnalysis(response.data.skillAnalysisData));
      }).catch(err => console.log(err));
    }

    if (selectedSubTopicId) {
      fetchAllSubTopicData().then();
    } else if (selectedTopicId) {
      fetchAllTopicData().then();
    } else if (selectedSubjectCode) {
      fetchAllSubjectData().then();
    } else {
      setPerformanceTrend(null);
      setSkillAnalysis(null);
    }
  }, [selectedSubjectCode]);

  return (
    <div className="d-flex gap-2">
      <div className="flex-grow-1 border rounded p-3 w-50">
        <h2>Performance Trend</h2>
        {performanceTrend && <RTChart type="Line" data={performanceTrend} style={{height: '400px'}}/>}
      </div>
      <div className="flex-grow-1 border rounded p-3 w-50">
        <h2>Skill Analysis</h2>
        {skillAnalysis && <RTChart style={{height: '400px'}} type="Radar" data={skillAnalysis}/>}
      </div>
    </div>
  );
};