import { useState, useEffect, useRef } from "react";
import field from "../../../../../../public/assets/images/cricket_field.svg";
import Table from "../../components/Table";
import { playersData } from "../../../../../data/mockTableData";
import shirt from "../../../../../../public/icons/player_shirt 11.svg";

const Team = () => {
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

  const [selectedPlayers, setSelectedPlayers] = useState(
    Array(shirtPositions.length).fill(null)
  );
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);

  const availablePlayers = playersData.filter(
    (player) => !selectedPlayers.includes(player)
  );

  const handleShirtClick = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handlePlayerSelect = (index, player) => {
    const newSelectedPlayers = [...selectedPlayers];
    newSelectedPlayers[index] = player;
    setSelectedPlayers(newSelectedPlayers);
    setDropdownIndex(null);
  };

  const handleDeselect = (index) => {
    const newSelectedPlayers = [...selectedPlayers];
    newSelectedPlayers[index] = null;
    setSelectedPlayers(newSelectedPlayers);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="flex justify-between py-[30px] pr-[30px] overflow-x-auto gap-9">
      <div className="">
        <div className="relative w-[800px] h-[880px]">
          <img
            src={field}
            alt="cricket field"
            className="w-full h-full object-cover"
          />
          {[...shirtPositions].reverse().map((position, index) => {
            const originalIndex = shirtPositions.length - 1 - index;
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
                {selectedPlayers[originalIndex] ? (
                  <div
                    className="flex flex-col items-center cursor-pointer z-20"
                    onClick={() => handleDeselect(originalIndex)}
                  >
                    <div className="w-[80px] h-[80px] bg-white rounded-full overflow-hidden">
                      <img
                        src={selectedPlayers[originalIndex].image}
                        alt={selectedPlayers[originalIndex].name}
                        className="w-[100px] h-[100px] object-contain"
                      />
                    </div>
                    <span className="text-white text-[13px] mt-1 font-black">
                      {selectedPlayers[originalIndex].name}
                    </span>
                  </div>
                ) : (
                  <div
                    className="relative z-20"
                    ref={dropdownIndex === originalIndex ? dropdownRef : null}
                  >
                    <img
                      src={shirt}
                      alt="player shirt"
                      className="w-[100px] h-[100px] cursor-pointer"
                      onClick={() => handleShirtClick(originalIndex)}
                    />
                    {dropdownIndex === originalIndex && (
                      <div className="absolute top-[110px] left-1/2 transform -translate-x-1/2 w-64 max-h-64 overflow-y-auto bg-white rounded-lg shadow-lg z-50">
                        {availablePlayers.length > 0 ? (
                          availablePlayers.map((player) => (
                            <div
                              key={player.name}
                              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handlePlayerSelect(originalIndex, player)}
                            >
                              <img
                                src={player.image}
                                alt={player.name}
                                className="w-8 h-8 object-contain mr-2"
                              />
                              <span className="text-sm">{player.name}</span>
                            </div>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-gray-500">
                            No players available
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="">
        <Table players={playersData} />
      </div>
    </main>
  );
};

export default Team;