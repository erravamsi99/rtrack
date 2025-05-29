export const RecommendationTopicCard = (props: any) => {
  const { name, description, difficulty, subject, topic, recommended_time } = props;
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex gap-2 align-items-center">
          <div>+</div>
          <div className="flex-grow-1">
            <h5 className="card-title">{name}</h5>
            <div>{subject}</div>
          </div>
          <div>
            <div>{difficulty}</div>
            <div>{recommended_time}</div>
          </div>
        </div>
      </div>
    </div>
  );
}