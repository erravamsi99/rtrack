import {ProgressBar} from "react-bootstrap";

export const CurrentTopic = (props: any) => {
  const { name, description, completedSubtopics, totalSubtopics, currentSubtopic, timeLeft, progressStatus, context, clicked } = props;


  return (
    <div className="border rounded p-4" data-comp-id="current-topic">
      <div className="d-flex">
        <div className="flex-grow-1">
          <h3>{name}</h3>
          <p>{description}</p>
          <p>{completedSubtopics?.length} of {totalSubtopics?.length} {context} completed</p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <button className="btn btn-primary" onClick={clicked}>
            More
          </button>
        </div>
      </div>
      <div className="my-2">
        <ProgressBar now={100*completedSubtopics?.length/totalSubtopics?.length} />
      </div>
      <div className="d-flex gap-2">
        <div className='flex-grow-1'>{currentSubtopic?.name}</div>
        <div className='flex-grow-1'>{timeLeft}</div>
        <div className='flex-grow-1'>{progressStatus}</div>
      </div>
    </div>
  );
};