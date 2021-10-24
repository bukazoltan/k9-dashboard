import Filter from "../components/TawhooEditor/Filter";
import Cards from "../components/TawhooEditor/Cards";
import Search from "../components/TawhooEditor/Search";
import { Button, Row } from "react-bootstrap";

function CardDisplay({
  filteredResults,
  filterByNoCategory,
  filterBySearch,
  cardType,
}) {
  return (
    <>
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

      <Cards cardType={cardType} cardArray={filteredResults} itemsPerPage={8} />
    </>
  );
}

export default CardDisplay;
