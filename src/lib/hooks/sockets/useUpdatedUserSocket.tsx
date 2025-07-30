import { useEffect } from "react";
import { io } from "socket.io-client";
import { API_URL } from "@/constants/api/public-api-url";

const socket = io(API_URL);

export function useUpdatedUserSocket(onUserUpdated: () => void) {
  useEffect(() => {
    socket.on("userUpdated", onUserUpdated);
    return () => {
      socket.off("userUpdated", onUserUpdated);
    };
  }, [onUserUpdated]);
}
