interface StatCardProps {
    label: string;
    value: string | number;
    progress?: number;
    secondaryText?: string;
    fullWidth?: boolean;
}

const StatCard = ({ label, value, progress, secondaryText }: StatCardProps) => {
    const isFull = progress === 100;

    return (
        <div className="flex flex-col gap-1 p-4 rounded bg-[#0F172B] grow bg-opacity-80">
            <p className="text-xs font-extralight text-gray-300">{label}</p>
            <div className="flex flex-row gap-4 w-100 items-center justify-between">
                <p className="text-xl font-light text-amber-600">{value}</p>

                {progress !== undefined && (
                    <div className="w-full rounded-full h-2.5 bg-slate-950">
                        <div
                            className={`bg-orange-500 h-2.5 ${
                                isFull ? "rounded-full" : "rounded-l-full"
                            }`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}

                {secondaryText && (
                    <p className="text-xs text-[#8988A3] whitespace-nowrap">
                        {secondaryText}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatCard;
