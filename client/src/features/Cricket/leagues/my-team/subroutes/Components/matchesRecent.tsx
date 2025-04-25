import calendar from "../../../../../../assets/icons/calendar.svg";
import MatchInfo from "./matchInfo";

type TeamInfo = {
    imgSrc: string;
    teamName: string;
    score: number;
};

export type Match = {
    date: Date;
    teams: [TeamInfo, TeamInfo];
};

interface MatchesRecentProps {
    matches: Match[];
}

export const MatchesRecent = ({ matches }: MatchesRecentProps) => {
    return (
        <div className="flex flex-col gap-1 pb-4 px-4 rounded bg-slate-900">
            <div className="flex flex-row gap-2 items-center">
                <img src={calendar} alt="calendar" className=" w-6 h-6" />
                <p className="py-4 text-md text-white">Recent Matches</p>
            </div>

            <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
                {matches.map((match, index) => (
                    <MatchInfo
                        key={index}
                        firstTeam={match.teams[0]}
                        secondTeam={match.teams[1]}
                        date={match.date}
                    />
                ))}
            </div>
        </div>
    );
};
