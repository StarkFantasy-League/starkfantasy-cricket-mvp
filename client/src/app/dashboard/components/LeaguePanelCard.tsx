import Image from "@/components/image";
import React from "react";

const LeaguePanelCard = () => {
    return (
        <div className="flex flex-col  w-[280px] h-[345px] bg-[#0F172B] rounded-[20px] gap-4 py-3 pt-5 px-4 ">
            <h3 className="text-[40px] text-[#FF6900]"> My Leagues </h3>
            <div className="border-2 border-white rounded-full px-2 bg-[#171717]">
                <div className="flex space-x-1 text-white items-center p-2">
                    <div className="bg-white rounded-[100%] p-1">
                        <Image
                            src="/icons/premierleagueicon.png"
                            alt=""
                            width={40}
                            height={40}
                        />
                    </div>
                    <p className="text-20px">Premier League</p>
                </div>
            </div>
        </div>
    );
};

export default LeaguePanelCard;
