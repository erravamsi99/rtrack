import React, { useEffect, useState } from 'react';
import {Card, Collapse} from "react-bootstrap";
import {ChevronDown, ChevronUp, Lightbulb} from "lucide-react";
import {appService} from "../services/appService";

export const ProblemHints = (props: any) => {
  const {problemId, hints} = props;
  const [open, setOpen] = useState<boolean[]>([]);
  const [hintContents, setHintContents] = useState<string[]>([]);
  const [fetched, setFetched] = useState<boolean[]>([]);
  const [allOpen, setAllOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(hints.map(() => false));
  }, [hints]);

  const handleCollapse = (index: number) => {
    const newOpen = [...open];
    const newFetched = [...fetched];
    const newHintContents = [...hintContents];
    if (!newFetched[index]) {
      appService
        .getProblemHint(props.problemId, hints[index].key.toString())
        .then((response) => {
          newHintContents[index] = response.data; // adjust if response shape differs
          newFetched[index] = true;
  
          setHintContents([...newHintContents]);
          setFetched([...newFetched]);
        })
        .catch((error) => {
          console.error('Error fetching hint:', error);
          newHintContents[index] = 'Failed to load hint.';
          newFetched[index] = true;
  
          setHintContents([...newHintContents]);
          setFetched([...newFetched]);
        });
    }
    newOpen[index] = newOpen.length > index ? !newOpen[index] : false;
    setOpen(newOpen);
  };
  const handleToggleAll = () => {
    const newOpen = [...open].map(() => !allOpen);
    setOpen(newOpen);
    setAllOpen(!allOpen);
  };

  return (
    <div className="border rounded p-4" data-comp-id="problem-hints">
      <div className="d-flex mb-2 align-items-center">
        <span className="me-2">
          <Lightbulb color="#eab305" size={24}/>
        </span>
        <span className="flex-grow-1 fw-bold">Problem Hints</span>
        {/*<div className="cursor-pointer" onClick={handleToggleAll}>*/}
        {/*  {allOpen ? 'Hide All' : 'Show All'}*/}
        {/*</div>*/}
      </div>
      <div className='d-flex gap-2 flex-column'>
        {hints.map((hint: {key: number, value: string}, index: number) => (
          <Card key={hint.key}>
            <Card.Header
              style={{
                backgroundColor: '#fff',
                cursor: 'pointer',
                borderBottomLeftRadius: open[index] ? '0' : '0.375rem',
                borderBottomRightRadius: open[index] ? '0' : '0.375rem',
                borderWidth: open[index] ? '1px' : '0'
            }}
              onClick={handleCollapse.bind(null, index)}
            >
              <div className="d-flex">
                <span className="me-2">
                  <Lightbulb color="#eab305" size={24} />
                </span>
                <span className="flex-grow-1">Hint {hint.key}</span>
                <span>
                  {open[index] ? <ChevronUp /> : <ChevronDown />}
                </span>
              </div>
            </Card.Header>
            <Collapse in={open[index]}>
              <div id="example-collapse-text">
                <Card.Body>
                {fetched[index] ? hintContents[index] : 'Loading...'}
                </Card.Body>
              </div>
            </Collapse>
          </Card>
        ))}
      </div>
    </div>
  );
};