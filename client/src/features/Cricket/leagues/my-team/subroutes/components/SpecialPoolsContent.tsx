import React from 'react'
import { usePoolModal } from '../../../../../../hooks/usePopUp';
import { SpecialPoolCard } from './SpecialPoolCard';

interface SpecialPoolCardProps {
    title: string;
    icon: React.ReactNode;
    description: string;
    position?: string;
    onOpenModal: (position?: string) => void;
}

export function SpecialPoolsContent() {
    const { onOpen } = usePoolModal((state) => state);

    const specialPoolsData: SpecialPoolCardProps[] = [
        {
            title: "All Players",
            position: undefined,
            icon: (
                <img
                    src="/Cricket.svg"
                    className="w-[100px] h-[100px] text-[#ff5722]"
                    alt="All Players icon"
                />
            ),
            description:
                "View and select from all available players across all positions.",
            onOpenModal: onOpen,
        },
        {
            title: "Best Batsman",
            position: "Batsman",
            icon: (
                <img
                    src="/Cricket.svg"
                    className="w-[100px] h-[100px] text-[#ff5722]"
                    alt="Batsman icon"
                />
            ),
            description:
                "Select the batsman whose skill, power, and consistency make them the most outstanding on the field, aiming to score the most runs of the season!",
            onOpenModal: onOpen,
        },
        {
            title: "Best Bowling Allrounder",
            position: "Bowling Allrounder",
            icon: (
                <img
                    src="/ball.svg"
                    className="w-[100px] h-[100px] text-[#ff5722]"
                    alt="Bowling Allrounder icon"
                />
            ),
            description:
                "Choose the allrounder who excels in both bowling and batting, significantly contributing with wickets and runs.",
            onOpenModal: onOpen,
        },
        {
            title: "Best Bowler",
            position: "Bowler",
            icon: (
                <img
                    src="/ball.svg"
                    className="w-[100px] h-[100px] text-[#ff5722]"
                    alt="Bowler icon"
                />
            ),
            description:
                "Select the bowler whose precision, speed, and strategy make them the most outstanding on the field, aiming to dominate with the most wickets of the season!",
            onOpenModal: onOpen,
        },
        {
            title: "Best Middle Order Batter",
            position: "Middle Order Batter",
            icon: (
                <img
                    src="/Cricket.svg"
                    className="w-[100px] h-[100px] text-[#ff5722]"
                    alt="Middle Order Batter icon"
                />
            ),
            description:
                "Identify the batter who performs best in the middle order, stabilizing innings and accelerating scoring.",
            onOpenModal: onOpen,
        },
        {
            title: "Best Allrounder",
            position: "Allrounder",
            icon: (
                <img
                    src="/Cricket.svg"
                    className="w-[100px] h-[100px] text-[#ff5722]"
                    alt="Allrounder icon"
                />
            ),
            description:
                "Pick the versatile player who consistently contributes significantly with both bat and ball.",
            onOpenModal: onOpen,
        },
        {
            title: "Best Wicketkeeper",
            position: "Wicketkeeper",
            icon: (
                <img
                    src="/Hand.svg"
                    className="w-[100px] h-[100px] text-[#ff5722]"
                    alt="Wicketkeeper icon"
                />
            ),
            description:
                "Choose the wicketkeeper with the best performance behind the stumps, including catches and stumpings.",
            onOpenModal: onOpen,
        },
        {
            title: "Best Batting Allrounder",
            position: "Batting Allrounder",
            icon: (
                <img
                    src="/Cricket.svg"
                    className="w-[100px] h-[100px] text-[#ff5722]"
                    alt="Batting Allrounder icon"
                />
            ),
            description:
                "Select the allrounder who primarily excels in batting while also contributing with bowling.",
            onOpenModal: onOpen,
        },
    ];

    return (
        <div className="scrollCustom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-3">
            {specialPoolsData.map((cardData) => (
                <SpecialPoolCard
                    key={cardData.title}
                    title={cardData.title}
                    position={cardData.position}
                    icon={cardData.icon}
                    description={cardData.description}
                    onOpenModal={cardData.onOpenModal}
                />
            ))}
        </div>
    );
}