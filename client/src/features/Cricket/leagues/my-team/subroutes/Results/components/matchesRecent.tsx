import calendar from "@assets/icons/calendar.svg";
import { Match } from "../../../../../../../shared/data/resultsData";
import { CardSection } from "./cardSection";
import MatchInfo from "./matchInfo";

interface MatchesRecentProps {
    matches: Match[];
}

const MatchesRecent = ({ matches }: MatchesRecentProps) => {
    return (
        <CardSection title="Recent Matches" iconSrc={calendar}>
            <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
                {matches.map((match, index) => (
                    <MatchInfo
                        key={index}
                        firstTeam={match.teams[0]}
                        secondTeam={match.teams[1]}
                        date={match.date}
                    />
                ))}
            </div>
        </CardSection>
    );
};

export default MatchesRecent;
