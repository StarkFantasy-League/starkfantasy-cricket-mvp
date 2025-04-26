import { CardSection } from "./cardSection";
import LineChart from "./chart";
import chart from "../../../../../../assets/icons/chart.svg";
import arrowUp from "../../../../../../assets/icons/arrowUp.svg";

interface WeeklyProgressProps {
    chartCategories: (string | null)[];
    chartSeries: (number | null)[];
    totalPoints: number;
    pointsPercentage: number;
    rank: number;
}

const WeeklyProgress: React.FC<WeeklyProgressProps> = ({
    chartCategories,
    chartSeries,
    totalPoints,
    pointsPercentage,
    rank,
}) => {
    return (
        <CardSection title="Weekly Progress" iconSrc={chart}>
            <div className="flex flex-row flex-wrap gap-2 justify-around">
                <LineChart
                    categories={chartCategories}
                    series={chartSeries}
                    seriesName="Progress"
                />

                <div className="flex flex-row items-stretch">
                    <div className="flex justify-between items-center my-8 ">
                        <div className="flex flex-col bg-gray-800 p-4 rounded-lg text-center w-1/2 mr-2 justify-between">
                            <p className="text-gray-300 text-sm">
                                Total Points
                            </p>
                            <p className="text-3xl text-amber-500">
                                {totalPoints}
                            </p>
                            <p className="text-[#0CB531] text-xs font-thin mt-1 text-[8px] leading-none">
                                +{pointsPercentage}% from last week
                            </p>
                        </div>

                        <div className="bg-gray-800 p-4 pb-8 rounded-lg text-center w-1/2 ml-2 flex flex-col items-center justify-between">
                            <p className="text-gray-300 text-sm">Rank status</p>
                            <div className="flex items-center justify-center mt-2 gap-4">
                                <img src={arrowUp} className="w-8 h-8" />
                                <span className="text-3xl font-semibold text-white">
                                    {rank}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CardSection>
    );
};

export default WeeklyProgress;
