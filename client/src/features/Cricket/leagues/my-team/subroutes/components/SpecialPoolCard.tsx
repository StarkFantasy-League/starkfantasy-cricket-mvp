import React from 'react'


interface SpecialPoolCardProps {
    title: string;
    icon: React.ReactNode;
    description: string;
    position?: string;
    onOpenModal: (position?: string) => void;
}

export function SpecialPoolCard({
    title,
    icon,
    description,
    position,
    onOpenModal,
}: SpecialPoolCardProps) {
    return (
        <div className="bg-[#0F172B] border border-[#FF6900] rounded-lg h-[400px] p-6 flex flex-col items-center text-center justify-between scrollCustom">
            <div className=" flex flex-col items-center">
                <div className=" mb-[30px]">{icon}</div>
                <h2 className="text-[26px] font-bold mb-4">{title}</h2>
                <p className="text-gray-300 text-[17px] mb-6">{description}</p>
            </div>
            <button
                className="bg-[#ff5722] cursor-pointer text-white py-2 px-8 rounded-md w-full"
                onClick={() => onOpenModal(position)}
            >
                Make bet
            </button>
        </div>
    );
}