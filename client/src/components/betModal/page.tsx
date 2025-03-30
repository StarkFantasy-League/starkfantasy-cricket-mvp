import { useEffect } from "react";

interface BetModalProps {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  onClose: () => void;
}

export default function BetModal({
  homeTeam,
  awayTeam,
  date,
  time,
  onClose,
}: BetModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="relative w-[90%] max-w-[756px] h-[643px] rounded-[20px] border-[3px] overflow-hidden flex flex-col text-white transform translate-y-[20%]"
        style={{
          background: "#020618",
          borderColor: "#1E2939",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-white hover:opacity-80 z-20"
        >
          &times;
        </button>

        {/* Upper Half: Teams + Background */}
        <div
          className="relative h-1/2 flex justify-between items-center px-12 pt-8"
          style={{
            background:
              "linear-gradient(120deg, #F54900 0%, #E17100 49%, #372AAC 49%, #E17100 51%, #372AAC 51%, #0F172B 100%)",
          }}
        >
          <div className="flex flex-col items-center gap-2 z-10">
            <p className="text-white text-sm">Home</p>
            <div className="w-[110px] h-[110px] bg-gray-300 rounded-[12px]" />
            <p className="text-xl font-semibold">{homeTeam}</p>
          </div>

          <div className="flex flex-col items-center gap-2 z-10">
            <p className="text-white text-sm">Away</p>
            <div className="w-[110px] h-[110px] bg-gray-300 rounded-[12px]" />
            <p className="text-xl font-semibold">{awayTeam}</p>
          </div>

          <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-semibold text-sm z-10">
            {date} | {time}
          </p>
        </div>

        {/* Lower Half: Inputs */}
        <div className="flex flex-col gap-4 h-1/2 px-12 py-6 items-center justify-center z-10">
          {/* Score Input */}
          <div className="flex items-center gap-4">
            <input
              type="number"
              className="w-[120px] h-[50px] rounded-full border border-orange-500 text-center bg-slate-900 text-white"
            />
            <span className="text-2xl font-bold">-</span>
            <input
              type="number"
              className="w-[120px] h-[50px] rounded-full border border-orange-500 text-center bg-slate-900 text-white"
            />
          </div>

          {/* Points */}
          <div className="w-full">
            <div className="flex justify-between mb-1">
              <p>Points to bet:</p>
              <p className="text-sm text-gray-400">12100 available</p>
            </div>
            <input
              type="number"
              placeholder="Enter points"
              className="w-full h-[50px] rounded-full border border-orange-500 bg-slate-900 text-white px-4"
            />
          </div>

          {/* Confirm Button */}
          <button className="mt-2 bg-[#F54900] hover:bg-orange-600 text-white font-bold py-3 w-full rounded-full">
            Set as expected result bet
          </button>
        </div>
      </div>
    </div>
  );
}
