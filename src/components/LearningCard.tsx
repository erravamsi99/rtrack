export const LearningCard = (props: any) => {
  const { name, description, all, clicked } = props;

  return (
    <div className="border rounded p-4" data-comp-id="learning-card">
      <div className="d-flex">
        <div className="flex-grow-1">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        {clicked && <div className="d-flex gap-2 align-items-center">
          <button className="btn btn-primary" onClick={clicked}>
            More
          </button>
        </div>}
      </div>
      <div className="d-flex gap-2">
        {all && all.map((item: any) => <div className='flex-grow-1'>{item.name}</div>)}
      </div>
    </div>
  );
};