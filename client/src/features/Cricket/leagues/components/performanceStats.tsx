import userClock from "../../../../assets/leagues/user-clock.svg";

interface PerformanceStatsProps {
  title: string;
  value: string | number;
}

const performanceStats: PerformanceStatsProps[] = [
  {
    title: "Pools played",
    value: 56,
  },
  {
    title: "Pools won",
    value: 128,
  },
  {
    title: "Total Points",
    value: 1236,
  },
  {
    title: "Team Value",
    value: "12.780.000 STRK",
  },
];

const PerformanceStats = () => {
  return (
    <div className="w-full h-full bg-[#0F172BCC] rounded-[20px] text-white p-4 flex flex-col">
      <div className="flex items-center pb-2 sm:pb-3.5 gap-2 sm:gap-4 flex-shrink-0">
        <img src={userClock} alt="icon" className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
        <h1 className="text-xl sm:text-2xl font-bold truncate">
          Your Performance
        </h1>
      </div>

      <div className="flex-grow">
        {performanceStats.map((stats, id) => {
          return (
            <div
              key={id}
              className="flex bg-[#1E2939] py-2 px-3 sm:py-2.5 sm:px-4 my-2 rounded-full justify-between items-center text-sm sm:text-base"
            >
              <h4 className="truncate">{stats.title}</h4>
              <p className="truncate">{stats.value}</p>
            </div>
          );
        })}
      </div>

      <button className="bg-[#F54900] p-2 sm:p-2.5 mt-2 w-full rounded-2xl text-sm sm:text-base flex-shrink-0">
        Manage Team
      </button>
    </div>
  );
};

export default PerformanceStats;
