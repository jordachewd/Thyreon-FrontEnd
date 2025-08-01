import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { API_URL } from "@/constants/api/public-api-url";

const socket = io(API_URL);

export function useNewUserSocket(onUserCreated: () => void) {
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const handleNewUser = () => {
      if (mountedRef.current) {
        onUserCreated();
      }
    };

    socket.on("userCreated", handleNewUser);
    
    return () => {
      mountedRef.current = false;
      socket.off("userCreated", handleNewUser);
    };
  }, [onUserCreated]);
}
