import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

export const AnalysisStepperContent = (props: any) => {
  const {title, content} = props;
  return (<div style={{minHeight: '300px'}}>
    <div className="d-flex align-items-center gap-2 p-4" style={{backgroundColor: '#f3f7fa'}}>
      <span style={{
        borderRadius: '50%',
        backgroundColor: '#0d6efd',
        color: 'white',
        width: '20px',
        height: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >3</span>
      <h4 className="flex-grow-1 mb-0">{title}</h4>
      <div>Step 3 of 6</div>
    </div>
    <div className="p-4">
      {content.split('\n').map((line: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  </div>);
};