import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Fuse from "fuse.js";

import Cards from "./../../components/TawhooEditor/Cards";
import Search from "./../../components/TawhooEditor/Search";
import Layout from "./../../components/Layout";

import { Button } from "react-bootstrap";
export default function TawhooEditor() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  const [filteredResults, setFilteredResults] = useState(null);

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
  }, [session]);

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

    if (pattern.length === 0) setFilteredResults(content);
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
      <Button variant="primary" href="/tawhooeditor/edit/new">
        Új Tawhoo hozzáadása
      </Button>
      <Search onChange={filterBySearch} />
      <Cards tawhoos={filteredResults} itemsPerPage={8} />
    </Layout>
  );
}
