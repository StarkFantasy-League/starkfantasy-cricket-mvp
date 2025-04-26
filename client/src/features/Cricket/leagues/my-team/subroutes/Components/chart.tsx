import Chart from "react-apexcharts";

interface LineChartProps {
    categories: (string | number | null)[];
    series: (number | null)[];
    seriesName: string;
    hideXaxis?: boolean;
    usePercentageFormat?: boolean;
    YaxisAnnotation?: number;
    stepSize?: number;
}

const LineChart: React.FC<LineChartProps> = ({
    categories,
    series,
    seriesName,
    hideXaxis,
    usePercentageFormat,
    YaxisAnnotation,
    stepSize = 50,
}) => {
    const state = {
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
                background: "transparent",
            },
            title: {
                text: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            stroke: {
                lineCap: "round" as "round",
                curve: "smooth" as "smooth",
                width: 1,
                colors: ["#EF7605"],
            },
            markers: {
                size: 2,
                colors: ["#EF7605"],
                strokeColors: "#EF7605",
                strokeWidth: 0,
            },
            xaxis: {
                axisTicks: {
                    show: true,
                    color: "#ffffff",
                },
                axisBorder: {
                    show: true,
                    color: "#ffffff",
                    height: 1,
                    offsetY: 0,
                },
                labels: {
                    show: !hideXaxis,
                    style: {
                        colors: "#D9D9D9",
                        fontSize: "9px",
                        fontFamily: "inherit",
                        fontWeight: 300,
                    },
                },
                categories: categories,
            },
            yaxis: {
                min: 0,
                max: usePercentageFormat
                    ? 100
                    : Math.max(...series.filter((s) => s != null)) + stepSize,
                stepSize: stepSize,
                labels: {
                    style: {
                        colors: "#D9D9D9",
                        fontSize: "9px",
                        fontFamily: "inherit",
                        fontWeight: 300,
                    },
                    formatter: usePercentageFormat
                        ? (value: number) => `${value}%`
                        : undefined,
                },
                axisBorder: {
                    show: true,
                    color: "#ffffff",
                    width: 1,
                    offsetX: 0,
                },
            },
            grid: {
                show: false,
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
            annotations: YaxisAnnotation
                ? {
                      yaxis: [
                          {
                              y: YaxisAnnotation,
                              borderColor: "#ffffff",
                              strokeDashArray: 3,
                          },
                      ],
                  }
                : {
                      yaxis: [
                          {
                              strokeDashArray: 0,
                          },
                      ],
                  },
        },
    };

    const chartSeries = [
        {
            name: seriesName,
            data: series,
        },
    ];

    return (
        <Chart
            options={state.options}
            series={chartSeries}
            type="line"
            height={160}
        />
    );
};

export default LineChart;
