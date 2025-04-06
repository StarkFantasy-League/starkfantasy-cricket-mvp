"use client"

import { useState, useRef, useEffect } from "react"
import { href, Link, useLocation } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const pages = ["Home", "About", "Tournaments", "Rules", "Support"]
const pages2 = ["Help", "Starkfantasy League", "Market", "About", "Tournaments"]
const tournamentOptions = [' Indian Premier League']

export default function NavBar() {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(location.pathname)
  const [active, setActive] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
  }

  const getPath = (page: string) => {
    return "/" + page.toLowerCase().replace(/\s+/g, "")
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleTournamentSelect = (option: string) => {
    const path = `/tournaments/${option.toLowerCase().replace(/\s+/g, "")}`
    setCurrentPage(path)
    setDropdownOpen(false)
  }

  return (
    <nav
      aria-label="Main navigation"
      className="lg:bg-slate-950 rounded-full px-12 h-[70px] flex items-center justify-center space-x-12 lg:shadow-lg"
    >
      {pages.map((item) =>
        item === "Tournaments" ? (
          <div key={item} className="relative" ref={dropdownRef}>
            <button
              className={`transition-colors font-bold flex items-center ${
                currentPage.includes(getPath(item))
                  ? "text-amber-500"
                  : "text-white hover:text-orange-500 hover:underline"
              }`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              {item}
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute mt-2 w-48 bg-slate-950 rounded-lg shadow-lg py-2 z-10 border border-slate-700"
                >
                  {tournamentOptions.map((option) => (
                    <Link
                      key={option}
                      to={`/tournaments/${option.toLowerCase().replace(/\s+/g, "")}`}
                      className="block px-4 py-2 text-white hover:text-orange-500 hover:underline transition-colors"
                      onClick={() => handleTournamentSelect(option)}
                    >
                      {option}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            key={item}
            to={getPath(item)}
            className={`transition-colors font-bold ${
              currentPage === getPath(item) ? "text-amber-500" : "text-white hover:text-orange-500 hover:underline"
            }`}
            onClick={() => handlePageChange(getPath(item))}
          >
            {item}
          </Link>
        ),
      )}
    </nav>
  )
}
