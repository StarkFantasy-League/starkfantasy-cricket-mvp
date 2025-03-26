"use client";

import { useState } from "react";

const pages = ["Home", "About", "Tournaments", "Rules", "Support"];
const pages2 = [
  "Help",
  "Starkfantasy League",
  "Market",
  "About",
  "Tournaments",
];

export default function NavBar() {
  const [currentPage, setCurrentPage] = useState("Home");

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
      <nav
        aria-label="Main navigation"
        className="lg:bg-slate-900 rounded-full px-12 h-[70px] flex items-center justify-center space-x-12 lg:shadow-lg"
      >
        {
          pages.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`transition-colors font-bold ${
                currentPage === item
                  ? "text-amber-500"
                  : "text-white hover:text-orange-500 hover:underline"
              }`}
              onClick={() => handlePageChange(item)}
            >
              {item}
            </a>
          ))
        }



        {/* <ul
          className={`flex ${
            active ? "w-full px-10" : "w-[595px]"
          } h-[22px] justify-between`}
        >
          {(active ? pages2 : pages).map((page, i) => (
            <li key={page}>
              <a
                href={`#${page.toLowerCase()}`}
                tabIndex={i + 1}
                className={`text-[20px] leading-[20px] max-h-[20px] font-bold hover:cursor-pointer text-center ${
                  active ? "font-kanit" : "font-openSans"
                } ${
                  active
                    ? page === "Starkfantasy League"
                      ? "text-[#FFB200] underline"
                      : "text-[#FF9500]"
                    : currentPage === page
                    ? "text-amber-500"
                    : "text-white hover:text-orange-600 hover:underline focus:text-orange-600 focus:underline"
                }`}
                onClick={() => handlePageChange(page)}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </a>
            </li>
          ))} */}
        {/* </ul> */}
      </nav>
  );
}
