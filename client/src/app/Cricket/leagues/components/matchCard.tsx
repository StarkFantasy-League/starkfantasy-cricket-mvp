import { useEffect } from "react";

interface BetModalProps {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  onClose: () => void;
}

export default function BetModal({ homeTeam, awayTeam, date, time, onClose }: BetModalProps) {
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
        className="relative w-[756px] h-[643px] rounded-[20px] border-[3px] flex flex-col text-white overflow-hidden transform translate-y-[20%]"
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

        {/* Top Gradient Background */}
        <div className="relative w-full h-[328px] flex justify-between items-center px-16 pt-12 z-10"
          style={{
            background:
              "linear-gradient(120deg, #F54900 0%, #E17100 49%, #372AAC 49%, #E17100 51%, #372AAC 51%, #0F172B 100%)",
          }}
        >
          {/* Home */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-white text-[18px]">Home</p>
            <div className="w-[110px] h-[110px] bg-gray-300 rounded-[12px]" />
            <p className="text-2xl font-semibold">{homeTeam}</p>
          </div>

          {/* Away */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-white text-[18px]">Away</p>
            <div className="w-[110px] h-[110px] bg-gray-300 rounded-[12px]" />
            <p className="text-2xl font-semibold">{awayTeam}</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-[30px] px-[30px] py-[30px] border-t border-slate-800 z-10 flex-1">
          {/* Date & Time */}
          <p className="text-center text-white text-md font-semibold">
            {date} | {time}
          </p>

          {/* Score Input */}
          <div className="flex justify-center items-center gap-4">
            <input
              type="number"
              className="w-[120px] h-[50px] rounded-full border-2 border-amber-600 text-center bg-slate-900 text-white"
            />
            <span className="text-2xl font-bold">-</span>
            <input
              type="number"
              className="w-[120px] h-[50px] rounded-full border-2 border-amber-600 text-center bg-slate-900 text-white"
            />
          </div>

          {/* Points to bet */}
          <div className="w-full">
            <div className="flex justify-between mb-2">
              <p>Points to bet:</p>
              <p className="text-sm text-gray-400">12100 available</p>
            </div>
            <input
              type="number"
              placeholder="Enter points"
              className="w-full h-[50px] rounded-[25px] border-2 border-amber-600 bg-slate-900 text-white px-4"
            />
          </div>

          {/* Confirm Button */}
          <button
            className="bg-[#F54900] hover:bg-orange-600 text-white font-bold py-3 w-full rounded-full text-center"
          >
            Set as expected result bet
          </button>
        </div>
      </div>
    </div>
  );
}
