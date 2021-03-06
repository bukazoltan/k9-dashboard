import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import useLocalStorageState from "use-local-storage-state";

import Fuse from "fuse.js";

import CardDisplay from "./../../components/CardDisplay";
import TawhooStats from "./../../components/TawhooEditor/TawhooStats";
import Layout from "./../../components/Layout";
import TawhooCard from "./../../components/TawhooEditor/TawhooCard";

export default function TawhooEditor() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  const [filteredResults, setFilteredResults] = useLocalStorageState(
    "filteredResults",
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/tawhoo");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
        setFilteredResults(json.content);
      }
    };
    fetchData();
  }, []);

  const filterBySearch = (e) => {
    let pattern = e.target.value;
    const fuseOptions = {
      includeScore: true,
      keys: [
        {
          name: "wordToGuess",
          weight: 5,
        },
        {
          name: "taboos",
          weight: 1,
        },
      ],
    };

    const fuse = new Fuse(content, fuseOptions);
    const result = fuse.search(pattern);

    const matches = [];
    if (!result.length) {
      setFilteredResults([]);
    } else {
      result.forEach(({ item }) => {
        matches.push(item);
      });
      setFilteredResults(matches);
    }
  };

  const filterByNoCategory = () => {
    let filteredArray = filteredResults.filter(
      (item) => !item.tags || item.tags.legnth === 0
    );
    setFilteredResults(filteredArray);
  };

  if (!session) {
    return <Layout>Jelentkezz be az oldal eléréséhez!</Layout>;
  }

  return !filteredResults ? (
    <Layout>
      {session.user.roles === "tawhoo_mod"
        ? "Töltés..."
        : "Nincs jogosultságod az oldal megtekintéséhez."}
    </Layout>
  ) : (
    <Layout title="Tawhoo szerkesztő">
      {session.user.roles === "tawhoo_mod" ? (
        <div>
          <TawhooStats tawhoos={content} />
          <CardDisplay
            filteredResults={filteredResults}
            filterByNoCategory={filterByNoCategory}
            filterBySearch={filterBySearch}
            cardType={TawhooCard}
          />
        </div>
      ) : (
        "Nincs jogosultságod az oldal megtekintéséhez."
      )}
    </Layout>
  );
}
