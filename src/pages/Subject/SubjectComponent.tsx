import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {useParams, useSearchParams} from "react-router-dom";
import {CustomTabs} from "../../components/Tab";
import {Overview} from "../../components/Overview";
import {Learnings} from "../../components/Learnings";
import {Practice} from "../../components/Practice";
import {Tests} from "../../components/Tests";
import {appService} from "../../services/appService";
import useFetch from "../../hooks/useFetch";
import {setSubject} from "../../redux/actions/actions";
import {Insights} from "../../components/Insights";

export const SubjectComponent = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState('overview');

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

  useFetch(() => appService.getSubject(selectedSubjectCode), setSubject, (state) => state.app.subject);

  useEffect(() => {
    const code = params.code || '';
    setSelectedSubjectCode(code);
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab') || 'overview');
    }
  }, [params]);

  return (
    <div data-comp-id="subject">
      {/* Todo: header contains subject info and actions*/}
      <div className="d-flex py-2">
        <div className="flex-grow-1">
          <h1>{selectedSubject?.name}</h1>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <div>{selectedSubject?.gradeLevel}</div>
          <div>{selectedSubject?.difficulty}</div>
        </div>
      </div>
      <CustomTabs
        tabs={tabs}
        activeKey={activeTab}
        onTabChange={(k) => handleTabChange(k)}
        variant="pills"
        className="custom-tabs gap-2 my-2"
      />
    </div>
  );
};