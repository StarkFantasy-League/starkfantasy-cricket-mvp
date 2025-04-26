import { Player } from "../../../../../../shared/data/resultsData";
import TopPlayer from "./topPlayer";
import trophy from "../../../../../../assets/icons/trophy.svg";
import { CardSection } from "./cardSection";

interface TopPlayersProps {
    players: Player[];
}

const TopPlayers: React.FC<TopPlayersProps> = ({ players }) => {
    return (
        <CardSection title="Top Fantasy Players" iconSrc={trophy}>
            <div className="flex flex-col space-y-1 w-100 justify-stretch">
                {players.map((player, index) => (
                    <TopPlayer key={index} {...player} />
                ))}
            </div>
        </CardSection>
    );
};

export default TopPlayers;
