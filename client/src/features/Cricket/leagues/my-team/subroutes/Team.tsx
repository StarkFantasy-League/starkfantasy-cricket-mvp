import Table from "../../components/table"; // Adjusted the path to match the correct location of the Table component
import { playersData } from "../../../../../shared/data/mockTableData";
import CricketGround from "../../components/cricketGround";

const Team = () => {
    return (
        <main className="flex justify-between py-[30px] pr-[30px] overflow-x-auto gap-9">
            <CricketGround />
            <Table players={playersData} />
        </main>
    );
};

export default Team;
