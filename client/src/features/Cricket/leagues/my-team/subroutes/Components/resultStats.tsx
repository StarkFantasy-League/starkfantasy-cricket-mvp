import StatCard from "./statCard";

interface ResultStatsProps {
    matchesPlayed: number;
    matchesTotal: number;
    rankingCurrent: number;
    rankingPercentage: number;
    totalPoints: number;
    teamGrade: number;
}

const ResultStats = ({
    matchesPlayed,
    matchesTotal,
    rankingCurrent,
    rankingPercentage,
    totalPoints,
    teamGrade,
}: ResultStatsProps) => {
    return (
        <div className="flex flex-row flex-wrap gap-8 justify-center">
            <StatCard
                label="Matches played"
                value={`${matchesPlayed}/${matchesTotal}`}
                progress={(matchesPlayed / matchesTotal) * 100}
            />
            <StatCard
                label="Current Ranking"
                value={`#${rankingCurrent}`}
                secondaryText={`Top ${rankingPercentage}%`}
            />
            <StatCard label="Total points" value={totalPoints} />
            <StatCard label="Team Grade (avg.)" value={teamGrade} />
        </div>
    );
};

export default ResultStats;
