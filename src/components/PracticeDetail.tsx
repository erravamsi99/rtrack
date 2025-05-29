import React, {JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState} from 'react';
import { useParams } from 'react-router';
import {CustomTabs} from "./Tab";
import {ProblemHints} from "./ProblemHints";
import {PracticeAnalysis} from "./PracticeAnalysis";
import {PracticeSolution} from "./PracticeSolution";
import {ProgressBar} from "react-bootstrap";
import {Clock} from "lucide-react";
import {ProblemChoices} from "./ProblemChoices";
import {appService} from "../services/appService";
import {setSubject} from "../redux/actions/actions";

const HINTS = [
  {
    "key": 1,
    "value": "Think about the Carnot efficiency formula"
  },
  {
    "key": 2,
    "value": "Remember: Maximum efficiency occurs in a reversible process"
  },
  {
    "key": 3,
    "value": "Consider the relationship between efficiency, work done, and heat transfer"
  }
];

const PracticeAnalysisSteps = [
  {
    "title": "Understand Work and Energy Flow",
    "content": "Content for Step 1"
  },
  {
    "title": "Understand Work and Energy Flow",
    "content": "Content for Step 2"
  },
  {
    "title": "Understand Work and Energy Flow",
    "content": "Content for Step 3"
  },
  {
    "title": "Understand Work and Energy Flow",
    "content": "Content for Step 4"
  },
  {
    "title": "Understand Work and Energy Flow",
    "content": "Content for Step 5 \n\n 2nd paragraph"
  },
  {
    "title": "Understand Work and Energy Flow",
    "content": "Content for Step 6"
  }
];


export const PracticeDetail = () => {
  const { id } = useParams();
  const [practice, setPractice] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('analysis');

  const tabs = [
    { key: 'analysis', title: 'Analysis', content: <PracticeAnalysis steps={PracticeAnalysisSteps}/> },
    { key: 'solution', title: 'Solution', content: <PracticeSolution id={id}/> }
  ]

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  }

  useEffect(() => {
    console.log('PracticeDetail', id);
    // todo: get api call here

    if (id) {
      // TODO: Hardcoded id with phy_1, remove this and put the id
      appService.getProblem(id).then(problemObj => {
        console.log(problemObj.data);
        setPractice(problemObj.data);
      });
    }

  }, [id]);

  return (
    <div className="py-3">
      <div className="d-flex gap-2 align-items-center">
        <div className="flex-grow-1">
          <h2>{practice?.title}</h2>
          <div>
            <span className="me-2">
              <Clock size={16}/>
            </span>
            <span className="me-2">
              {practice?.duration} {practice?.durationUnit}
            </span>
            <span className="rt-pills">{practice?.type}</span>
          </div>
        </div>
        <div className="d-flex gap-2">
          <div className="rt-pills ">Thermodynamics</div>
          <div className="rt-pills ">Heat Engines</div>
          <div className="rt-pills ">Efficiency</div>
        </div>
      </div>
      <div className="d-flex my-3 gap-3">
        <div className="w-75">
          <div className="d-flex flex-column gap-3 mb-3">
            <section className="p-4 border rounded">
              <h2>Problem Statement</h2>
              <div>
                {practice?.statement && practice.statement.split('\n').map((line: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </section>

            {practice?.choices && <ProblemChoices choices={practice.choices}/>}

            <ProblemHints problemId={practice?.id} hints={HINTS}></ProblemHints>
          </div>
          <CustomTabs
            tabs={tabs}
            activeKey={activeTab}
            onTabChange={(k) => k && handleTabChange(k)}
            variant="pills"
            className="custom-tabs gap-2 my-2"
          />
        </div>
        <div className='w-25 d-flex  flex-column gap-2'>
          <div className="p-4 border rounded">
            <h2>Your Progress</h2>
            <div className='my-2'>
              <div className='d-flex justify-content-between'>
                <div>Time Spent</div>
                <div>15 mins</div>
              </div>
              <ProgressBar now={60} variant="progress" style={{height: '10px'}}/>
            </div>
            <div className='my-2'>
              <div className='d-flex justify-content-between'>
                <div>Solution Progress</div>
                <div>1/6 steps</div>
              </div>
              <ProgressBar now={60} variant="progress" style={{height: '10px'}}/>
            </div>
          </div>

          <div className="p-4 border rounded">
            <h2>Similar Problems</h2>
            <div className='d-flex flex-column gap-2'>
              <div className='p-4 border rounded'>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="fw-semibold">Carnot Cycle Analysis</div>
                  <div className="rt-pills">Medium</div>
                </div>
                <div>Related concept</div>
              </div>
              <div className='p-4 border rounded'>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="fw-semibold">Entropy in Heat Engines</div>
                  <div className="rt-pills">Hard</div>
                </div>
                <div>Next step</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};