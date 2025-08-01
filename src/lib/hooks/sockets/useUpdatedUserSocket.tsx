import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { API_URL } from "@/constants/api/public-api-url";

const socket = io(API_URL);

export function useUpdatedUserSocket(onUserUpdated: () => void) {
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const handleUpdateUser = () => {
      if (mountedRef.current) {
        onUserUpdated();
      }
    };

    socket.on("userUpdated", handleUpdateUser);
    
    return () => {
      mountedRef.current = false;
      socket.off("userUpdated", handleUpdateUser);
    };
  }, [onUserUpdated]);
}
