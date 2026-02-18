"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO, Socket } from "socket.io-client";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Notification } from "@/lib/types";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  transport: string;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  transport: "none",
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket] = useState(() =>
    ClientIO(process.env.NEXT_PUBLIC_SITE_URL || "", {
      path: "/api/socket/io",
      addTrailingSlash: false,
      autoConnect: false,
    }),
  );
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("none");

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (rawTransport: { name: string }) => {
        setTransport(rawTransport.name);
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
      setTransport("none");
    });

    socket.on(
      "notification:new",
      (notification: Omit<Notification, "id" | "createdAt" | "read">) => {
        useNotificationStore.getState().addNotification(notification);
      },
    );

    socket.connect();

    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, transport }}>
      {children}
    </SocketContext.Provider>
  );
};
