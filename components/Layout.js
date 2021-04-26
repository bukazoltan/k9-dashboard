import Head from "next/head";
import Navbar from "./Navbar";
import Container from "react-bootstrap/Container";

export default function Layout({ children, title }) {
  let fullTitle = title ? `K9 Dashboard - ${title}` : null;
  return (
    <Container>
      <Head>
        <title>{fullTitle || "K9 Dashboard"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <footer>2021</footer>
    </Container>
  );
}
