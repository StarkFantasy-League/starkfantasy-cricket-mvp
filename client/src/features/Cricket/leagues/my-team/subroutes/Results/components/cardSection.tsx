interface CardSectionProps {
    title: string;
    iconSrc: string;
    children: React.ReactNode;
}

export const CardSection = ({ title, iconSrc, children }: CardSectionProps) => {
    return (
        <div className="flex flex-col gap-1 pb-4 px-4 rounded bg-[#0F172B] w-auto h-full bg-opacity-80">
            <div className="flex flex-row gap-2 items-center">
                <img src={iconSrc} alt={title} className="w-6 h-6" />
                <p className="py-4 text-md text-white">{title}</p>
            </div>
            {children}
        </div>
    );
};
