import "./pagination.css";

const Pagination = ({ pages, setCurrentPage, currentPage }) => {
  const generatedPages = new Array(pages).fill(1);
  return (
    <div className="pagination">
      <button
        className="page previous"
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage((prev) => {
            if (prev <= 0) return 0;
            return prev - 1;
          })
        }
      >
        Previous
      </button>
      {generatedPages.map((_, index) => (
        <div
          key={index}
          className={currentPage === index + 1 ? "active page" : "page"}
          onClick={(e) => setCurrentPage(+e.target.textContent)}
        >
          {index + 1}
        </div>
      ))}
      <button
        className="page next"
        disabled={currentPage === (pages || 1)}
        onClick={() =>
          setCurrentPage((prev) => {
            if (prev >= pages) return pages;
            return prev + 1;
          })
        }
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
