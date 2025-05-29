export const ProblemChoices = (props: any) => {
  const {choices, isSolution} = props;
  return (
    <>
      {isSolution ? (
          <div>
            <h3>Solution</h3>
            {choices?.length && choices.map((choice: string, index: number) => (
              <div key={index}>
                <div>{choice}</div>
              </div>
            ))}
          </div>
      )
        : (
            <div className="p-4 border rounded">
              <h3>Choices</h3>
              {choices?.length && choices.map((choice: string, index: number) => (
                <div key={index}>
                  <div>{choice}</div>
                </div>
              ))}
            </div>
        )
      }
    </>
  );
};