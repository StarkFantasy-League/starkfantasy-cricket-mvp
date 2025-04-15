import { useAccount } from "@starknet-react/core";

export const useWallet = () => {
  const { account, address, status, isConnected } = useAccount();
  
  return {
    account,
    address,
    status,
    isConnected,
    
    // Helper function to format the address
    getFormattedAddress: () => {
      if (!address) return "";
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
  };
};