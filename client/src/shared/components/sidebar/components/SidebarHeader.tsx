interface SidebarHeaderProps {
    imageSrc: string;
}

export default function SidebarHeader({ imageSrc }: SidebarHeaderProps) {
    return (
        <div className="flex items-center gap-[15px] p-4 pt-[40px] pb-[30px]">
            <div className="">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt="Profile"
                        width={64}
                        height={64}
                        className="rounded-lg"
                    />
                ) : (
                    <div className="w-[60px] h-[60px] rounded-full bg-[#D9D9D9]" />
                )}
            </div>
            <p className=" text-white font-semibold">League</p>
        </div>
    );
}
