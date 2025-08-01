import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { API_URL } from "@/constants/api/public-api-url";

const socket = io(API_URL);

export function useDeletedUserSocket(onUserDeleted: () => void) {
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const handleDeleteUser = () => {
      if (mountedRef.current) {
        onUserDeleted();
      }
    };

    socket.on("userDeleted", handleDeleteUser);
    
    return () => {
      mountedRef.current = false;
      socket.off("userDeleted", handleDeleteUser);
    };
  }, [onUserDeleted]);
}
