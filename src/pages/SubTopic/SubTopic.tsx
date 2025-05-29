import {useParams, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {CustomTabs} from "../../components/Tab";
import {useSelector} from "react-redux";
import useFetch from "../../hooks/useFetch";
import {appService} from "../../services/appService";
import {setSubject, setSubTopic, setTopic} from "../../redux/actions/actions";
import {Overview} from "../../components/Overview";
import {Insights} from "../../components/Insights";
import {Learnings} from "../../components/Learnings";
import {Practice} from "../../components/Practice";
import {Tests} from "../../components/Tests";
import {BreadcrumbComponent} from "../../components/BreadcrumbComponent";
import {Crumb} from "../../types/sharedTypes";
import {getCrumbs} from "../../utils/sharedUtils";

export const SubTopic = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<string>('');

  const [activeTab, setActiveTab] = useState('overview');
  const [breadcrumb, setBreadcrumb] = useState<Crumb[]>([]);
  const selectedSubTopic = useSelector((state: any) => state.app.subTopic);

  const tabs = [
    { key: 'overview', title: 'Overview', content: <Overview /> },
    { key: 'learning', title: 'Learnings', content: <Learnings /> },
    { key: 'practice', title: 'Practice', content: <Practice /> },
    { key: 'test', title: 'Tests', content: <Tests /> },
    { key: 'insights', title: 'Insights', content: <Insights /> }
  ];

  const handleTabChange = (tab: string) => {
    setSearchParams({tab});
    setActiveTab(tab);
  }

  useFetch(
    () => appService.getSubTopic(selectedSubjectCode, selectedTopicId, selectedSubTopicId, '1'),
    setSubTopic,
    (state) => state.app.subTopic,
    !!selectedSubjectCode && !!selectedTopicId && !!selectedSubTopicId
  );

  useEffect(() => {
    const code = params.code || '';
    const topic = params.topic || '';
    const subTopic = params.subtopic || '';
    setSelectedSubjectCode(code);
    setSelectedTopicId(topic);
    setSelectedSubTopicId(subTopic);

    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab') || 'overview');
    }
  }, [params]);

  useEffect(() => {
    if (selectedSubTopic?.breadCrumbs?.length) {
      const crumbs: Crumb[] = getCrumbs(selectedSubTopic.breadCrumbs);
      setBreadcrumb(crumbs);
    }
  }, [selectedSubTopic])

  return (
    <div data-comp-id="sub-topic">
      {/* Todo: header contains subject info and actions*/}
      <div className="d-flex py-2">
        <div className="flex-grow-1">
          <h1>{selectedSubTopic?.name}</h1>
          <BreadcrumbComponent crumbs={breadcrumb}/>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <div>{selectedSubTopic?.grade}</div>
          <div>{selectedSubTopic?.difficulty}</div>
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