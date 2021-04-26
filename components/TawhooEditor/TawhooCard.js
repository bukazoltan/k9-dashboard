import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const TawhooCard = ({ tawhoo }) => {
  return (
    <Card style={{ width: "15rem" }}>
      <Card.Img variant="top" src={tawhoo.imgURL} />
      <Card.Body>
        <Card.Title>{tawhoo.wordToGuess}</Card.Title>
        <Card.Text>Tiltott szavak: {tawhoo.taboos.join(", ")}</Card.Text>
        <Button variant="primary" href={`tawhooeditor/edit/${tawhoo._id}`}>
          Szerkesztés
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TawhooCard;
