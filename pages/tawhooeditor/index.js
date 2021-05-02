import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { useCurrentPage } from "../../utils/currentPage";
import useLocalStorageState from "use-local-storage-state";

import Fuse from "fuse.js";
import sortArray from "sort-array";

import Cards from "./../../components/TawhooEditor/Cards";
import Search from "./../../components/TawhooEditor/Search";
import Filter from "./../../components/TawhooEditor/Filter";
import Layout from "./../../components/Layout";

import { Button, Row } from "react-bootstrap";
export default function TawhooEditor() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  const [filteredResults, setFilteredResults] = useLocalStorageState(
    "filteredResults",
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

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

    if (pattern.length === 0) setFilteredResults(content);
    setCurrentPage(15);
  };

  const filterByNoCategory = () => {
    let filteredArray = filteredResults.filter(
      (item) => !item.tags || item.tags.legnth === 0
    );
    setFilteredResults(filteredArray);
  };

  const orderTawhoos = (mode) =>
    ({
      abcAsc: () => {
        let sorted = sortArray(filteredResults, {
          by: "wordToGuess",
          order: "asc",
        });
        setFilteredResults(sorted);
      },
      abcDesc: () => {
        let sorted = sortArray(filteredResults, {
          by: "wordToGuess",
          order: "desc",
        });
        setFilteredResults(sorted);
      },
    }[mode]);

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
          <Row
            className="controls"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "1.5rem",
            }}
          >
            <Button variant="secondary" href="/tawhooeditor/edit/new">
              Új Tawhoo hozzáadása
            </Button>
            <Search onChange={filterBySearch} />
            <Filter
              buttonText={"Kategória nélküliek"}
              filterFunction={filterByNoCategory}
            />
          </Row>

          <Cards tawhoos={filteredResults} itemsPerPage={8} />
        </div>
      ) : (
        "Nincs jogosultságod az oldal megtekintéséhez."
      )}
    </Layout>
  );
}
