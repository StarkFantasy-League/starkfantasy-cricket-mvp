"use client"


import type React from "react"
import { useState } from "react"
import PlayerModal from "../../components/playermodal"
export default function PoolsPage() {
  const [activeTab, setActiveTab] = useState<"match" | "special">("match")

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-6">Pools</h1>

        {/* Tabs */}
        <div className="flex ml-5">
          <button
            className={`py-3 px-6 rounded-t-xl font-medium ${
              activeTab === "match" ? "bg-[#ff5722] text-white" : "bg-[#5d3fd3] text-white"
            }`}
            onClick={() => setActiveTab("match")}
          >
            Match pools
          </button>
          <button
            className={`py-3 px-6 rounded-t-lg font-medium ${
              activeTab === "special" ? "bg-[#ff5722] text-white" : "bg-[#5d3fd3] text-white"
            }`}
            onClick={() => setActiveTab("special")}
          >
            Special Pools
          </button>
        </div>

        {/* Content container with orange border */}
        <div className="border-2 border-[#ff5722] rounded-xl p-4">
          {activeTab === "match" ? <MatchPoolsContent /> : <SpecialPoolsContent />}
        </div>
      </div>
    </div>
  )
}

function MatchPoolsContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg w-full  overflow-hidden gap-5 relative flex items-center justify-center p-2"
          style={{
            backgroundImage: `url('/Matchcard.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            width: "100%",
            height: "200px",
          }}
        >
          {/* Home team */}
          <div className="flex flex-col">
            <div className="flex items-center mr-auto">
              <div className="text-xs  m-1 text-center text-white">
                H<br />O<br />M<br />E
              </div>
              <div className="w-14 h-14 bg-gray-300 rounded-lg mb-1"></div>
            </div>
            <div className="text-xs text-center text-white">Team Name</div>
          </div>

          {/* Match time and bet button */}
          <div className="flex flex-col items-center mx-1">
            <div className="bg-[#222] text-white text-xs p-1 rounded mb-2 text-center w-full">
              DD - MM - YYYY
              <br />
              HH:MM
            </div>
            <button className="bg-[#222] cursor-pointer text-white text-xs py-2 px-2 rounded w-full">Make bet</button>
          </div>

          {/* Away team */}
          <div className="flex flex-col">
            <div className="flex items-center mr-auto">
              <div className="w-14 h-14 bg-gray-300 rounded-lg mb-1"></div>
              <div className="text-xs  m-1 text-center text-white">
                A<br />W<br />A<br />Y
              </div>
            </div>
            <div className="text-xs text-center text-white">Team Name</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SpecialPoolsContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SpecialPoolCard
        title="Best Batsman"
        icon={<img src="/Cricket.svg" className="w-20 h-20 text-[#ff5722]" />}
        description="Select the batsman whose skill, power, and consistency make them the most outstanding on the field, aiming to score the most runs of the season!"
      />

      <SpecialPoolCard
        title="Best Fielder"
        icon={<img src="/Hand.svg" className="w-20 h-20 text-[#ff5722]" />}
        description="Choose the fielder whose sharp reflexes, safe hands, and game-changing stops make them the most outstanding on the field, striving to be the ultimate defensive asset of the season!"
      />

      <SpecialPoolCard
        title="Best Bowler"
        icon={<img src="/ball.svg" className="w-20 h-20 text-[#ff5722]" />}
        description="Select the bowler whose precision, speed, and strategy make them the most outstanding on the field, aiming to dominate with the most wickets of the season!"
      />
    </div>
  )
}

interface SpecialPoolCardProps {
  title: string
  icon: React.ReactNode
  description: string
}

function SpecialPoolCard({ title, icon, description }: SpecialPoolCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-[#0c1a3d] border border-[#1a2a4d] rounded-lg p-6 flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-300 mb-6">{description}</p>
      <button
        className="bg-[#ff5722] cursor-pointer text-white py-2 px-8 rounded-md w-full"
        onClick={() => setIsModalOpen(true)}
      >
        Make bet
      </button>

      {isModalOpen && <PlayerModal onClose={() => setIsModalOpen(false)} />}
    </div>
    
  )
}

