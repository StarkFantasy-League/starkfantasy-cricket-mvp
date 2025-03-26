import Image from "@/components/image";

const UserPanel = () => {
  const user = {
    name: "User name",
    avatar: "/vercel.svg",
    starkBalance: 2662.26,
    points: 1250,
    rank: 126,
  };

  return (
    <div className="flex flex-col items-center justify-evenly w-[280px] h-[452px] bg-[#0F172B] rounded-[20px] gap-4 py-3 pt-5 px-2 ">
      <div className="w-[170px] h-[170px] rounded-full bg-[#D9D9D9] flex items-center justify-center ">
        <Image
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          height={100}
          width={100}
          className=" w-full h-full rounded-full object-cover "
        />
      </div>

      <h1 className="text-[#FFFFFF] text-xl font-normal text-center font-openSans ">
        {user.name}{" "}
      </h1>

      <div className="bg-[#FE9A00] border-[3px] border-[#372AAC] w-[200px] h-[50px] rounded-[25px] flex items-center justify-center text-center ">
        <p className="text-white text-2xl font-normal font-exo2  ">
          {" "}
          {user.starkBalance.toLocaleString()} STRK{" "}
        </p>
      </div>

      <div className=" px-2 py-1 flex flex-row items-center justify-evenly gap-1 text-white w-full bg-[#1E2939] max-w-[250px] h-[70px] rounded-[10px]  ">
        <div>
          <p className=" font-light text-2xl font-openSans">
            {user.points.toLocaleString()}{" "}
          </p>
          <i className="font-light text-base font-exo2">POINTS</i>
        </div>
        <hr className="w-[1px] h-full bg-white " />
        <div>
          <p className=" font-light text-2xl font-openSans ">{user.rank.toLocaleString()} </p>
          <i className="font-light text-base font-exo2">RANK</i>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
