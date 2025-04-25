import { Match, MatchesRecent } from "./Components/matchesRecent";
import ResultStats from "./Components/resultStats";

const Results = () => {
    const resultStatsData = {
        matchesPlayed: 24,
        matchesTotal: 60,
        rankingCurrent: 45,
        rankingPercentage: 20,
        totalPoints: 2456,
        teamGrade: 9.1,
    };

    const matches: Match[] = Array.from({ length: 7 }, () => ({
        date: new Date(),
        teams: [
            {
                imgSrc: "",
                teamName: "Team 1",
                score: 165,
            },
            {
                imgSrc: "",
                teamName: "Team 2",
                score: 185,
            },
        ],
    }));

    return (
        <div className="flex flex-col justify-center p-4 bg-white">
            <div className="flex flex-col justify-center">
                <h1 className="text-4xl text-black py-2 font-bold">Results</h1>
                <ResultStats {...resultStatsData} />
            </div>
            <div className="flex flex-row flex-wrap my-8 justify-center">
                <MatchesRecent matches={matches} />
            </div>
        </div>
    );
};

export default Results;
