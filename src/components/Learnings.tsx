import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {appService} from "../services/appService";
import {FILTERS} from "../types/filter-enum";
import {getNotStartedItems} from "../utils/sharedUtils";
import {LearningCard} from "./LearningCard";

export type LearningItem = {
  all: any[];
  completed: any[];
  inProgress: any[];
  name: string;
  description: string | null;
}

export const Learnings = () => {
  const params = useParams();

  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<string>('');
  const [filters, setFilters] = useState(FILTERS.IN_PROGRESS);

  const [learning, setLearning] = useState<LearningItem | null>(null);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [page, setPage] = useState('Subject');
  const [children, setChildren] = useState<any | null>(null);

  const handleFilter = (e: any) => {
    setFilters(e);
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
    // todo: fetch all the Learnings of the selected subject
    async function fetchSubjectLearning() {
      setPage('Subject');
      const subject = appService.getSubjectLearning(selectedSubjectCode,'1');
      subject.then(response => {
        if (response.data) {
          const updatedLearning: LearningItem = {
            all: [...response.data.allTopics].map(itm => ({...itm, id: itm.topicId})),
            completed: [...response.data.completedTopics].map(itm => ({...itm, id: itm.topicId})),
            inProgress: [...response.data.inProgressTopics].map(itm => ({...itm, id: itm.topicId})),
            name: 'Topics in ' + response.data.name,
            description: response.data.description
          }
          setLearning(updatedLearning);
        }
      }).catch(err => console.log(err));
    }

    // todo: fetch all the Learnings of the selected topic
    async function fetchTopicLearning() {
      setPage('Topic');
      const topic = appService.getTopicLearning(selectedSubjectCode, selectedTopicId, '1');
      topic.then(response => {
        if (response.data) {
          const updatedLearning: LearningItem = {
            all: [...response.data.totalSubtopics].map(itm => ({...itm, id: itm.subTopicId})),
            completed: [...response.data.completedSubtopics].map(itm => ({...itm, id: itm.subTopicId})),
            inProgress: [{...response.data.currentSubtopic}].map(itm => ({...itm, id: itm.subTopicId})),
            name: 'Sub topics in ' + response.data.name,
            description: response.data.description
          }
          setLearning(updatedLearning);
        }
      }).catch(err => console.log(err));
    }

    // todo: fetch all the Learnings of the selected sub-topic
    async function fetchSubTopicLearning() {
      setPage('SubTopic');
      const subTopic = appService.getSubTopicLearning(selectedSubjectCode, selectedTopicId, selectedSubTopicId, '1');
      subTopic.then(response => {
        if (response.data) {
          const updatedLearning: LearningItem = {
            all: [...response.data.allConcepts].map(itm => ({...itm, id: itm.conceptId})),
            completed: [...response.data.completedConcepts].map(itm => ({...itm, id: itm.conceptId})),
            inProgress: [{...response.data.currentConcept}].map(itm => ({...itm, id: itm.conceptId})),
            name: 'Concepts in ' + response.data.name,
            description: null
          }
          setLearning(updatedLearning);
          return updatedLearning;
        }
      }).catch(err => console.log(err));
    }

    if (selectedSubTopicId) {
      fetchSubTopicLearning().then();
    } else if (selectedTopicId) {
      fetchTopicLearning().then();
    } else if (selectedSubjectCode) {
      fetchSubjectLearning().then();
    } else {
      setLearning(null);
    }
  }, [selectedSubjectCode, selectedSubTopicId, selectedTopicId]);

  useEffect(() => {
    const updatedFiltered: any[] = [];
    if (learning) {
      const t = [];
      if (filters === FILTERS.IN_PROGRESS) {
        t.push(...learning.inProgress);
      } else if (filters === FILTERS.COMPLETED) {
        t.push(...learning.completed);
      } else if (filters === FILTERS.ALL) {
        t.push(...learning.all);
      } else {
        t.push(...getNotStartedItems(learning));
      }
      for (const item of t) {
        updatedFiltered.push(item);
      }
    }
    setFiltered(updatedFiltered);
  }, [learning, filters]);

  useEffect(() => {
    async function fetchChildren() {
      if(filtered?.length) {
        const promises = filtered.map((itm: any) => {
          if (page === 'Topic' && selectedSubjectCode && selectedTopicId) {
            return appService.getSubTopicLearning(selectedSubjectCode, selectedTopicId, itm.id, '1');
          }
          return appService.getTopicLearning(selectedSubjectCode, itm.id, '1');
        });
        const responses = await Promise.all(promises);
        const data = responses.map((response: any) => response?.data);
        if (data?.length) {
          const updatedChildren = new Map();
          data.forEach((d: any) => {
            if (d && page === 'Subject') {
              updatedChildren.set(d.topicId, d.totalSubtopics);
            } else if (d && page === 'Topic') {
              updatedChildren.set(d.subTopicId, d.allConcepts);
            }
          })
          setChildren(updatedChildren);
        }
      }
    }
    fetchChildren().then();
  }, [filtered, page, selectedSubjectCode, selectedTopicId]);

  return (
    <div className="my-2 border rounded p-4">
      <h3>{learning?.name}</h3>
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
      <div className="d-flex flex-column gap-2">
      {filtered && filtered.map((item: any) => (
        <LearningCard
          {...item}
          all={children?.get(item.id)}
        ></LearningCard>
      ))}
      </div>
    </div>
  );
};