import { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import Layout from "../../components/Layout";
import TawhooSession from "../../components/Tawhoo/TawhooSession";

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Card border="primary" style={{ width: "15rem" }}>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Button onClick={pickRandomTawhoo}>Újat kérek!</Button>
              </ListGroupItem>
            </ListGroup>
            <Card.Img variant="top" src={pickedTawhoo.imgURL} />
            <Card.Body>
              <Card.Title>{pickedTawhoo.wordToGuess}</Card.Title>
              <Card.Text>
                {"Tiltott szavak: " + pickedTawhoo.taboos.join(", ")}
              </Card.Text>
            </Card.Body>
            {pickedTawhoo.tags ? (
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  {"Kategóriák: " + pickedTawhoo.tags.join(", ")}
                </ListGroupItem>
              </ListGroup>
            ) : null}
          </Card>
          <TawhooSession />
        </div>
      ) : (
        "Töltés..."
      )}
    </Layout>
  );
};

export default Tawhoo;
