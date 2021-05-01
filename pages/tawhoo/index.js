import { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import { Button } from "react-bootstrap";

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
        <div>
          <div>
            <Button onClick={pickRandomTawhoo}>Újat kérek!</Button>
          </div>
          <h2>{pickedTawhoo.wordToGuess}</h2>
          <p>{pickedTawhoo.taboos.join(", ")}</p>
          <img width={350} src={pickedTawhoo.imgURL} />
        </div>
      ) : (
        "Töltés..."
      )}
    </Layout>
  );
};

export default Tawhoo;
