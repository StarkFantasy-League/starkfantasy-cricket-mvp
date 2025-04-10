import React, { useState } from "react";

interface UserBlockProps {
  balance?: string;
  connect?: string;
  profile?: string;
  alternate?: boolean;
}

const UserBlock: React.FC<UserBlockProps> = ({
  balance = "0.00000 STRK",
  connect = "Connect Wallet",
  profile = "/icons/user.png",
  alternate = false,
}) => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  return (
    <div className="flex items-center">
      <div className={`${alternate && "border-transparent"} w-fit lg:border-2 p-2 justify-center flex gap-5 items-center bg-slate-950 rounded-full hover:opacity-90 transition-opacity border-indigo-900`}>
        <div className="hidden xl:block">
          {/* connected to the wallet */}
          {isConnected ? (
            <div className="text-white text-sm px-4 text-center min-w-[150px] py-2 border-[5px]  border-slate-950 rounded-full bg-[#FF9500] ml-2">
              {balance}
            </div>
          ) : (
            // Not connected to the wallet
            <div className={`${alternate && "border-[#312C85]"} text-white text-sm px-4 text-center min-w-[150px] py-2 border-[5px] border-slate-950 rounded-full bg-[#FF9500] ml-2`}>
              {connect}
            </div>
          )}
        </div>

        <button
          onClick={handleConnect}
          className="w-fit rounded-full hover:cursor-pointer"
        >
<img
  className="w-10 h-10 rounded-full border-2 border-purple-800"
  src={profile}
  alt="Profile Logo"
/>

        </button>
      </div>
    </div>
  );
};

export default UserBlock;
