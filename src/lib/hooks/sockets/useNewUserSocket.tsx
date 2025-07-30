import { useEffect } from "react";
import { io } from "socket.io-client";
import { API_URL } from "@/constants/api/public-api-url";

const socket = io(API_URL);

export function useNewUserSocket(onUserCreated: () => void) {
  useEffect(() => {
    socket.on("userCreated", onUserCreated);
    return () => {
      socket.off("userCreated", onUserCreated);
    };
  }, [onUserCreated]);
}
