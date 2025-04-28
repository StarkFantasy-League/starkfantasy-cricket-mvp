interface PoolStatProps {
    label: string;
    value: string | number;
    suffix?: string;
}

const PoolStat: React.FC<PoolStatProps> = ({ label, value, suffix }) => {
    return (
        <div className="bg-gray-800 p-2 px-4 rounded-lg flex flex-row justify-between align-center gap-1 w-full">
            <span className="text-white text-xs font-light self-center">
                {label}
            </span>
            <span className="text-amber-500 text-lg flex flex-col leading-none">
                {value}
                {suffix && (
                    <span className="text-[8px] font-normal text-orange-500 opacity-80 text-center">
                        {suffix}
                    </span>
                )}
            </span>
        </div>
    );
};

export default PoolStat;
