import { FaGithub, FaTelegramPlane, FaDiscord } from 'react-icons/fa';


const Footer = () => {
    return (
        <footer className="mt-auto bg-slate-900">
            <section className="flex justify-between items-center mx-10 mb-3 border-b-[1px]">
                <div className="flex justify-center items-center gap-4">
                    <div>
                        <img src="../src/assets/icons/logo.png" alt="logo" className="h-[120px] w-[120px]" />
                    </div>
                    <div className="text-[#ededed]">
                        <h3>StarkFantsy League</h3>
                    </div>
                </div>

                <div className="text-[#ededed] mr-9">
                    <h3 className=" md:text-sm ml-2 mb-5" >Community</h3>
                    <ul className="flex gap-3 text-2xl ">
                        <li>
                            <a href="https://github.com/StarkFantasy-League/starkfantasy-cricket-mvp" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <FaGithub />
                            </a>
                        </li>
                        <li>
                            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                                <FaTelegramPlane />
                            </a>
                        </li>
                        <li>
                            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                                <FaDiscord />
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
            <div className="flex text-[#ededed] justify-center items-center pb-5">
                <small>Copyright &copy; 2025 - Starkfantasy League</small>
            </div>
        </footer>
    );
};

export default Footer;
