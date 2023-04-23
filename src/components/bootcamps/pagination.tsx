import { FC } from "react";
import { limit } from "@/config/config";
import { usePagination } from "@/hooks/usePagination";

type Data = {
  count: number;
  pagination: {
    prev: {
      page: number;
    };
    next: {
      page: number;
    };
  };
};

type Props = {
  allData: Data;
  data: Data;
};

const Pagination: FC<Props> = ({ allData, data }) => {
  const { onClickHandler, onClickPrev, onClickNext, page } =
    usePagination(allData);

  console.log(data);

  if (allData) {
    const totalCount = allData.count; //57
    const totalPages = Math.ceil(totalCount / limit); //12
    const pageNumbersArray = Array.from(Array(totalPages).keys()); // [0,1,2,3,4,5,6,7,8,9,10,11]
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
            className={`page-item ${data.pagination?.prev ? "" : "disabled"}`}
          >
            <div className="page-link" onClick={onClickPrev}>
              Previous
            </div>
          </li>
          {pageNumbersArray?.map((pageNumber) => (
            <li
              className={`page-item ${
                page === pageNumber + 1 ? "disabled" : ""
              }`}
              key={pageNumber}
            >
              <div
                className="page-link"
                onClick={() => onClickHandler(pageNumber)}
              >
                {pageNumber + 1}
              </div>
            </li>
          ))}
          <li
            className={`page-item ${data.pagination?.next ? "" : "disabled"}`}
          >
            <div className="page-link" onClick={onClickNext}>
              Next
            </div>
          </li>
        </ul>
      </nav>
    );
  }
  return <></>;
};

export default Pagination;
