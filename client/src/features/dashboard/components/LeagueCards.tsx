import React from "react";
import LeagueCard from "./LeagueCard";

const LeagueCardDetails = [
    { title: "Ligue 1", image: "/assets/images/ligueone.png" },
    {
        title: "Premier League",
        image: "/assets/images/premier.png",
        isBigCard: true,
    },
    { title: "LaLiga", image: "/assets/images/laliga.png" },
];

const LeagueCards = () => {
    return (
        <div className="gradient-bg flex space-x-24 p-5 items-center justify-center">
            {LeagueCardDetails.map((leagueCardDetail) => (
                <LeagueCard
                    title={leagueCardDetail.title}
                    image={leagueCardDetail.image}
                    isBigCard={leagueCardDetail.isBigCard}
                />
            ))}
        </div>
    );
};

export default LeagueCards;
