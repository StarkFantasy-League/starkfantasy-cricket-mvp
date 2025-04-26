import { formatDate } from "@/utils/date";
import Image from "@/components/image";
import React from "react";

interface MatchPanelProps {
    team1Image: string;
    team2Image: string;
    date: Date;
    time: string;
    onViewDetails: () => void;
}

function MatchPanel({
    team1Image,
    team2Image,
    date,
    time,
    onViewDetails,
}: MatchPanelProps) {
    const { day, dayNumber, month, year } = formatDate(date);
    return (
        <div className="w-full h-[22rem] rounded-2xl relative overflow-hidden ">
            <Image
                src="/assets/images/match-panel.jpg"
                alt="match-panel"
                width={1200}
                height={540}
                className="absolute w-full h-full object-cover z-0"
            />
            <div
                className="absolute top-0 left-0 h-full w-[73%] bg-[#312C85E5] rounded-l-lg z-10"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 65% 100%, 0 100%)",
                }}
            />
            <div className="w-[97%] h-[95%] m-auto rounded-[10px] border-[5px] border-[#020618] relative z-20 mt-[0.34rem] p-4">
                <p className="font-[family-name:var(--font-exo-2)] text-white font-medium text-4xl">
                    Next Match
                </p>

                <div className="flex items-center gap-x-4 mt-4 ml-6">
                    <div className="w-[7.5rem] h-[7.5rem] bg-[#0F172B] rounded-[2rem] flex items-center">
                        <Image
                            src={team1Image || ""}
                            alt="team1"
                            width={120}
                            height={120}
                            className="w-full h-[75%] object-contain rounded-[2rem]"
                        />
                    </div>
                    <div className="bg-[#FE9A00] w-[2.5rem] h-[0.625rem] rounded-[0.3rem]"></div>
                    <div className="w-[7.5rem] h-[7.5rem] bg-[#0F172B] rounded-[2rem] flex items-center">
                        <Image
                            src={team2Image || ""}
                            alt="team2"
                            width={120}
                            height={120}
                            className="w-full h-[75%] object-contain rounded-[2rem]"
                        />
                    </div>
                </div>

                <div className="ml-24 mt-10">
                    <p className="font-[family-name:var(--font-open-sans)] font-normal text-xl ">
                        <span>
                            {day} {dayNumber}
                        </span>{" "}
                        |{" "}
                        <span>
                            {month} {year}
                        </span>
                    </p>

                    <p className="font-[family-name:var(--font-open-sans)] font-semibold text-2xl ml-[3.3rem] mt-2 ">
                        {time}
                    </p>
                </div>

                <div
                    className="absolute bottom-4 right-4 bg-[#F54900] text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[7.5rem] h-[2.5rem] rounded-[0.63rem] flex justify-center items-center font-[family-name:var(--font-open-sans)] font-normal  text-xs"
                    onClick={onViewDetails}
                >
                    View Details
                </div>
            </div>
        </div>
    );
}

export default MatchPanel;
