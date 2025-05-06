
import { Match } from "../../../../types";
import Button from "../../../../shared/components/ui/button";
import calendarIcon from "../../../../assets/icons/calendar.svg";
import { formatTime } from "../../../../libs/formatTime";

interface Props {
    upcomingMatches: Match[];
}

const UpcomingMatches: React.FC<Props> = ({ upcomingMatches }) => {
    return (
        <div className="text-white bg-[#0F172B]/80 w-full space-y-4 h-[400px] rounded-lg p-4 flex flex-col scrollCustom">
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <img
                    src={calendarIcon}
                    alt="Calendar"
                    className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
                />
                <h3 className="text-xl sm:text-2xl font-bold truncate">
                    Upcoming matches
                </h3>
            </div>
            <div className="flex flex-col gap-3 flex-grow overflow-y-auto scrollCustom">
                {upcomingMatches.map((match) => (
                    <div
                        key={match.id}
                        className="bg-[#1E2939] rounded-lg px-3 py-2 sm:px-5 sm:py-2.5 flex flex-col  justify-between items-center gap-4"
                    >
                        <div className=" flex justify-between w-full">
                            <div className="flex flex-col items-center gap-2 w-20 sm:w-24 text-center">
                                <img
                                    src={match?.homeTeam?.image_path}
                                    alt={`${match?.homeTeam?.name} logo`}
                                    className="w-15 h-15 object-contain"
                                />
                                <p className="text-sm text-white truncate w-full">
                                    {match?.homeTeam?.name}
                                </p>
                            </div>

                            <div className="flex flex-col items-center justify-center flex-shrink-0">
                                <div className="text-sm sm:text-base font-medium text-white">
                                    vs
                                </div>
                                <p className="text-white font-bold text-xs sm:text-sm mt-1">
                                    {formatTime(match?.matchDate)}
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-2 w-20 sm:w-24 text-center">
                                <img
                                    src={match?.awayTeam?.image_path}
                                    alt={`${match?.awayTeam?.name} logo`}
                                    className="w-15 h-15 object-contain"
                                />
                                <p className="text-sm text-white truncate w-full">
                                    {match?.awayTeam?.name}
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => {}}
                            className="bg-orange-500 hover:bg-orange-600 text-white border-none text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 flex-shrink-0"
                        >
                            Set Lineup
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingMatches;
