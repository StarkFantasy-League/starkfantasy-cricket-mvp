import {
    matchesData,
    poolResultsData,
    resultStatsData,
    topPlayersData,
    weeklyProgressData,
} from "../../../../../shared/data/resultsData";
import MatchesRecent from "./Components/matchesRecent";
import ResultStats from "./Components/resultStats";
import TopPlayers from "./Components/topPlayers";
import WeeklyProgress from "./Components/weeklyProgress";
import background from "../../../../../assets/leagues/indianLeaguePage2.png";
import PoolResults from "./Components/poolResults";

const Results = () => {
    return (
        <div
            className="flex flex-col justify-center py-4 px-8 h-100"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="flex flex-col justify-center">
                <h1 className="text-4xl text-white mb-8 font-semibold">
                    Results
                </h1>
                <ResultStats {...resultStatsData} />
            </div>
            <div className="flex flex-row flex-wrap mt-8 mb-4 justify-around gap-8 h-1/2">
                <div className="basis-3/5 h-full grow">
                    <MatchesRecent matches={matchesData} />
                </div>
                <div className="grow h-full">
                    <TopPlayers players={topPlayersData} />
                </div>
                <div className="flex flex-row flex-wrap gap-4 justify-between w-full">
                    <div className="grow">
                        <WeeklyProgress {...weeklyProgressData} />
                    </div>
                    <div className="grow">
                        <PoolResults {...poolResultsData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
