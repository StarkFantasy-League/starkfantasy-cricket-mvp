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
import background from "../../../../../assets/leagues/indianLeaguePage2.png";

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
                <h1 className="text-4xl text-white mb-8 font-bold">Results</h1>
                <ResultStats {...resultStatsData} />
            </div>
            <div className="flex flex-row flex-wrap mt-8 mb-4 justify-evenly gap-8 h-1/2">
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
