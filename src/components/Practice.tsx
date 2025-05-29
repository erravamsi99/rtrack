import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {PRACTICE_FILTERS} from "../types/filter-enum";
import {appService} from "../services/appService";
import {PracticeCard} from "./PracticeCard";

export const Practice = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<string>('');

  const [practiceProblems, setPracticeProblems] = useState<any>([]);
  const [solvedPracticeProblems, setSolvedPracticeProblems] = useState<any>([]);
  const [unsolvedPracticeProblems, setUnsolvedPracticeProblems] = useState<any>([]);

  useEffect(() => {
    const subjectCode = params.code || '';
    const topicId = params.topic || '';
    const subTopicId = params.subtopic || '';
    setSelectedSubjectCode(subjectCode);
    setSelectedTopicId(topicId);
    setSelectedSubTopicId(subTopicId);
  }, [params]);

  const [filters, setFilters] = useState(PRACTICE_FILTERS.ALL);
  const handleFilter = (e: any) => {
    setFilters(e);
  }

  const handleNavigateToPracticeDetail = (problem: any) => {
    console.log('handleNavigateToPracticeDetail', problem);

    navigate('/practice/' + problem.id);
  }

  useEffect(() => {
    // todo: fetch all the solved and unsolved practice problems of the selected subject/topic/subTopic
    async function fetchPracticeProblems() {
      let id;
      if (selectedSubTopicId) {
        id = selectedSubTopicId;
      } else if (selectedTopicId) {
        id = selectedTopicId;
      } else if (selectedSubjectCode) {
        id = selectedSubjectCode;
      }
      if (id) {
        appService.getPractice("1", id).then(response => {
          if (response?.data?.solvedProblems) setSolvedPracticeProblems(response.data.solvedProblems);
          if (response?.data?.unsolvedProblems) setUnsolvedPracticeProblems(response.data.unsolvedProblems);
        })
      }

    }
    fetchPracticeProblems().then();
  }, [selectedSubjectCode, selectedTopicId, selectedSubTopicId]);

  useEffect(() => {
    const updatedPracticeProblems = [];
    if (filters === PRACTICE_FILTERS.ALL) {
      updatedPracticeProblems.push(...solvedPracticeProblems, ...unsolvedPracticeProblems);
    } else if (filters === PRACTICE_FILTERS.SOLVED) {
      updatedPracticeProblems.push(...solvedPracticeProblems);
    } else if (filters === PRACTICE_FILTERS.UNSOLVED) {
      updatedPracticeProblems.push(...unsolvedPracticeProblems);
    }
    if (updatedPracticeProblems.length > 0) {
      setPracticeProblems(updatedPracticeProblems);
    }

  }, [filters, solvedPracticeProblems, unsolvedPracticeProblems]);

  return (
    <div className="my-2">
      <div className="d-flex gap-2 p-2">
        {Object.values(PRACTICE_FILTERS).map((key: PRACTICE_FILTERS) => (
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
      <div className="d-flex flex-column gap-2">
        {practiceProblems?.length && practiceProblems.map((problem: any) => (
          <PracticeCard
            {...problem}
            key={problem.id}
            clicked={() => handleNavigateToPracticeDetail(problem)}
            lastVisited="2 days ago"
            durationUnit="min"
            hints="2"
            tags={['Tag 1', 'Tag 2', 'Tag 3']}
          ></PracticeCard>
        ))}
      </div>
    </div>
  );
};