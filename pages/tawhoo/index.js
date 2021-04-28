import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../../components/Layout";

const Tawhoo = () => {
  const [tawhoo, setTawhoo] = useState(null);

  const loadTawhoo = async () => {
    let randomTawhoo = await axios.get("/api/tawhoo/random");
    setTawhoo(randomTawhoo.data.content);
  };

  useEffect(async () => {
    loadTawhoo();
  }, []);

  return (
    <Layout>
      {tawhoo ? (
        <div>
          <h2>{tawhoo.wordToGuess}</h2>
          <p>{tawhoo.taboos.join(", ")}</p>
          <img width={350} src={tawhoo.imgURL} />
          <div>
            <button onClick={loadTawhoo}>Újat kérek!</button>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </Layout>
  );
};

export default Tawhoo;
