import ResultStats from "./Components/resultStats";

const Results = () => {
    const matchesPlayed = 24;
    const matchesTotal = 60;
    const rankingCurrent = 45;
    const rankingPercentage = 20;
    const totalPoints = 2456;
    const teamGrade = 9.1;

    return (
        <div className="flex flex-col justify-center p-4 bg-white">
            <div className="flex flex-col justify-center">
                <h1 className="text-4xl text-black py-2 font-bold">Results</h1>
                <ResultStats
                    matchesPlayed={matchesPlayed}
                    matchesTotal={matchesTotal}
                    rankingCurrent={rankingCurrent}
                    rankingPercentage={rankingPercentage}
                    totalPoints={totalPoints}
                    teamGrade={teamGrade}
                />
            </div>
        </div>
    );
};

export default Results;
