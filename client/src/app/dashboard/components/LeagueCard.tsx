import Image from "@/components/image";
import React from "react";

interface LeagueCardProps {
    title: string;
    isBigCard?: boolean;
    image: string;
}
const LeagueCard = ({ title, image, isBigCard }: LeagueCardProps) => {
    return (
        <div
            className={
                isBigCard
                    ? `flex flex-col w-[180px] h-[200px] `
                    : `flex flex-col w-[144px] h-[160px] opacity-70`
            }
        >
            <div className="w-full h-[60%] bg-white rounded-t-3xl flex justify-center items-center p-5">
                <Image src={image} width={150} height={110} alt="LeagueCard" />
            </div>
            <div className="w-full bg-[#372AAC] purple-shadow rounded-b-3xl h-[40%] flex items-center justify-center text-white text-[20px] py-5 px-2">
                {title}
            </div>
        </div>
    );
};

export default LeagueCard;
