import { Link } from "react-router-dom";
interface SidebarHeaderProps {
    imageSrc: string;
}

export default function SidebarHeader({ imageSrc }: SidebarHeaderProps) {
    return (
        <Link to="/tournaments/indianpremierleague" className="flex items-center gap-[15px] pl-6 p-4 pt-[40px] pb-[30px]">
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
        </Link>
    );
}
