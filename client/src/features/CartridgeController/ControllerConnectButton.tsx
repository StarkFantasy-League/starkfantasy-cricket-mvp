import { useConnect, useAccount, useDisconnect, Connector } from "@starknet-react/core";
import Button from "../../shared/components/ui/button";

const ControllerConnectButton = ({ onConnectionAttempt = () => {} }) => {
  const { connect, connectors } = useConnect();
  const { status } = useAccount();
  const { disconnect } = useDisconnect();

  const handleConnect = async (connector: Connector) => {
    console.log("Connect button clicked");
    // Call the callback
    onConnectionAttempt();
    
    try {
      // This will trigger the Cartridge UI to appear
      await connect({ connector });
      console.log("Connect function called");
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <>
      {connectors.map((connector) => (
        status === "connected" ? (
          <Button 
            key={connector.id} 
            className="disconnect-button"
            onClick={() => {
              console.log("Disconnect button clicked");
              disconnect();
              localStorage.clear();
            }}
            variant="secondary"
          >
            Disconnect
          </Button>
        ) : (
          <Button
            key={connector.id}
            onClick={() => handleConnect(connector)}
            className="connect-button"
            variant="primary"
          >
            Connect Wallet
          </Button>
        )
      ))}
    </>
  );
};

export default ControllerConnectButton;