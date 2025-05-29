interface NoMatchProps {
  message?: string;
}
export const NoMatch = ({ message = "No match" }: NoMatchProps) => {
  return <div>{message}</div>;
};