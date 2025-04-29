import { motion } from "framer-motion";
import Image from "../../shared/components/image";
import Button from "../../shared/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";
import { useAccount } from "@starknet-react/core";
import { useDojoSDK } from "@dojoengine/sdk/react";
import ControllerConnectButton from "../CartridgeController/ControllerConnectButton";
import { useUser } from "../../shared/hooks/useUser";

export default function Home() {
    const navigate = useNavigate();
    const { isConnected, status, account } = useAccount();
    const { client } = useDojoSDK();
    const { user } = useUser();

    const [isSpawning, setIsSpawning] = useState(false);

    useEffect(() => {
        if (user) {
            console.log("🧙‍♂️ User data:", user);
        }
    }, [user]);

    const handleStartAdventure = useCallback(async () => {
        if (!isConnected || !account) {
            alert("Please connect yout wallet first");
            return;
        }

        try {
            setIsSpawning(true);

            const userExists = user && user.address && user.address !== "0x0";
            console.log("User already exists?", userExists);

            if (!userExists) {
                console.log("User does not exist, spawning...");
                await client.user.spawnUser(account);
                await new Promise((resolve) => setTimeout(resolve, 2500));
            } else {
                console.log("User already exists, continuing...");
            }

            navigate("/tournaments/indianpremierleague");
        } catch (error) {
            console.error("Error spawning user:", error);
            alert("Error spawning user, check console for details.");
        } finally {
            setIsSpawning(false);
        }
    }, [isConnected, account, user, client, navigate]);

    return (
        <div className="bg-slate-950">
            {/* Hero Section */}
            <section className="relative w-full h-screen">
                <div className="absolute inset-0">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="../src/assets/welcomepageImages/Background.png"
                            alt="Background"
                            className="object-cover -z-10"
                        />
                    </motion.div>
                </div>

                <div className="absolute left-0 right-0 bottom-[100px] flex flex-col-reverse items-center md:flex-row md:justify-between max-w-[90%] sm:max-w-[85%] lg:max-w-[70%] mx-auto text-center sm:text-left">
                    <div className="text-white mt-4 sm:mt-0">
                        <h1 className="sm:text-5xl font-bold sm:w-[28rem] md:text-6xl">
                            StarkFantasy{" "}
                            <span className="text-orange-500">League</span>
                        </h1>
                        <p className="mt-6">
                            Experience the future of fantasy sports with
                            cutting-edge blockchain technology
                        </p>

                        {status !== "connecting" &&
                            (isConnected ? (
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        if (!isSpawning) handleStartAdventure();
                                    }}
                                    className="mt-6 mx-auto sm:mx-0"
                                >
                                    {isSpawning
                                        ? "Creating User..."
                                        : "Start Adventure"}
                                </Button>
                            ) : (
                                <div className="mt-6 mx-auto sm:mx-0">
                                    <ControllerConnectButton
                                        onConnectionAttempt={() => {}}
                                        onConnectionSuccess={() => {
                                            console.log(
                                                "Cartridge Controller connection successful"
                                            );
                                        }}
                                    />
                                </div>
                            ))}
                    </div>

                    <motion.div
                        className="w-[500px] h-[500px] flex items-center justify-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="../src/assets/welcomepageImages/starkFantasyLogo.png"
                            alt="Logo"
                            className="w-full"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Info Section */}

            <section className="bg-slate-950 py-16 px-4">
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between max-w-[90%] sm:max-w-[85%] lg:max-w-[70%] mx-auto gap-6">
                    <motion.div
                        className="max-w-[600px] grow-[1] flex items-center justify-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="../src/assets/welcomepageImages/Icon.png"
                            alt="Icon"
                            className="sm:w-auto"
                        />
                    </motion.div>
                    <div className="text-white text-center sm:text-right w-full sm:w-[550px] grow-[3]">
                        <h2 className="text-4xl lg:text-5xl tracking-wider mb-4">
                            What is Stark Fantasy League?
                        </h2>
                        <p>
                            An innovative Web3{" "}
                            <span className="text-orange-500">
                                Fantasy Sports
                            </span>{" "}
                            game where players assemble virtual teams, compete
                            in tournaments, and earn rewards.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center max-w-[90%] sm:max-w-[80%] mx-auto mt-10 gap-6 relative">
                    <div className="lg:relative">
                        {" "}
                        {/* Relative container for absolute positioning */}
                        {/* Image */}
                        <motion.div
                            className="h-[]"
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src="../src/assets/welcomepageImages/Group4.png"
                                alt="Group"
                                width={900}
                                height={200}
                                className="hidden lg:block"
                            />
                        </motion.div>
                        {/* Text Overlay */}
                        <div className="lg:absolute lg:left-[210px] inset-0 flex flex-col text-sm justify-center items-center sm:items-start text-white text-center sm:text-left">
                            <h2 className="mb-2 text-4xl lg:text-5xl">
                                Start your Journey
                            </h2>
                            <p className=" max-w-[80%] sm:max-w-full leading-normal">
                                Create your profile, connect your wallet, and
                                build your dream team as a professional manager.{" "}
                                <br />
                                Get into the tournaments and fight to see who is
                                the best! The winners will get rewarded for
                                their skills.
                            </p>
                            <Button
                                variant="primary"
                                onClick={() =>
                                    navigate("/tournaments/indianpremierleague")
                                }
                                className="mt-6 mx-auto sm:mx-0 px-6 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
                            >
                                Become a Manager
                            </Button>
                        </div>
                    </div>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="../src/assets/welcomepageImages/vector.png"
                            alt="Vector"
                            width={500}
                            height={500}
                            className=""
                        />
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-slate-900 pb-11 px-4">
                <div className="text-center py-8 ">
                    <h2 className="text-white leading-snug">
                        Powering Fantasy Sports with <br />
                        <span className="text-orange-500 mt-3">Starknet</span>
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-16 max-w-[90%] sm:max-w-full mx-auto">
                    {[
                        {
                            img: "transactionlogo1.png",
                            title: "Scalability and Low Fees",
                            desc: "Enjoy fast and cost-efficient transactions powered by Starknet's Layer 2 scaling solution.",
                        },
                        {
                            img: "securitycars1.png",
                            title: "Decentralization and Security",
                            desc: "Your assets and game data are secured on a reliable, decentralized blockchain network.",
                        },
                        {
                            img: "securitycars2.png",
                            title: "Transparency and Ownership",
                            desc: "Every transaction is verifiable on-chain, ensuring fair play and full user control over digital assets.",
                        },
                    ].map(({ img, title, desc }) => (
                        <motion.div
                            key={desc}
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="w-full sm:w-[435px] border-orange-500 border-8 rounded-2xl bg-indigo-900"
                        >
                            <Image
                                src={`../src/assets/welcomepageImages/${img}`}
                                alt={desc}
                                width={350}
                                height={200}
                                className="w-full"
                            />
                            <div className="text-white py-4">
                                <h3 className="font-medium text-center py-4 tracking-wide px-4">
                                    {title}
                                </h3>
                                <p className="mx-5">{desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center mt-9">
                    <Button
                        variant="secondary"
                        onClick={() => console.log("Learn about Starknet")}
                        className="mt-6 px-8 py-6"
                    >
                        Learn about Starknet
                    </Button>
                </div>
            </section>
            {/* About Section */}
            <section className="bg-slate-950 max-w-7xl mx-auto py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12 ">
                    {/* Left content column */}
                    <div className="w-full space-y-6">
                        <div className="max-w-2xl">
                            <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 relative">
                                <span className="relative z-10">About Us</span>
                                <span className="absolute bottom-0 left-0 w-16 h-1 bg-orange-500"></span>
                            </h2>

                            <h3 className="text-white text-xl md:text-2xl mb-4 font-semibold">
                                Welcome to the Future of Fantasy Sport
                            </h3>

                            <p className="text-gray-300 text-base leading-relaxed">
                                Our{" "}
                                <span className="text-orange-500 font-medium">
                                    Fantasy Sport
                                </span>{" "}
                                on{" "}
                                <span className="text-orange-500 font-medium">
                                    Starknet
                                </span>{" "}
                                is a cutting-edge Web3 gaming platform that
                                redefines the fantasy cricket experience by
                                integrating blockchain technology. Our mission
                                is to create a transparent, secure, and
                                decentralized ecosystem where cricket
                                enthusiasts can build their dream teams, compete
                                in thrilling tournaments, and earn rewards based
                                on real-world cricket performance.
                            </p>
                        </div>

                        <div className="max-w-2xl">
                            <div className="flex flex-col">
                                <h3 className="text-white text-xl md:text-2xl mb-4 font-semibold">
                                    Know the future? Make your bet
                                </h3>

                                <p className="text-gray-300 text-base leading-relaxed">
                                    Our system allows users to participate in{" "}
                                    <span className="text-orange-500 font-medium">
                                        pools
                                    </span>{" "}
                                    where they can bet on the final score of a
                                    game or the performance of individual
                                    players. The goal is to create an addictive
                                    yet fun experience, where users can securely
                                    gain rewards while enjoying the excitement
                                    of cricket.
                                </p>
                            </div>
                        </div>

                        <div className="max-w-2xl">
                            <h3 className="text-white text-xl md:text-2xl mb-4 font-semibold">
                                Join the Revolution
                            </h3>

                            <p className="text-gray-300 text-base leading-relaxed mb-8">
                                <span className="text-orange-500 font-medium">
                                    StarkFantasy League
                                </span>{" "}
                                is more than just a game - it's a movement
                                towards a{" "}
                                <span className="text-orange-500 font-medium">
                                    decentralized
                                </span>
                                ,{" "}
                                <span className="text-orange-500 font-medium">
                                    fair
                                </span>
                                , and{" "}
                                <span className="text-orange-500 font-medium">
                                    engaging
                                </span>{" "}
                                gaming ecosystem. Whether you're a casual fan or
                                a dedicated strategist, there's a place for you
                                in our community.
                            </p>
                        </div>
                    </div>

                    {/* Right image column */}
                    <div className="w-full h-full flex justify-center items-center">
                        <img
                            src="/Frame 68.png"
                            alt="Betting illustration"
                            className="relative z-10 w-full h-auto rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            </section>
            {/* Call to Action Section */}
            <section className="bg-slate-950 text-white flex flex-col justify-center items-center py-16 px-4">
                <h2 className="mb-6 text-center">What are you waiting for?</h2>

                <div className="flex flex-col sm:flex-row gap-10 max-w-4xl mx-auto text-center sm:text-left">
                    {/* Left Section */}
                    <div className="flex-1">
                        <p>
                            Start now by registering on our platform and join
                            the Ultimate Fantasy Sports Experience!
                        </p>
                        <p className="mt-2">
                            Build your dream team, compete with players
                            worldwide, and earn real rewards—all powered by
                            Starknet’s secure blockchain. Sign up now and start
                            playing! 🚀
                        </p>
                        <div className="mt-6 flex justify-center">
                            <Button
                                variant="primary"
                                onClick={() => console.log("Register Now")}
                            >
                                Register Now
                            </Button>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex-1">
                        <p>
                            Want to learn more about us? All you need is right
                            here! From the game rules to the complete working of
                            the on-chain system.
                        </p>
                        <div className=" w-full mt-4 flex justify-center flex-col items-center gap-3">
                            {/* <Button
                                variant="secondary"
                                onClick={() => navigate("/about")}
                            >
                                About Us
                            </Button> */}
                            <Button
                                variant="secondary"
                                onClick={() => navigate("/rules")}
                            >
                                View Our Rules
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
