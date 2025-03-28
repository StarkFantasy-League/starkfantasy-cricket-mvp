"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const pages = ["Home", "About", "Tournaments", "Rules", "Support"];
const pages2 = [
  "Help",
  "Starkfantasy League",
  "Market",
  "About",
  "Tournaments",
];

export default function NavBar() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);
  const [active, setActive] = useState(false);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const getPath = (page: string) => {
    return "/" + page.toLowerCase().replace(/\s+/g, "");
  };

  return (
    <nav
      aria-label="Main navigation"
      className="lg:bg-slate-900 rounded-full px-12 h-[70px] flex items-center justify-center space-x-12 lg:shadow-lg"
    >
      {!active
        ? pages.map((item) => (
            <Link
              key={item}
              to={getPath(item)}
              className={`transition-colors font-bold ${
                currentPage === getPath(item)
                  ? "text-amber-500"
                  : "text-white hover:text-orange-500 hover:underline"
              }`}
              onClick={() => handlePageChange(getPath(item))}
            >
              {item}
            </Link>
          ))
        : pages2.map((page, i) => (
            <Link
              key={page}
              to={getPath(page)}
              tabIndex={i + 1}
              className={`text-[20px] leading-[20px] max-h-[20px] font-bold hover:cursor-pointer text-center ${
                active ? "font-kanit" : "font-openSans"
              } ${
                active
                  ? page === "Starkfantasy League"
                    ? "text-[#FFB200] underline"
                    : "text-[#FF9500]"
                  : currentPage === getPath(page)
                  ? "text-amber-500"
                  : "text-white hover:text-orange-600 hover:underline focus:text-orange-600 focus:underline"
              }`}
              onClick={() => handlePageChange(getPath(page))}
              aria-current={currentPage === getPath(page) ? "page" : undefined}
            >
              {page}
            </Link>
          ))}
    </nav>
  );
}
