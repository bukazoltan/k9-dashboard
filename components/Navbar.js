import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const NavbarHeader = () => {
  const [session, loading] = useSession();
  console.log(session);
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">K9 Dashboard</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Főoldal</Nav.Link>
        {session ? <Nav.Link href="/tawhoo">Tawhoo</Nav.Link> : null}
        {session && session.user.roles === "tawhoo_mod" ? (
          <Nav.Link href="/tawhooeditor">Tawhoo Editor</Nav.Link>
        ) : null}
      </Nav>
      <Form inline>
        {!session && (
          <>
            <Button onClick={() => signIn("discord", { redirect: false })}>
              Bejelentkezés
            </Button>
          </>
        )}
        {session && (
          <>
            <Nav.Item>Üdvözlet, {session.user.name}!</Nav.Item>
            <img src={session.user.image} width={20} height={20} />
            <div>
              <Button onClick={() => signOut()}>Kijelentkezés</Button>
            </div>
          </>
        )}
      </Form>
    </Navbar>
  );
};

export default NavbarHeader;
