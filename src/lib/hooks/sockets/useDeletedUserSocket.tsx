import { useEffect } from "react";
import { io } from "socket.io-client";
import { API_URL } from "@/constants/api/public-api-url";

const socket = io(API_URL);

export function useDeletedUserSocket(onUserDeleted: () => void) {
  useEffect(() => {
    socket.on("userDeleted", onUserDeleted);
    return () => {
      socket.off("userDeleted", onUserDeleted);
    };
  }, [onUserDeleted]);
}
