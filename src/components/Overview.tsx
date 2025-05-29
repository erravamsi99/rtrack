import {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {appService} from "../services/appService";
import {useSelector} from "react-redux";
import {ProgressBar} from "react-bootstrap";
import {Topic} from "../types/topic";
import {SubTopic} from "../types/subtopic";
import {CurrentTopic} from "./CurrentTopic";
import {FILTERS} from "../types/filter-enum";
import {setSubject} from "../redux/actions/actions";
import {NoMatch} from "./NoMatch";
import MESSAGES from "../utils/constants/messages";

export const Overview = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<string>('');

  const selectedSubject = useSelector((state: any) => state.app.subject);
  const selectedTopic = useSelector((state: any) => state.app.topic);
  const selectedSubTopic = useSelector((state: any) => state.app.subTopic);

  const [progress, setProgress] = useState<any>([]);
  const [performance, setPerformance] = useState<any>([]);
  const [learningStreak, setLearningStreak] = useState<any>([]);

  const [currentTopics, setCurrentTopics] = useState<any>([]);
  const [currentSubTopics, setCurrentSubTopics] = useState<any>([]);
  const [currentConcepts, setCurrentConcepts] = useState<any>([]);

  const [filters, setFilters] = useState(FILTERS.IN_PROGRESS);


  const handleNavigateToTopic = (topic: Topic) => {
    setSelectedTopicId(topic.topicId);
    navigate('/subject/' + selectedSubjectCode + '/topic/' + topic.topicId);
  }

  const handleNavigateToSubTopic = (subTopic: SubTopic) => {
    setSelectedSubTopicId(subTopic.subTopicId);
    navigate('/subject/' + selectedSubjectCode + '/topic/' + selectedTopicId + '/subTopic/' + subTopic.subTopicId);
  }

  const fetchTopics = useCallback(async (ids: string[]) => {
    console.log('calling fetchTopics', selectedSubjectCode);
    try {
      const promises = ids.map((id: any) =>
        appService.getTopic(selectedSubjectCode, id, '1')
      );
      const results = await Promise.all(promises);
      const topics = results.map(item => item.data);

      console.log('topics from axios', topics);
      setCurrentTopics(topics);
    } catch (error) {
      console.error('Error fetching topics', error);
    }
  }, [selectedSubjectCode])

  const fetchSubTopics = useCallback(async (ids: string[]) => {
    console.log('calling fetchSubTopics');
    console.log('selectedTopic', selectedTopic);
    if (!selectedSubjectCode || !selectedTopicId) return;
    try {
      const promises = ids.map((id: any) =>
        appService.getSubTopic(selectedSubjectCode, selectedTopicId, id, '1')
      );
      const results = await Promise.all(promises);
      const subTopics = results.map(item => item.data).filter(item => item !== null);
      console.log('subTopics from axios', subTopics);
      setCurrentSubTopics(subTopics);
    } catch (error) {
      console.error('Error fetching topics', error);
    }
  }, [selectedSubjectCode, selectedTopicId])

  useEffect(() => {
    if (selectedSubject) {
      const topicIds = [];
      switch (filters) {
        case FILTERS.ALL:
          topicIds.push(...selectedSubject.allTopics.map((topic: any) => topic.topicId));
          break;
        case FILTERS.IN_PROGRESS:
          topicIds.push(...selectedSubject.inProgressTopics.map((topic: any) => topic.topicId));
          break;
        case FILTERS.COMPLETED:
          topicIds.push(...selectedSubject.completedTopics.map((topic: any) => topic.topicId));
          break;
        case FILTERS.NOT_STARTED:
          const all = [...selectedSubject.allTopics.map((topic: any) => topic.topicId)];
          const completed = [...selectedSubject.inProgressTopics.map((topic: any) => topic.topicId)];
          const in_progress = [...selectedSubject.completedTopics.map((topic: any) => topic.topicId)];
          topicIds.push(...all.filter((topicId: any) => !completed.includes(topicId) && !in_progress.includes(topicId)));
          break;
      }
      if (topicIds?.length && selectedSubjectCode) {
        fetchTopics(topicIds).then()
      } else {
        setCurrentTopics([]);
      }
    }

    if (selectedTopic) {
      const subTopicIds = [];
      switch (filters) {
        case FILTERS.ALL:
          subTopicIds.push(...selectedTopic.totalSubtopics.map((subTopic: any) => subTopic.subTopicId));
          break;
        case FILTERS.IN_PROGRESS:
          subTopicIds.push(selectedTopic.currentSubtopic.subTopicId);
          break;
        case FILTERS.COMPLETED:
          subTopicIds.push(...selectedTopic.completedSubtopics.map((subTopic: any) => subTopic.subTopicId));
          break;
        case FILTERS.NOT_STARTED:
          const all = [...selectedTopic.totalSubtopics.map((subTopic: any) => subTopic.subTopicId)];
          const completed = [...selectedTopic.completedSubtopics.map((subTopic: any) => subTopic.subTopicId)];
          const in_progress = selectedTopic.currentSubtopic.subTopicId;
          subTopicIds.push(...all.filter((subTopicId: any) => !completed.includes(subTopicId) && !in_progress.includes(subTopicId)));
          break;
        default:
          subTopicIds.push(...selectedTopic.totalSubtopics.map((subTopic: any) => subTopic.subTopicId));
          break;
      }
      if (subTopicIds?.length) {
        fetchSubTopics(subTopicIds).then();
      } else {
        setCurrentSubTopics([])
      }
    }

    if (selectedSubTopic) {
      setFilters(FILTERS.ALL);
      const concepts = [];
      const all = [...selectedSubTopic.allConcepts.map((concept: any) => concept)];
      const completed = [...selectedSubTopic.completedConcepts.map((concept: any) => concept)];
      const in_progress = selectedSubTopic.currentConcept;
      switch (filters) {
        case FILTERS.ALL:
          concepts.push(...all);
          break;
        case FILTERS.IN_PROGRESS:
          concepts.push(in_progress);
          break;
        case FILTERS.COMPLETED:
          concepts.push(...completed);
          break;
        case FILTERS.NOT_STARTED:
          concepts.push(...all.filter((conceptId: any) => !completed.includes(conceptId) && !in_progress.includes(conceptId)));
          break;
        default:
          concepts.push(...all);
          break;
      }
      setCurrentConcepts(concepts);
    }

  }, [selectedSubject, selectedTopic, selectedSubTopic, filters]);

  useEffect(() => {
    const subjectCode = params.code || '';
    const topicId = params.topic || '';
    const subTopicId = params.subtopic || '';
    setSelectedSubjectCode(subjectCode);
    setSelectedTopicId(topicId);
    setSelectedSubTopicId(subTopicId);
  }, [params]);

  useEffect(() => {
    appService.getSubject(selectedSubjectCode).then(subjectObj => setSubject(subjectObj.data));
  }, [selectedSubjectCode]);

  useEffect(() => {
    async function fetchAllSubTopicData() {
      try {
        const [subTopicProgress, subTopicPerformance, subTopicLearningStreak] = await Promise.all([
          appService.getSubTopicProgress(selectedSubjectCode, selectedTopicId, selectedSubTopicId, '1'),
          appService.getSubTopicPerformance(selectedSubjectCode, selectedTopicId, selectedSubTopicId, '1'),
          appService.getSubTopicLearningStreak(selectedSubjectCode, selectedTopicId, selectedSubTopicId, '1'),
        ]);
        console.log('subTopicProgress.data', subTopicProgress.data);
        setProgress(subTopicProgress.data);
        setPerformance(subTopicPerformance.data);
        setLearningStreak(subTopicLearningStreak.data);

      } catch (error) {
        console.error('At least one API call failed:', error);
      }
    }

    async function fetchAllTopicData() {
      try {
        const [topicProgress, topicPerformance, topicLearningStreak] = await Promise.all([
          appService.getTopicProgress(selectedSubjectCode, selectedTopicId, '1'),
          appService.getTopicPerformance(selectedSubjectCode, selectedTopicId, '1'),
          appService.getTopicLearningStreak(selectedSubjectCode, selectedTopicId, '1'),
        ]);
        setProgress(topicProgress.data);
        setPerformance(topicPerformance.data);
        setLearningStreak(topicLearningStreak.data);

      } catch (error) {
        console.error('At least one API call failed:', error);
      }
    }

    async function fetchAllSubjectData() {
      try {
        const [subjectProgress, subjectPerformance, subjectLearningStreak] = await Promise.all([
          appService.getSubjectProgress(selectedSubjectCode, '1'),
          appService.getSubjectPerformance(selectedSubjectCode, '1'),
          appService.getSubjectLearningStreak(selectedSubjectCode, '1'),
        ]);
        setProgress(subjectProgress.data);
        setPerformance(subjectPerformance.data);
        setLearningStreak(subjectLearningStreak.data);
      } catch (error) {
        console.error('At least one API call failed:', error);
      }
    }

    if (selectedSubTopicId) {
      fetchAllSubTopicData().then();
    } else if (selectedTopicId) {
      fetchAllTopicData().then();
    } else if (selectedSubjectCode) {
      fetchAllSubjectData().then();
    } else {
      setProgress([]);
      setPerformance([]);
      setLearningStreak([]);
    }
  }, [selectedSubjectCode]);

  const handleFilter = (e: any) => {
    setFilters(e);
  }

  return (
    <div>
      <div>
        {selectedSubTopic && <div className="fs-6 p-2 my-2">{selectedSubTopic.description}</div>}
        {selectedTopic && !selectedSubTopic && <div className="fs-6 p-2 my-2">{selectedTopic.description}</div>}
        {selectedSubject && !selectedTopic && !selectedSubTopic && <div className="fs-6 p-2 my-2">{selectedSubject.description}</div>}
      </div>
      <div className="d-flex gap-2">
        <div className="p-4 border rounded flex-grow-1">
          <h2>{progress?.title}</h2>
          <ProgressBar now={progress?.percentage} variant="danger"/>
          <div>{progress?.num_completed} of {progress?.num_total} {progress?.contentName} completed</div>
          <div>{progress?.percentage}%</div>
        </div>
        <div className="p-4 border rounded flex-grow-1">
          <h2>{performance?.title}</h2>
          <div>
            {performance?.accuracy_key}
            <ProgressBar now={performance?.accuracy_percentage}/>
            {performance?.accuracy_percentage}%
          </div>
          <div>
            {performance?.completion_rate_key}
            <ProgressBar now={performance?.completion_rate_percentage}/>
            {performance?.completion_rate_percentage}%
          </div>
        </div>
        <div className="p-4 border rounded flex-grow-1">
          <h2>{learningStreak?.title}</h2>
          <div className="text-center">
            <div className="fs-2">{learningStreak?.num_days} <br/> Days</div>
            <div>{learningStreak?.message}</div>
          </div>
        </div>
      </div>

      {/* Topic listing in the subject page */}
      {!selectedTopicId && selectedSubject ? (
        <div className="my-2 border rounded p-4">
          <h3>Topics</h3>
          <div className="d-flex gap-2 p-2">
            {Object.values(FILTERS).map((key: FILTERS) => (
              <label key={key} className="d-flex align-items-center gap-1">
                <input
                  type="radio"
                  value={key}
                  checked={filters === key}
                  onChange={() => handleFilter(key)}
                />
                {key}
              </label>
            ))}
          </div>
          {currentTopics?.length ? (
            <div className="d-flex flex-column gap-2">
              {currentTopics.map((topic: Topic) => (<CurrentTopic
                key={topic?.topicId}
                name={topic?.name}
                description={topic?.description}
                completedSubtopics={topic?.completedSubtopics}
                totalSubtopics={topic?.totalSubtopics}
                currentSubtopic={topic?.currentSubtopic}
                timeLeft='2.5 hours left'
                progressStatus='In Progress'
                context='subtopics'
                clicked={() => handleNavigateToTopic(topic)}
              />))}
            </div>
          ) : <NoMatch message={MESSAGES.NO_MATCHING_TOPIC_FOUND}/>}
        </div>
      ) : null}

      {/* Sub Topic listing in the Topic page */}
      {!selectedSubTopicId && selectedTopic ? (
        <div className="my-2 border rounded p-4">
          <h3>Sub Topics</h3>
          <div className="d-flex gap-2 p-2">
            {Object.values(FILTERS).map((key: FILTERS) => (
              <label key={key} className="d-flex align-items-center gap-1">
                <input
                  type="radio"
                  value={key}
                  checked={filters === key}
                  onChange={() => handleFilter(key)}
                />
                {key}
              </label>
            ))}
          </div>
          {currentSubTopics?.length ? (
            <div className="d-flex flex-column gap-2">
              {currentSubTopics.map((subTopic: SubTopic) => (<CurrentTopic
                key={subTopic?.subTopicId}
                name={subTopic?.name}
                completedSubtopics={subTopic?.completedConcepts}
                totalSubtopics={subTopic?.allConcepts}
                currentSubtopic={subTopic?.currentConcept}
                timeLeft='30 mins left'
                progressStatus='In Progress'
                context='concepts'
                clicked={() => handleNavigateToSubTopic(subTopic)}
              />))}
            </div>
          ) : <NoMatch message={MESSAGES.NO_MATCHING_SUBTOPIC_FOUND} />}
        </div>
      ) : null}

      {/* Concept listing in the Sub Topic page */}
      {selectedSubTopic ? (
        <div className="my-2 border rounded p-4">
          <h3>Concepts</h3>
          {currentConcepts?.length ? (
            <div className="d-flex flex-column gap-2 justify-content-between">
              {currentConcepts.map((concept: any, idx: number) => (
                <div key={'concept-' + idx} className="my-2">
                  <div className="fw-semibold">{concept?.name}</div>
                  <p>{concept?.description}</p>
                </div>
              ))}
            </div>
          ) : <NoMatch message={MESSAGES.NO_MATCHING_CONCEPT_FOUND} />}
        </div>
      ) : null}
    </div>
  );
};