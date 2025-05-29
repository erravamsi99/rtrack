import React, {useEffect} from 'react';
import {appService} from "../../services/appService";
import useFetch from "../../hooks/useFetch";
import {setLearningProgress, setRecommendations, setWelcomeMessage} from "../../redux/actions/actions";
import {useSelector} from "react-redux";
import {Subject} from "../../types/subject";
import {SubjectCard} from "./SubjectCard";
import {RecommendationTopicCard} from "./RecomendationTopicCard";
import {useNavigate} from "react-router-dom";
import {RTChart} from "../../components/RTChart";
import {LineChartData} from "../../types/chartTypes";

const Home = () => {
  const navigate = useNavigate();

  useFetch(() => appService.getWelcomeMessage(), setWelcomeMessage, state => state.app.welcomeMessage);
  useFetch(() => appService.getRecommendations('1'), setRecommendations, state => state.app.recommendedTopics);
  useFetch(() => appService.getLearningProgress(), setLearningProgress, state => state.app.learningProgressChartData);

  const welcomeMessage = useSelector((state: any) => state.app.welcomeMessage);
  const subjects = useSelector((state: any) => state.app.subjects);
  const recommendedTopics = useSelector((state: any) => state.app.recommendedTopics);
  const learningProgressChartData = useSelector((state: any) => state.app.learningProgressChartData);

  const [currentSubjects, setCurrentSubjects] = React.useState<any>([]);
  const [learningProgress, setLearningProgressData] = React.useState<LineChartData | null>(null);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const promises = subjects.map((subject: any) =>
          appService.getSubject(subject.subjectCode)
        );
        const results = await Promise.all(promises);
        return results.map(item => item.data);
      } catch (err) {
        console.error('Error fetching topics', err);
      }
    }

    if (currentSubjects.length === 0 && subjects?.length > 0) {
      fetchSubjects().then((res) => {
        setCurrentSubjects(res);
      });
    }
  }, [subjects, currentSubjects]);

  useEffect(() => {
    const updatedData = {
      labels: learningProgressChartData?.map((d: any) => d.label) || [],
      datasets: [
        {
          label: '',
          data: learningProgressChartData?.map((d: any) => d.value) || [],
          borderColor: 'rgb(4, 94, 189)',
          backgroundColor: 'rgba(4, 94, 189, 0.5)',
        }
      ],
    };
    setLearningProgressData(updatedData);
  }, [learningProgressChartData]);

  const handleSubjectClick = (subjectCode: string) => {
    navigate(`/subject/${subjectCode}`);
  };

  return (
    <div className="home p-4">
      <div>
        <h1>{welcomeMessage?.message}</h1>
        <p>{welcomeMessage?.description}</p>
      </div>

      <div className="d-flex gap-2 my-2">
        {currentSubjects?.map((subject: Subject) => (
          <SubjectCard
            key={subject.subjectCode}
            name={subject.name}
            description={subject.description}
            num_topics={subject.overallProgress.num_total}
            completed_topics={subject.overallProgress.num_completed}
            percentage={subject.overallProgress.percentage}
            clicked={() => handleSubjectClick(subject.subjectCode)}
          />
        ))}
      </div>

      <div className="d-flex gap-2">
        <div className="flex-grow-1 border rounded p-3">
          <h2>Learning Progress</h2>
          <div style={{height: '300px', width: '100%'}}>
            {learningProgress && <RTChart type="Line" data={learningProgress as LineChartData} /> }
          </div>
        </div>
        <div className="w-25 border rounded p-3">
          <h3>Recommended Topics</h3>
          <div className="d-flex flex-column gap-2">
            {recommendedTopics?.recommended_subtopics?.map((topic: any) => (
              <RecommendationTopicCard
                key={topic.id}
                name={topic.subTopic.name}
                subject={topic.subject_name}
                description={topic.description}
                difficulty={topic.difficulty}
                recommended_time={topic.recommended_time}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;