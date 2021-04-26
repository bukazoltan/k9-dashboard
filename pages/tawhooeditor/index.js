import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

import Cards from "./../../components/TawhooEditor/Cards";
import Layout from "./../../components/Layout";
import { Button } from "react-bootstrap";
export default function TawhooEditor() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/tawhoo");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  if (!session) {
    return <Layout>Jelentkezz be az oldal eléréséhez!</Layout>;
  }

  return !content ? (
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
      <Cards tawhoos={content} itemsPerPage={8} />
    </Layout>
  );
}
