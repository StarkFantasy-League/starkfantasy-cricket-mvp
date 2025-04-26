import Footer from "../../shared/components/footer";
import NavBar from "../../shared/components/header/components/navbar";
import { useNavigate } from "react-router-dom";

export default function SupportPage() {
    const navigate = useNavigate();
    return (
        <div className="bg-slate-950 w-full">
            <NavBar />

            <div className="text w-[65%] mx-auto mb-[2rem] mt-[4.3rem]">
                <h1 className="text-white text-4xl mb-4 font-bold">Support</h1>

                <p className="text-white text-[15px] m">
                 We at StarkFantasy League are dedicated to providing you with an exceptional experience. if you encounter any issues or have any feedback, please don't hesitate to reach out to us at <a href="mailto:starkfantasyleague@gmail.com"><span className="text-orange-500">starkfantasyleague@gmail.com</span></a>. Our team is eager to assist you and ensure your satisfaction.
                   
                </p>
            </div>

            <div className="text w-[65%] mx-auto mb-[2rem] ">
                
                    <h3 className="text-white text-2xl mb-3 font-semibold">
                        Are you a contributor?
                    </h3>

                    <p className="text-white text-[15px] ">
                        As a continuously envoling project, StarkFantasy League thrives on contributions. If you're interested in lending your expertise, we warmly invite you to explore our <a href="/"> <span className="text-orange-500">GitHub repository</span></a>. Here, you'll find opportunities to collaborate and help shape the future of our platform
                    </p>
                    <p  className="text-white text-[15px] mt-3">
                        Effective coordination is key to our collective success. To facilitate seamless communication among contributors, we encourage you join <a href="/"> <span className="text-orange-500">Telegram</span></a> and <a href="/"> <span className="text-orange-500">Discord</span></a>. By particitating in these communities, you'll stay informed, share ideas, and work alongside fellow enthusiasts to enhance StarkFantasy League.
                    </p>
                    
               
            </div>

            <div className="text w-[65%] mx-auto mb-[2rem]">
                <h3 className="text-white text-2xl mb-3 font-semibold">
                    Are you ready?
                </h3>

                <p className="text-white text-[15px] mb-7">
                    Let's dive into the thrivilling and unpredictable world of fantsy sport - where every move counts and the stakes are anything but ordinary. Welcome to StarkFantasy League.
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