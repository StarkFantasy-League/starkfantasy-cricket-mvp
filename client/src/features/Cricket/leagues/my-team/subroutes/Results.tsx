import {
    matchesData,
    resultStatsData,
    topPlayersData,
    weeklyProgressData,
} from "../../../../../shared/data/resultsData";
import MatchesRecent from "./Components/matchesRecent";
import ResultStats from "./Components/resultStats";
import TopPlayers from "./Components/topPlayers";
import WeeklyProgress from "./Components/weeklyProgress";

const Results = () => {
    return (
        <div className="flex flex-col justify-center p-4 bg-white">
            <div className="flex flex-col justify-center">
                <h1 className="text-4xl text-black py-2 font-bold">Results</h1>
                <ResultStats {...resultStatsData} />
            </div>
            <div className="flex flex-row flex-wrap my-8 justify-evenly gap-4 h-1/2">
                <div className="basis-3/5 h-full">
                    <MatchesRecent matches={matchesData} />
                </div>
                <div className="grow h-full">
                    <TopPlayers players={topPlayersData} />
                </div>
                <div className="basis-1/2 h-full">
                    <WeeklyProgress {...weeklyProgressData} />
                </div>
            </div>
        </div>
    );
};

export default Results;
