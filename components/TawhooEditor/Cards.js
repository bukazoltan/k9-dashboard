import TawhooCard from "./TawhooCard";
import { useCurrentPage, useLastPage } from "../../utils/currentPage";
import Pagination from "react-js-pagination";

const Cards = ({ cardArray, itemsPerPage }) => {
  const [activePage, setActivePage] = useCurrentPage(1);
  const [lastPage, setLastPage] = useLastPage(
    Math.floor(cardArray.length / itemsPerPage) + 1
  );

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const goToLastPage = () => {
    setActivePage(lastPage);
  };
  //setLastPage(Math.floor(tawhoos.length / itemsPerPage) + 1);
  const indexOfLast = activePage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = cardArray.slice(indexOfFirst, indexOfLast);

  let array = currentItems.map((t) => <TawhooCard key={t._id} tawhoo={t} />);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignContent: "space-between",
        }}
      >
        {array}
      </div>{" "}
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={cardArray.length}
        pageRangeDisplayed={5}
        itemClass="page-item"
        linkClass="page-link"
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Cards;
