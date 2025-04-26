import { CardSection } from "./cardSection";
import PoolStat from "./poolStat";
import chip from "../../../../../../assets/icons/chip.svg";
import LineChart from "./chart";

interface PoolresultsProps {
    chartCategories: (string | number | null)[];
    chartSeries: (number | null)[];
    chartYannotation: number;
    successRate: number;
    totalEarnings: number;
    bestPrediction: number;
    avgAccuracy: number;
}

const PoolResults: React.FC<PoolresultsProps> = ({
    chartCategories,
    chartSeries,
    chartYannotation,
    successRate,
    totalEarnings,
    bestPrediction,
    avgAccuracy,
}) => {
    return (
        <CardSection title={"Pools' results"} iconSrc={chip}>
            <div className="flex flex-row flex-wrap gap-2">
                <LineChart
                    categories={chartCategories}
                    series={chartSeries}
                    seriesName="Progress"
                    YaxisAnnotation={chartYannotation}
                    hideXaxis
                    usePercentageFormat
                    stepSize={25}
                />

                <div className="flex flex-col space-y-1 justify-stretch grow">
                    <PoolStat label="Success rate" value={`${successRate} %`} />
                    <PoolStat
                        label="Total earnings"
                        value={totalEarnings}
                        suffix="STRK"
                    />
                    <PoolStat
                        label="Best Prediction"
                        value={`${bestPrediction} %`}
                    />
                    <PoolStat
                        label="Avg. Accuracy"
                        value={`${avgAccuracy} %`}
                    />
                </div>
            </div>
        </CardSection>
    );
};

export default PoolResults;
