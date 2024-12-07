import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import iconPrevious from "../../assets/icons/chevron-left.svg";
import iconNext from "../../assets/icons/chevron-right.svg";

function Paginate({
  decisionPerPage,
  totalDecisions,
  currentPage,
  paginate,
  previousPage,
  nextPage,
  open,
}) {
  const pageNumbers = [];
  const [width, setWidth] = useState(window.innerWidth);
  const { t } = useTranslation();

  // check if the window size is mobile
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const isMobile = width <= 768;

  for (let i = 1; i <= Math.ceil(totalDecisions / decisionPerPage); i += 1) {
    pageNumbers.push(i);
  }
  return pageNumbers.length > 1 ? (
    <div className="px-4 py-3 flex items-center justify-between border-t rounded-b-xl border-gray-100 sm:px-6">
      <div className="flex-1 flex justify-between">
        {open && isMobile ? (
          <button
            type="button"
            onClick={previousPage}
            className="relative inline-flex items-center px-4 py-2 border border-gray-200 text-xs md:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-200"
          >
            <img
              src={iconPrevious}
              alt={t("Précédent")}
              className="mr-2 w-auto h-auto max-w-none"
            />
            {/* {t("Précédent")} */}
          </button>
        ) : (
          <button
            type="button"
            onClick={previousPage}
            className="relative inline-flex items-center px-4 py-2 border border-gray-200 text-xs md:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-200"
          >
            {t("Précédent")}
          </button>
        )}
        <div className="flex gap-2 items-center">
          {isMobile
            ? pageNumbers.map((number) => (
                <button
                  type="button"
                  key={number}
                  onClick={() => paginate(number)}
                  className={
                    number === currentPage
                      ? "bg-light-green w-10 h-10 rounded-full"
                      : "bg-gray-50 hover:bg-gray-200 w-10 h-10 rounded-full duration-300"
                  }
                >
                  {number}
                </button>
              ))
            : pageNumbers.map((number) => (
                <button
                  type="button"
                  key={number}
                  onClick={() => paginate(number)}
                  className={
                    number === currentPage
                      ? "bg-light-green md:w-10 md:h-10 w-6 h-6 rounded-full"
                      : "bg-gray-50 hover:bg-gray-200 w-10 h-10 rounded-full duration-300"
                  }
                >
                  {number}
                </button>
              ))}
        </div>
        {open && isMobile ? (
          <button
            type="button"
            onClick={nextPage}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-200 text-xs md:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <img
              src={iconNext}
              alt={t("Précédent")}
              className="mr-2 w-auto h-auto max-w-none"
            />
            {/* {t("Suivant")} */}
          </button>
        ) : (
          <button
            type="button"
            onClick={nextPage}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-200 text-xs md:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            {t("Suivant")}
          </button>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Paginate;
