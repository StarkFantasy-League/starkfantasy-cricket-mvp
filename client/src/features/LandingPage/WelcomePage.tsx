import { motion } from "framer-motion";
import Image from "../../shared/components/image";
import Button from "../../shared/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";
import { useDojoSDK } from "@dojoengine/sdk/react";
import { addAddressPadding } from "starknet";
import ControllerConnectButton from "../CartridgeController/ControllerConnectButton";
import useAppStore from "../../shared/context/store";
import { fetchUserData } from "../../shared/utils/dojoUtils";

export default function Home() {
  const navigate = useNavigate();
  const { isConnected, status, account } = useAccount();
  const [connectionChecked, setConnectionChecked] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const { client } = useDojoSDK();
  const [isSpawning, setIsSpawning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Usar el estado de Zustand
  const { currentUser, setCurrentUser } = useAppStore();

  // Efecto para cargar los datos del usuario cuando se conecta
  useEffect(() => {
    const loadUserData = async () => {
      if (isConnected && account) {
        setIsLoading(true);
        try {
          // Obtener datos crudos
          const rawUserData = await fetchUserData(account);
          console.log("Datos crudos del usuario:", rawUserData);
          
          // Obtener datos procesados a través del cliente
          const clientUserData = await client.user.getUserData(account);
          console.log("Datos del usuario desde client:", clientUserData);
          
          // Verificar si el usuario existe utilizando una validación similar a Tamagotchi
          if (clientUserData && 
              clientUserData.address && 
              addAddressPadding(clientUserData.address) !== addAddressPadding('0x0')) {
            console.log("¡Usuario existente encontrado!");
            setCurrentUser(clientUserData);
          } else {
            console.log("Usuario no encontrado o modelo 'zero'");
            setCurrentUser(null);
          }
        } catch (error) {
          console.error("Error al cargar datos del usuario:", error);
          setCurrentUser(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [isConnected, account, client, setCurrentUser]);
  
  // Efecto para marcar la conexión como verificada
  useEffect(() => {
    if (status !== "connecting") {
      setConnectionChecked(true);
    }
  }, [status]);

  // Manejar click en "Iniciar Aventura"
  const handleStartAdventure = useCallback(async () => {
    if (!isConnected || !account) {
      alert("Por favor conecta tu wallet primero");
      return;
    }

    try {
      setIsSpawning(true);
      
      // Verificar si el usuario existe usando el estado de Zustand
      const userExists = currentUser && 
                        currentUser.address && 
                        addAddressPadding(currentUser.address) !== addAddressPadding('0x0');
      
      console.log("¿El usuario existe?", userExists, "Datos:", currentUser);
      
      if (!userExists) {
        console.log("Usuario no existe. Creando nuevo usuario...");
        
        // Llamada para crear usuario
        const spawnResult = await client.user.spawnUser(account);
        console.log("Resultado de crear usuario:", spawnResult);
        
        // Esperar a que se procese la transacción (como en Tamagotchi)
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        // Recargar los datos del usuario después de la creación
        const updatedUser = await client.user.getUserData(account);
        console.log("Datos actualizados después de spawn:", updatedUser);
        setCurrentUser(updatedUser);
      } else {
        console.log("Usuario ya existe. Cargando datos del juego...");
      }
      
      // Navegar a la página del juego
      setHasNavigated(true);
      navigate("/tournaments/indianpremierleague");
      
    } catch (error) {
      console.error("Error:", error);
      alert("Error al iniciar la aventura. Por favor intenta de nuevo.");
    } finally {
      setIsSpawning(false);
    }
  }, [isConnected, account, currentUser, client, navigate, setCurrentUser]);
  
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
              StarkFantasy <span className="text-orange-500">League</span>
            </h1>
            <p className="mt-6">
              Experience the future of fantasy sports with cutting-edge blockchain technology
            </p>
            
            {connectionChecked && !isLoading && (
              isConnected ? (
                <Button 
                  variant="primary" 
                  onClick={() => {
                    if (isSpawning || isLoading) return;
                    handleStartAdventure();
                  }}
                  className="mt-6 mx-auto sm:mx-0"
                >
                  {isSpawning ? 'Creando Manager...' : 'Iniciar Aventura'}
                </Button>
              ) : (
                <div className="mt-6 mx-auto sm:mx-0">
                  <ControllerConnectButton 
                    onConnectionAttempt={() => setHasNavigated(false)}
                    onConnectionSuccess={() => {
                      // Solo carga los datos, no navega automáticamente
                      console.log("Conexión exitosa");
                    }}
                  />
                </div>
              )
            )}
            
            {/* Indicador de carga mientras verifica el usuario */}
            {isLoading && (
              <div className="mt-6 text-white text-center">
                Cargando datos del manager...
              </div>
            )}
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
            <Image src="../src/assets/welcomepageImages/Icon.png" alt="Icon" className="sm:w-auto" />
          </motion.div>
          <div className="text-white text-center sm:text-right w-full sm:w-[550px] grow-[3]">
            <h2 className="text-4xl lg:text-5xl tracking-wider mb-4">What is Stark Fantasy League?</h2>
            <p>
              An innovative Web3 <span className="text-orange-500">Fantasy Sports</span> game where players assemble virtual teams, compete in tournaments, and earn rewards.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center max-w-[90%] sm:max-w-[80%] mx-auto mt-10 gap-6 relative">
          <div className="lg:relative"> {/* Relative container for absolute positioning */}
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
              <h2 className="mb-2 text-4xl lg:text-5xl">Start your Journey</h2>
              <p className=" max-w-[80%] sm:max-w-full leading-normal">
                Create your profile, connect your wallet, and build your dream team as a professional manager. <br />
                Get into the tournaments and fight to see who is the best! The winners will get rewarded for their skills.
              </p>
              <Button
                variant="primary"
                onClick={() => navigate("/tournaments/indianpremierleague")}
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
            <Image src="../src/assets/welcomepageImages/vector.png" alt="Vector" width={500} height={500} className="" />
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
              desc: "Enjoy fast and cost-efficient transactions powered by Starknet's Layer 2 scaling solution."
            },
            {
              img: "securitycars1.png",
              title: "Decentralization and Security",
              desc: "Your assets and game data are secured on a reliable, decentralized blockchain network."
            },
            {
              img: "securitycars2.png",
              title: "Transparency and Ownership",
              desc: "Every transaction is verifiable on-chain, ensuring fair play and full user control over digital assets."
            }
          ].map(({ img, title, desc }) => (
            <motion.div
              key={desc}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full sm:w-[435px] border-orange-500 border-8 rounded-2xl bg-indigo-900"
            >
              <Image src={`../src/assets/welcomepageImages/${img}`} alt={desc} width={350} height={200} className="w-full" />
              <div className="text-white py-4">
                <h3 className="font-medium text-center py-4 tracking-wide px-4">{title}</h3>
                <p className="mx-5">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-9">
          <Button variant="secondary" onClick={() => console.log("Learn about Starknet")} className="mt-6 px-8 py-6">
            Learn about Starknet
          </Button>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-slate-950 text-white flex flex-col justify-center items-center py-16 px-4">
        <h2 className="mb-6 text-center">What are you waiting for?</h2>

        <div className="flex flex-col sm:flex-row gap-10 max-w-4xl mx-auto text-center sm:text-left">
          {/* Left Section */}
          <div className="flex-1">
            <p>Start now by registering on our platform and join the Ultimate Fantasy Sports Experience!</p>
            <p className="mt-2">
              Build your dream team, compete with players worldwide, and earn real rewards—all powered by Starknet’s secure blockchain.
              Sign up now and start playing! 🚀
            </p>
            <div className="mt-6 flex justify-center">
              <Button variant="primary" onClick={() => console.log("Register Now")}>
                Register Now
              </Button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1">
            <p>
              Want to learn more about us? All you need is right here! From the game rules to the complete working of the on-chain system.
            </p>
            <div className=" w-full mt-4 flex justify-center flex-col items-center gap-3">
              <Button variant="secondary" onClick={() => navigate("/about")}>
                About Us
              </Button>
              <Button variant="secondary" onClick={() => navigate("/rules")}>
                View Our Rules
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}
