"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";

export const SocketIndicator = () => {
  const { isConnected, transport } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-slate-500 text-white border-none">
        <WifiOff className="h-4 w-4 mr-2" />
        Disconnected
      </Badge>
    );
  }

  if (transport === "polling") {
    return (
      <Badge variant="outline" className="bg-yellow-600 text-white border-none">
        <Wifi className="h-4 w-4 mr-2" />
        Live: Polling
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-emerald-600 text-white border-none">
      <Wifi className="h-4 w-4 mr-2" />
      Live: Real-time
    </Badge>
  );
};
