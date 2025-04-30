import { motion, AnimatePresence } from "framer-motion";
import field from "../../../../assets/images/cricket_field.svg";
import shirt from "../../../../assets/icons/player_shirt_11.svg";
import { Player } from "../../../../shared/data/mockTableData";
import React, { useState, useEffect, useRef } from "react";

interface Props {
    teamPlayers: (Player | null)[];
}

const CricketGround: React.FC<Props> = ({ teamPlayers }) => {
    const shirtPositions = [
        { top: "12%", left: "48%" },
        { top: "22%", left: "71%" },
        { top: "22%", left: "27%" },
        { top: "37%", left: "78%" },
        { top: "37%", left: "20%" },
        { top: "43%", left: "48.6%" },
        { top: "53%", left: "78%" },
        { top: "53%", left: "20%" },
        { top: "70%", left: "70%" },
        { top: "70%", left: "28%" },
        { top: "79%", left: "49%" },
    ];

    const [selectedPlayers, setSelectedPlayers] = useState<(Player | null)[]>(
        Array(11).fill(null)
    );

    const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const availablePlayers = teamPlayers.filter(
        (player) => player !== null && !selectedPlayers.some(selected => selected?.player_name === player?.player_name)
    ) as Player[];


    const handleShirtClick = (index: number): void => {
        if (!selectedPlayers[index]) {
             setDropdownIndex(dropdownIndex === index ? null : index);
        } else {
             handleDeselect(index);
        }
    };

    const handlePlayerSelect = (index: number, player: Player): void => {
        const newSelectedPlayers = [...selectedPlayers];
        newSelectedPlayers[index] = player;
        setSelectedPlayers(newSelectedPlayers);
        setDropdownIndex(null);
    };

    const handleDeselect = (index: number): void => {
        const newSelectedPlayers = [...selectedPlayers];
        newSelectedPlayers[index] = null;
        setSelectedPlayers(newSelectedPlayers);
        setDropdownIndex(null);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const shirtVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.1, transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.1 } },
    };

    const dropdownVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" },
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    };

    const dropdownItemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { duration: 0.2, delay: i * 0.05 },
        }),
    };

    const playerVariants = {
        hidden: { scale: 0.5, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 20 },
        },
        exit: { scale: 0.5, opacity: 0, transition: { duration: 0.2 } },
    };
    return (
        <div className="md:scale-[.8] xl:scale-100 scale-[.7]">
            <div className="relative lg:w-[800px] lg:h-[880px] md:w-[700px] md:h-[780px] w-[500px] h-[580px]">
                <img
                    src={field}
                    alt="cricket field"
                    className="w-full h-full object-cover"
                />
                {[...shirtPositions].reverse().map((position, index) => {
                    const originalIndex = shirtPositions.length - 1 - index;
                    const player = selectedPlayers[originalIndex];

                    return (
                        <div
                            key={originalIndex}
                            className="absolute flex flex-col items-center z-10"
                            style={{
                                top: position.top,
                                left: position.left,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {player ? (
                                    <motion.div
                                        key={`player-${originalIndex}`}
                                        variants={playerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="flex flex-col items-center cursor-pointer z-20"
                                        onClick={() =>
                                            handleDeselect(originalIndex)
                                        }
                                    >
                                        <div className="md:w-[80px] md:h-[80px] w-[60px] h-[60px] bg-white rounded-full overflow-hidden">
                                            <img
                                                src={player.image_path}
                                                alt={player.player_name}
                                                className="md:w-[100px] md:h-[100px] w-[80px] h-[80px]  object-contain"
                                            />
                                        </div>
                                        <span className="text-white text-[11px] md:text-[13px] mt-1 font-black">
                                            {player.player_name}
                                        </span>
                                    </motion.div>
                                ) : (
                                    <div
                                        key={`shirt-${originalIndex}`}
                                        className="relative z-20"
                                    >
                                        <motion.div
                                            variants={playerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <motion.img
                                                src={shirt}
                                                alt="player shirt"
                                                className="w-[100px] h-[100px] cursor-pointer"
                                                variants={shirtVariants}
                                                initial="initial"
                                                whileHover="hover"
                                                whileTap="tap"
                                                onClick={() =>
                                                    handleShirtClick(
                                                        originalIndex
                                                    )
                                                }
                                            />
                                        </motion.div>
                                        <AnimatePresence>
                                            {dropdownIndex ===
                                                originalIndex && (
                                                <motion.div
                                                    ref={dropdownRef}
                                                    variants={dropdownVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="absolute  z-[1000] top-[110px] left-1/2 transform -translate-x-1/2 w-64 max-h-[230px] overflow-y-auto bg-slate-950/50 rounded-lg shadow-lg "
                                                >
                                                    {availablePlayers.length >
                                                    0 ? (
                                                        availablePlayers.map(
                                                            (player, idx) => (
                                                                <motion.div
                                                                    key={player.player_name}
                                                                    custom={idx}
                                                                    variants={
                                                                        dropdownItemVariants
                                                                    }
                                                                    initial="hidden"
                                                                    animate="visible"
                                                                    className="flex items-center gap-3 py-3 px-2 hover:bg-slate-950 cursor-pointer"
                                                                    onClick={() =>
                                                                        handlePlayerSelect(
                                                                            originalIndex,
                                                                            player
                                                                        )
                                                                    }
                                                                >
                                                                    <div className="w-8 h-8 rounded-full bg-white overflow-hidden">
                                                                        <img
                                                                            src={player.image_path}
                                                                            alt={player.player_name}
                                                                            className="w-8 h-8 object-cover mr-2"
                                                                        />
                                                                    </div>
                                                                    <span className="text-sm text-white">
                                                                        {player.player_name}
                                                                    </span>
                                                                </motion.div>
                                                            )
                                                        )
                                                    ) : (
                                                        <div className="p-2 text-sm text-gray-500">
                                                            No players available
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CricketGround;
