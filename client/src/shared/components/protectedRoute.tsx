import { useAccount } from "@starknet-react/core";
import { Navigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";

const DELAY = 800; // milliseconds

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isConnected } = useAccount();
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, DELAY);

    return () => clearTimeout(timer);
  }, []);

  if (isWaiting) {
    return <div className="text-center mt-10">Verificando conexión a la wallet...</div>;
  }

  if (!isConnected) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
