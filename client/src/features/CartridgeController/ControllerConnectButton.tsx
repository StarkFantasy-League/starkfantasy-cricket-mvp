import { useConnect, useAccount, useDisconnect, Connector } from "@starknet-react/core";
import Button from "../../shared/components/ui/button";
import { useEffect, useRef } from "react";

const DELAY = 500; // milliseconds

interface ControllerConnectButtonProps {
  onConnectionAttempt?: () => void;
  onConnectionSuccess?: () => void;
}

const ControllerConnectButton = ({ 
  onConnectionAttempt = () => {}, 
  onConnectionSuccess = () => {} 
}: ControllerConnectButtonProps) => {
  const { connect, connectors } = useConnect();
  const { status, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  
  // Use a ref to track the previous connection state
  const prevConnectedRef = useRef(false);

  // Watch for successful connections
  useEffect(() => {
    // Only trigger if we're newly connected (wasn't connected before)
    if (isConnected && !prevConnectedRef.current) {
      // Small delay to ensure UI has updated
      setTimeout(() => {
        onConnectionSuccess();
      }, DELAY);
    }
    
    // Update the previous state reference
    prevConnectedRef.current = isConnected ?? false;
  }, [isConnected, status, onConnectionSuccess]);

  const handleConnect = async (connector: Connector) => {
    onConnectionAttempt();
    
    try {
      // This will trigger the Cartridge UI to appear
      await connect({ connector });
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
            Connect Controller
          </Button>
        )
      ))}
    </>
  );
};

export default ControllerConnectButton;
