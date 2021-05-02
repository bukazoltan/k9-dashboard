import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import axios from "axios";

import Layout from "../../../components/Layout";

const TawhooSession = () => {
  const [tSession, setTSession] = useState(null);
  const [session, setSession] = useSession();

  const getSessionData = async () => {
    try {
      let sessions = await axios.get("/api/tawhoo/session");
      let activeSessions = sessions.data.content.filter(
        (s) => s.ongoing === true
      );
      if (activeSessions.length > 0) {
        activeSessions[0].players.sort((a, b) => b.score - a.score);
        setTSession(activeSessions[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    getSessionData();

    const interval = setInterval(() => {
      getSessionData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const changeScore = (e) => {
    let targetId = e.target.parentNode.id;
    let type = e.target.innerHTML;
    console.log(session);
  };

  return (
    <div>
      <Layout>
        {!tSession ? (
          <div>Jelenleg nem fut egy tawhoo session sem!</div>
        ) : (
          <div>
            <h3>A jelenlegi állás:</h3>
            <ol>
              {tSession.players.map((player) => (
                <li key={player._id} id={player._id}>
                  {player.name}: {player.score}{" "}
                  {session.user.roles === "tawhoo_mod" ? (
                    <div>
                      <button onClick={changeScore}>+</button>
                      <button onClick={changeScore}>-</button>
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default TawhooSession;
