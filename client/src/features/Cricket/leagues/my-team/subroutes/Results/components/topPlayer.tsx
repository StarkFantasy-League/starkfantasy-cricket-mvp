import { Player } from "../../../../../../../shared/data/resultsData";

const TopPlayer: React.FC<Player> = ({
    playerName,
    teamName,
    playerType,
    score,
    avatarSrc,
    position,
}) => {
    return (
        <div className="flex items-center justify-around p-2 bg-gray-800 rounded-md w-full">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-600 text-white text-sm font-bold">
                    {position}
                </div>
                <div
                    className="w-8 h-8 bg-[#D9D9D9] rounded-full"
                    style={{ backgroundImage: `url(${avatarSrc})` }}
                />
                <div className="flex flex-col">
                    <span className="text-xs text-white font-light">
                        {playerName}
                    </span>
                    <div className="flex gap-2 items-center text-xs">
                        <span className="text-amber-500 font-light bg-[#161F2F] rounded-full px-1 text-[9px]">
                            {teamName}
                        </span>
                        <span className="text-gray-300 text-[9px]">
                            {playerType}
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-orange-500 text-lg ">{score}</div>
        </div>
    );
};

export default TopPlayer;
