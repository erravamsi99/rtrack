import {ProgressBar} from "react-bootstrap";

export const SubjectCard = (props: any) => {
  const { name, percentage, num_topics, completed_topics, clicked } = props;

  return (
    <div className="card flex-grow-1 cursor-pointer" onClick={clicked}>
      <div className="card-body">
        <div className="d-flex">
          <h5 className="card-title flex-grow-1">{name}</h5>
          <span className="cursor-pointer"> &gt; </span>
        </div>
        <ProgressBar className="my-2" now={percentage} />
        <div className="d-flex">
          <p className="card-text flex-grow-1">{completed_topics} of {num_topics} topics completed</p>
          <span>{percentage}%</span>
        </div>
      </div>
    </div>
  );
};