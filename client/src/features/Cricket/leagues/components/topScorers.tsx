import { PlayerStats } from "../../../../types";
import trophyIcon from "../../../../assets/icons/trophy.svg";
import truncateText from "../../../../shared/utils/truncate";

interface Props {
    topPlayers: PlayerStats[];
}

const TopScorers: React.FC<Props> = ({ topPlayers }) => {
    return (
        <div className="w-full h-full rounded-lg bg-[#0F172B]/80 p-4 flex flex-col scrollCustom">
            <div className="flex items-center mb-4 flex-shrink-0">
                <div className="text-[#FF6900] mr-2 sm:mr-4 flex-shrink-0">
                    <img
                        src={trophyIcon}
                        alt="Trophy"
                        className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold truncate">
                    Top Scorers
                </h1>
            </div>

            <div className="bg-[#0F172B]/80 rounded-lg overflow-hidden flex-grow overflow-y-auto scrollCustom">
                <div className="grid grid-cols-[0.8fr_2.8fr_2fr_1fr_1fr] bg-[#0A0F1F] py-2 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm flex-shrink-0">
                    <div className="text-amber-500 font-semibold text-center">
                        Rank
                    </div>
                    <div className="text-amber-500 font-semibold pl-4">
                        Player
                    </div>
                    <div className="text-amber-500 font-semibold">Team</div>
                    <div className="text-amber-500 font-semibold text-center">
                        Runs
                    </div>
                    <div className="text-amber-500 font-semibold text-center">
                        Points
                    </div>
                </div>

                <div className="divide-y divide-[#1E293B]">
                    {topPlayers.map((player, index) => (
                        <div
                            key={player.id}
                            className="grid grid-cols-[0.8fr_2.8fr_2fr_1fr_1fr] py-2 px-3 sm:py-4 sm:px-6 hover:bg-[#1E293B]/70 transition-colors duration-150 text-xs sm:text-sm items-center"
                        >
                            <div className="text-white text-center">
                                {index + 1}
                            </div>
                            <div className="text-white truncate pl-4">
                                {truncateText(player.player_name, 12)}
                            </div>
                            <div className="text-white truncate">
                                {truncateText(player.player_team, 12)}
                            </div>
                            <div className="text-white text-center">
                                {player?.runs}
                            </div>
                            <div className="text-white text-center">
                                {player.points}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopScorers;
