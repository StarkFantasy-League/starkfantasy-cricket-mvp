
'use client';

import MatchPoolCard from "../../components/matchCard/page";



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
    <div className="relative min-h-screen text-white">
  {/* Fondo */}
  <div className="absolute inset-0 -z-10">
    <img
      src="/assets/images/background.png"
      alt="Background"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="relative p-4 sm:p-6 lg:p-10">
    <h1 className="text-3xl font-bold mb-6">Pools</h1>

 {/* Tabs + Wrapper Container */}
<div className="w-fit mx-auto">
  

  {/* Tabs */}
<div className="flex ml-5">
  <button
    className="text-white font-semibold"
    style={{
      width: "155px",
      height: "50px",
      padding: "10px 20px",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      backgroundColor: "#F54900",
    }}
  >
    Match pools
  </button>

  <button
    className="text-white font-semibold"
    style={{
      width: "155px",
      height: "50px",
      padding: "10px 20px",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      backgroundColor: "#372AAC",
    }}
  >
    Special Pools
  </button>
</div>


  
  {/* Wrapper contenedor de las cards */}
  <div
  className="rounded-b-[20px] px-6 py-4 border-[3px] inline-flex flex-wrap justify-center items-start gap-6 translate-x-2"
  style={{
    borderImage: "linear-gradient(180deg, #F54900 0%, rgba(245, 73, 0, 0) 95%) 1",
    borderImageSlice: 1,
  }}
>


    {matchPools.map((pool, i) => (
      <MatchPoolCard key={i} {...pool} />
    ))}
  </div>
</div>





  </div>
</div>

  );
  
}
