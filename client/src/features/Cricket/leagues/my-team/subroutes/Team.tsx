import Table from "../../components/table"; // Adjusted the path to match the correct location of the Table component
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
        <main className="flex justify-between py-[30px] pr-[30px] overflow-x-auto gap-9">
            <CricketGround teamPlayers={teamPlayers}/>
            <Table players={playersData} />
        </main>
    );
};

export default Team;
