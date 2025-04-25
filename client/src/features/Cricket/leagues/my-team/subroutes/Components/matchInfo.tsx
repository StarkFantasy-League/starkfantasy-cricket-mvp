export interface TeamInfo {
    imgSrc: string;
    teamName: string;
    score: number;
}

interface MatchInfoProps {
    firstTeam: TeamInfo;
    secondTeam: TeamInfo;
    date: Date;
}

const MatchInfo = ({ firstTeam, secondTeam, date }: MatchInfoProps) => {
    const formattedDate = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return (
        <div className="bg-gradient-to-b from-slate-800 to-black p-2 rounded-md text-center">
            <div className="flex justify-center gap-4 mb-2">
                <div
                    className="w-10 h-10 bg-gray-300"
                    style={{ backgroundImage: `url(${firstTeam.imgSrc})` }}
                />
                <span className="text-[10px] font-thin text-gray-400 self-end">
                    VS
                </span>
                <div
                    className="w-10 h-10 bg-gray-300"
                    style={{ backgroundImage: `url(${secondTeam.imgSrc})` }}
                />
            </div>
            <div className="flex justify-between text-gray-200 mb-1 text-xs font-medium">
                <span>{firstTeam.teamName}</span>
                <span>{secondTeam.teamName}</span>
            </div>
            <div className="text-orange-500 font-light text-xs">
                {firstTeam.score} - {secondTeam.score}
            </div>
            <div className="text-gray-400 text-[10px] mt-1">
                {formattedDate.replace(",", " -")}
            </div>
        </div>
    );
};

export default MatchInfo;
