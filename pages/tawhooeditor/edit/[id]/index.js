import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import axios from "axios";
import Layout from "../../../../components/Layout";
import TawhooEditForm from "../../../../components/TawhooEditor/TawhooEditorForm";
import options from "../../../../utils/tags";

const TawhooEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  const [session, loading] = useSession();
  const [tawhoo, setTawhoo] = useState();
  const [tagsValue, setTagsValue] = useState([]);

  const updateTawhoo = (e) => {
    let updatedTawhoo = { ...tawhoo };
    if (e?.target?.id === "taboos") {
      updatedTawhoo["taboos"] = e.target.value.split(", ");
      setTawhoo(updatedTawhoo);
      return;
    }

    if (!e.target) {
      let tagArray = e.map((item) => item.value);
      updatedTawhoo["tags"] = tagArray;
      setTawhoo(updatedTawhoo);
      let tags = tagArray.map((tag) => {
        return {
          value: tag,
          label: options.find((item) => item.value === tag)["label"],
        };
      });
      setTagsValue(tags);
      return;
    }

    updatedTawhoo[e.target.id] = e.target.value;
    setTawhoo(updatedTawhoo);
  };

  const postUpdatedTawhoo = async () => {
    let putTawhoo = await axios.put(`/api/tawhoo/${id}`, tawhoo);
    console.log(putTawhoo);
    router.push("/tawhooeditor");
  };

  const deleteTawhoo = async () => {
    let deletedTawhoo = await axios.delete(`/api/tawhoo/${id}`);
    console.log(deletedTawhoo);
    router.push("/tawhooeditor");
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/tawhoo/${id}`);
      const json = await res.json();
      if (json.content) {
        setTawhoo(json.content);
        if (json.content?.tags?.length > 0) {
          let tags = json.content.tags.map((tag) => {
            return {
              value: tag,
              label: options.find((item) => item.value === tag)["label"],
            };
          });
          setTagsValue(tags);
        } else {
          setTagsValue([]);
        }
      }
    };
    fetchData();
  }, [session]);

  if (!session) {
    return <Layout>Jelentkezz be az oldal eléréséhez!</Layout>;
  }

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
        updateHandler={updateTawhoo}
        onSubmit={postUpdatedTawhoo}
        deleteTawhoo={deleteTawhoo}
        deleteMode={true}
        tagsValue={tagsValue}
        options={options}
      />
    </Layout>
  );
};

export default TawhooEdit;
