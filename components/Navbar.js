import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

const Navbar = () => {
  const [session, loading] = useSession();
  return (
    <div>
      <h1>K9 Dashboard</h1>
      <ul>
        <li>
          {!session && (
            <>
              <button onClick={() => signIn("discord", { redirect: false })}>
                Bejelentkezés
              </button>
            </>
          )}
          {session && (
            <>
              <p>Üdvözlet, {session.user.name}!</p>
              <img src={session.user.image} width={20} height={20} />
              <div>
                <button onClick={() => signOut()}>Kijelentkezés</button>
              </div>
            </>
          )}
        </li>
        <li>
          <Link href="/tawhooeditor">Tawhoo Editor</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
