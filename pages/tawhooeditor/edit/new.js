import React from "react";
import axios from "axios";
import Layout from "../../../components/Layout";
import TawhooEditForm from "../../../components/TawhooEditor/TawhooEditorForm";

import { useState } from "react";
import { useCurrentPage, useLastPage } from "../../../utils/currentPage";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import { validateTawhoo } from "../../../utils/validate";

const NewTawhoo = () => {
  const [session, loading] = useSession();
  const [activePage, setActivePage] = useCurrentPage();
  const [lastPage] = useLastPage();
  const [tawhoo, setTawhoo] = useState({
    taboos: [],
    wordToGuess: "",
    imgURL: "",
    called: 0,
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const createTawhoo = (e) => {
    let updatedTawhoo = { ...tawhoo };
    if (e.target.id === "taboos") {
      updatedTawhoo["taboos"] = e.target.value.split(", ");
      setTawhoo(updatedTawhoo);
      return;
    }
    updatedTawhoo[e.target.id] = e.target.value;
    setTawhoo(updatedTawhoo);
  };

  const postNewTawhoo = async (e) => {
    let valid = validateTawhoo(tawhoo);
    if (!valid) {
      let newTawhoo = axios.post("/api/tawhoo", tawhoo);
      router.push("/tawhooeditor");
      setActivePage(lastPage);
    } else {
      setError(valid);
    }
  };

  return !tawhoo ? (
    <Layout>
      {session.user.roles === "tawhoo_mod"
        ? "Töltés..."
        : "Nincs jogosultságod az oldal megtekintéséhez."}
    </Layout>
  ) : (
    <Layout>
      <TawhooEditForm
        tawhoo={tawhoo}
        updateHandler={createTawhoo}
        onSubmit={postNewTawhoo}
        deleteMode={false}
        error={error}
      />
    </Layout>
  );
};

export default NewTawhoo;
