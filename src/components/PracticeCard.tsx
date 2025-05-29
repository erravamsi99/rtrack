import {truncateString} from "../utils/sharedUtils";
import {ChevronRight} from "lucide-react";

export const PracticeCard = (props: any) => {
  const {
    title,
    statement,
    duration,
    difficulty,
    type,
    choices,
    lastVisited,
    durationUnit,
    hints,
    tags,
    clicked
  } = props;

  return (
    <div className="border rounded p-4" data-comp-id="learning-card">
      <div className="d-flex gap-2">
        <div className="flex-grow-1">
          <h3>{title}</h3>
          <div className="d-flex my-2 gap-2">
            <div className="fs-6 flex-grow-1">Last visited: {lastVisited}</div>
            <div>{type}</div>
            <div>{difficulty}</div>
          </div>
          <p>{truncateString(statement, 300)}</p>
          <div className="d-flex gap-2 mt-0 mb-3">
            <div>{duration} {durationUnit}</div>
            <div>{hints} hints</div>
          </div>
        </div>
        {clicked && <div className="d-flex gap-2 align-items-center">
          <button className="btn btn-light" onClick={clicked}>
            <ChevronRight />
          </button>
        </div>}
      </div>
      <div className="d-flex gap-2">
        {tags && tags.map((tag: any, idx: number) => <div key={idx} className="rt-pills ">{tag}</div>)}
      </div>
    </div>
  );
};