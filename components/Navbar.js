import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const NavbarHeader = () => {
  const [session, loading] = useSession();
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="/">K9 Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Főoldal</Nav.Link>
          <Nav.Link href="/tawhoo">Tawhoo</Nav.Link>
          <Nav.Link href="/tawhooeditor">Tawhoo Editor</Nav.Link>
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
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarHeader;
