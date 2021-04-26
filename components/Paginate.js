import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function Paginate({ data, itemsPerPage }) {
  const [pages] = useState(Math.round(data.length / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState(1);
  const [dataStartingIndex, setDataStartingIndex] = useState(null);

  useEffect(() => {
    determineNumberOfPages();
  }, []);

  let determineNumberOfPages = () => {
    let paginatedDataObject = {};

    let dataLength = data.length;
    let chunkArray = [];

    for (let index = 0; index < dataLength; index += itemsPerPage) {
      let newChunk = data.slice(index, index + itemsPerPage);
      chunkArray.push(newChunk);
    }

    chunkArray.forEach((chunk, i) => {
      paginatedDataObject[i + 1] = chunk;
    });

    setPageData(paginatedDataObject);
    setDataStartingIndex(itemsPerPage);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage + 1);
  };

  return (
    <div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Paginate;
