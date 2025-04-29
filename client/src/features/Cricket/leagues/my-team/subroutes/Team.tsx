import Table from "../../components/table";
//import { playersData } from "../../../../../shared/data/mockTableData";
import CricketGround from "../../components/cricketGround";
import { useEffect, useState } from "react";
import { getPlayers } from "./../../../../../services/PlayerService";

const Team = () => {
    const [teamPlayers, setTeamPlayers] = useState(Array(11).fill(null));
    const [playersData, setPlayersData] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await getPlayers();
                console.log(response);
                setPlayersData(response);
            } catch (error) {
                console.error("Error fetching players:", error);
            }
        };

        fetchPlayers();
    }, []);

    return (
        <main className="flex flex-col  px-[30px]  overflow-hidden scrollCustom">
            <div className="flex justify-center">
                <CricketGround teamPlayers={teamPlayers} />
            </div>

            <div className="">
                <Table players={playersData} />
            </div>
        </main>
    );
};

export default Team;
