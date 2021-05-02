import { Button } from "react-bootstrap";
const Filter = ({ buttonText, filterFunction }) => {
  return (
    <div>
      <Button onClick={filterFunction}>{buttonText}</Button>
    </div>
  );
};

export default Filter;
