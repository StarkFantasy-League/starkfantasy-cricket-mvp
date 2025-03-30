
'use client';

import MatchPoolCard from "../../components/matchCard/page";
import Image from "../assets/images/background.png";

export default function PoolsPage() {
  const matchPools = [
    {
      homeTeam: "Team A",
      awayTeam: "Team B",
      date: "30 - 03 - 2025",
      time: "19:00",
    },
    {
      homeTeam: "Team C",
      awayTeam: "Team D",
      date: "31 - 03 - 2025",
      time: "21:00",
    },
    
  ];

  return (
    <div className="min-h-screen p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Pools</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <button className="bg-orange-500 text-white px-6 py-2 rounded-t-lg font-semibold">
          Match pools
        </button>
        <button className="bg-indigo-700 text-white px-6 py-2 rounded-t-lg font-semibold">
          Special Pools
        </button>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchPools.map((pool, i) => (
          <MatchPoolCard key={i} {...pool} />
        ))}
      </div>
    </div>
  );
}
