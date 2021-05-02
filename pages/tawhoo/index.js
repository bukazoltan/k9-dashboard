import { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import Layout from "../../components/Layout";

const Tawhoo = () => {
  const [tawhoos, setTawhoos] = useState(null);
  const [pickedTawhoo, setPickedTawhoo] = useState(null);

  const pickRandomTawhoo = () => {
    setPickedTawhoo(_.sample(tawhoos));
  };

  const loadTawhoo = async () => {
    let randomTawhoo = await axios.get("/api/tawhoo/");
    let tawhooArray = randomTawhoo.data.content;
    setTawhoos(tawhooArray);
    setPickedTawhoo(_.sample(tawhooArray));
  };

  useEffect(async () => {
    loadTawhoo();
  }, []);

  return (
    <Layout>
      {pickedTawhoo ? (
        <Card border="primary" className={"m-auto"} style={{ width: "15rem" }}>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Button onClick={pickRandomTawhoo}>Újat kérek!</Button>
            </ListGroupItem>
          </ListGroup>
          <Card.Img variant="top" src={pickedTawhoo.imgURL} />
          <Card.Body>
            <Card.Title>{pickedTawhoo.wordToGuess}</Card.Title>
            <Card.Text>{pickedTawhoo.taboos.join(", ")}</Card.Text>
          </Card.Body>
          {pickedTawhoo.tags ? (
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                {"Kategóriák: " + pickedTawhoo.tags.join(", ")}
              </ListGroupItem>
            </ListGroup>
          ) : null}
        </Card>
      ) : (
        "Töltés..."
      )}
    </Layout>
  );
};

export default Tawhoo;
