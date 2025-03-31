
const Footer = () => {
    return (
        <footer className="mt-auto bg-slate-900">
            <section className="flex justify-between items-center mx-10 mb-3 border-b-[1px]">
                <div className="flex justify-center items-center gap-4">
                    <div>
                        <img src="/icons/logo.png" alt="logo" className="" />
                    </div>
                    <div className="text-[#ededed]">
                        <h3>StarkFantsy League</h3>
                    </div>
                </div>

                <div className="text-[#ededed] mr-9">
                    <h3 className=" md:text-sm ml-2" >Community</h3>
                    <ul className="flex gap-3 text-2xl ">
                        <li ><a href="/"> <p>Logo</p> </a><span className="sr-only">GitHub</span></li>
                        <li><a href="/"> <p>Logo</p> </a><span className="sr-only">Telegram</span></li>
                        <li><a href="/"> <p>Logo</p> </a><span className="sr-only">Discord</span></li>
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
