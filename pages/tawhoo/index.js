import { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import Layout from "../../components/Layout";
import TawhooSession from "../../components/Tawhoo/TawhooSession";

const Tawhoo = () => {
  const [tawhoos, setTawhoos] = useState(null);
  const [pickedTawhoo, setPickedTawhoo] = useState(null);
  const [session, setSession] = useState([]);
  const [cardSet, setCardset] = useState(null);

  const findCommonElements = (arr1, arr2) => {
    console.log(arr2);
    return arr1?.some((item) => arr2?.includes(item));
  };

  const pickRandomTawhoo = () => {
    setPickedTawhoo(_.sample(tawhoos));
  };

  const loadSession = async () => {
    let sessions = await axios.get("/api/tawhoo/session");
    let activeSessions = sessions.data.content.filter(
      (s) => s.ongoing === true
    );
    setSession(activeSessions);
    if (
      activeSessions[0]?.cardSet &&
      activeSessions[0]?.cardSet != "no_filter"
    ) {
      let setData = await axios.get(
        `/api/tawhoo/cardset/${activeSessions[0]?.cardSet}`
      );
      setCardset(setData.data.content);
    }
  };

  const loadTawhoo = async () => {
    session ? console.log({ session }) : console.log("loading");
    session ? console.log({ cardSet }) : console.log("loading cardSet");

    let result = await axios.get("/api/tawhoo/");
    let allTawhoo = result.data.content;
    if (session.length == 0 || !cardSet) {
      setTawhoos(allTawhoo);
      setPickedTawhoo(_.sample(allTawhoo));
    } else {
      let positive = cardSet?.positive;
      let negative = cardSet?.negative;
      console.log(positive);
      const filterFunction = (e) => {
        return (
          findCommonElements(e.tags, positive) &&
          !findCommonElements(e.tags, negative)
        );
      };

      let filtered = allTawhoo.filter(filterFunction);
      setTawhoos(filtered);
      setPickedTawhoo(_.sample(filtered));
    }
  };

  useEffect(async () => {
    loadSession();
  }, []);

  useEffect(async () => {
    loadTawhoo();
  }, [cardSet, session]);

  return (
    <Layout>
      {pickedTawhoo ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
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
