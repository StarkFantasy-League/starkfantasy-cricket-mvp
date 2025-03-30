'use client';

interface MatchPoolCardProps {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
}

export default function MatchPoolCard({
  homeTeam,
  awayTeam,
  date,
  time,
}: MatchPoolCardProps) {
  return (
    <div
      className="relative w-[500px] rounded-2xl p-2 shadow-lg flex justify-between items-center text-white"
      style={{
        background:
          'linear-gradient(96deg, #F54900 0%, #E17100 45%, #372AAC 47%, #E17100 49%, #372AAC 51%, #0F172B 100%)',
      }}
      
    >
      {/* Home */}
      <div className="flex flex-col items-center justify-center w-1/4 z-10">
  <div className="flex items-center justify-center">
  <p className="text-white text-[16px] font-normal leading-[16px] text-center w-[15px] h-[64px] flex justify-center items-center mr-3 mt-[3px]">
  H<br />O<br />M<br />E
</p>

    <div className="w-[65px] h-[65px] rounded-[20px] bg-gray-300 border-2 " />
  </div>
  <p className="text-sm mt-1 self-start ml-[50px]">{homeTeam}</p>

</div>




      {/* Date & Button */}
      <div className="flex flex-col items-center justify-center w-2/4 gap-2 z-10">
        <div className="bg-slate-900 px-3 py-1 text-xs rounded text-center">
          {date} <br /> {time}
        </div>
        <button className="bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-semibold shadow">
          Make bet
        </button>
      </div>

      {/* Away */}
      <div className="flex flex-col items-center justify-center w-1/4 z-10">
  <div className="flex items-center justify-center">
    <div className="w-[65px] h-[65px] rounded-[20px] bg-gray-300 border-2 " />
    <p className="text-white text-[16px] font-normal leading-[16px] text-center w-[15px] h-[64px] flex justify-center items-center ml-3 mt-[3px]">
  A<br />W<br />A<br />Y
</p>

  </div>
  <p className="text-sm mt-1 self-end mr-[50px]">{awayTeam}</p>

</div>


    </div>
  );
}
