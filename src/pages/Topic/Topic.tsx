import {useParams, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Insights} from "../../components/Insights";
import {CustomTabs} from "../../components/Tab";
import {useSelector} from "react-redux";
import useFetch from "../../hooks/useFetch";
import {appService} from "../../services/appService";
import {setSubject, setTopic} from "../../redux/actions/actions";
import {Overview} from "../../components/Overview";
import {Practice} from "../../components/Practice";
import {Tests} from "../../components/Tests";
import {Learnings} from "../../components/Learnings";
import {BreadcrumbComponent} from "../../components/BreadcrumbComponent";
import {Crumb} from "../../types/sharedTypes";
import {getCrumbs} from "../../utils/sharedUtils";

export const Topic = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();


  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [activeTab, setActiveTab] = useState('overview');
  const [breadcrumb, setBreadcrumb] = useState<Crumb[]>([]);

  const selectedTopic = useSelector((state: any) => state.app.topic);
  const selectedSubject = useSelector((state: any) => state.app.subject);

  const tabs = [
    { key: 'overview', title: 'Overview', content: <Overview /> },
    { key: 'learnings', title: 'Learnings', content: <Learnings /> },
    { key: 'practice', title: 'Practice', content: <Practice /> },
    { key: 'tests', title: 'Tests', content: <Tests /> },
    { key: 'insights', title: 'Insights', content: <Insights /> }
  ];

  const handleTabChange = (tab: string) => {
    setSearchParams({tab});
    setActiveTab(tab);
  }

  useFetch(
    () => appService.getTopic(selectedSubjectCode, selectedTopicId, '1'),
    setTopic,
    (state) => state.app.topic,
    !!selectedSubjectCode && !!selectedTopicId
  );
  useFetch(
    () => appService.getSubject(selectedSubjectCode),
    setSubject,
    (state) => state.app.subject,
    !!selectedSubjectCode
  );

  useEffect(() => {
    const code = params.code || '';
    const topic = params.topic || '';
    setSelectedSubjectCode(code);
    setSelectedTopicId(topic);
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab') || 'overview');
    }
  }, [params]);

  useEffect(() => {
    if (selectedTopic?.breadCrumbs?.length) {
      const crumbs: Crumb[] = getCrumbs(selectedTopic.breadCrumbs);
      setBreadcrumb(crumbs);
    }
  }, [selectedTopic])


  return (
    <div data-comp-id="topic">
      {/* Todo: header contains subject info and actions*/}
      <div className="d-flex py-2">
        <div className="flex-grow-1">
          <h1>{selectedTopic?.name}</h1>
          <BreadcrumbComponent crumbs={breadcrumb}/>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <div>{selectedSubject?.gradeLevel}</div>
          <div>{selectedSubject?.difficulty}</div>
        </div>
      </div>
      <CustomTabs
        tabs={tabs}
        activeKey={activeTab}
        onTabChange={(k) => k && handleTabChange(k)}
        variant="pills"
        className="custom-tabs gap-2 my-2"
      />
    </div>
  );
};