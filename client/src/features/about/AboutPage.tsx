import Footer from "../../shared/components/footer";
import NavBar from "../../shared/components/header/components/navbar";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
    const navigate = useNavigate();
    return (
        <div className="bg-slate-950 w-full">
            <NavBar />

            <div className="text w-[65%] mx-auto mb-[2rem] mt-[4.3rem]">
                <h1 className="text-white text-4xl mb-4 font-bold">About Us</h1>

                <h3 className="text-white text-2xl mb-3 font-semibold">
                    Welcome to the Future of Fantasy Sport
                </h3>

                <p className="text-white text-[15px] m">
                    Our <span className="text-orange-500">Fantasy Sport
                    </span> on <span className="text-orange-500">Starknet</span>{" "}
                    is a cutting-edge Web3 gaming platform that redefines the
                    fantasy cricket experience by integrating blockchain
                    technology. Our mission is to create a transparent, source,
                    and decentralized ecosystem where criket enthusiasts can
                    build their dream teams, complete in thrilling tournaments,
                    and earn rewards based on real-world criket performance.
                </p>
            </div>

            <div className="text w-[65%] sm:mx-auto mb-[2rem] sm:flex sm:justify-center sm:items-center ml-[3rem]">
                <div className="w-[75%] mx-auto">
                    <h3 className="text-white text-2xl mb-3 font-semibold">
                        Know the future? Make your bet
                    </h3>

                    <p className="text-white text-[15px] m">
                        Our system allows users to participate in{" "}
                        <span className="text-orange-500">pools</span> where
                        they can bet on the final score of a game or the
                        performance of individual players. The goal is to create
                        an addictive yet fun experience, where users can
                        securely gain rewards while enjoying the excitement of
                        criket.
                    </p>
                </div>
                <div className="sm:w-[30%] w-full ">
                    <img src="/Frame 68.png" alt="" className="" />
                </div>
            </div>

            <div className="text w-[65%] mx-auto mb-[2rem]">
                <h3 className="text-white text-2xl mb-3 font-semibold">
                    Join the Revolution
                </h3>

                <p className="text-white text-[15px] mb-7">
                    <span className="text-orange-500">StarkFantasy League</span>{" "}
                    is more than just agame - it's a movement towards a{" "}
                    <span className="text-orange-500">decentralized</span>,{" "}
                    <span className="text-orange-500">fair</span>, and{" "}
                    <span className="text-orange-500">engaging</span> gaming
                    ecosystem. Whether you're a casual fan or a dedicated
                    strategist, there's a place for you in our community.
                </p>

                <button 
                className="text-white hover:bg-orange-500 bg-orange-600 w-36 cursor-pointer rounded text-sm py-1 " onClick={() => navigate("/tournaments/indianpremierleague")}>
                    Start Now
                </button>
            </div>

            <Footer />
        </div>
    );
}
