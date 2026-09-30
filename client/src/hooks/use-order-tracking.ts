"use client";
import {useEffect,useState} from "react";
import { socket } from "@/lib/socket";
import { getAccessToken } from "@/lib/authTest";

export interface TrackingLocation {
  latitude: number;
  longitude: number;
  recordedAt: string;
}

export const useOrderTracking=(orderId: string)=> {
  const [partnerLocation,setPartnerLocation] = useState<TrackingLocation | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const accessToken = getAccessToken();
    console.log(accessToken);
    
    if (!orderId || !accessToken) {
      return;
    }
    socket.auth = { token: accessToken }; 
    function handleConnect() {
      console.log("Socket connected:",socket.id);
      setIsConnected(true);
      socket.emit("join_order_tracking",{orderId});
    }
    function handleDisconnect() {
      console.log("Socket disconnected");
      setIsConnected(false);
    }
    function handleTrackingUpdate(update: {
        orderId: string;
        latitude: number;
        longitude: number;
        recordedAt: string;
      }) {
      console.log("📍 RECEIVED tracking_update:", update); // add this line
      if (update.orderId !== orderId) {
        console.log("⚠️ orderId mismatch. Expected:", orderId, "Got:", update.orderId);
        return;
      }
      setPartnerLocation({
        latitude: update.latitude,
        longitude: update.longitude,
        recordedAt:
        update.recordedAt,
      });
    }
    function handleTrackingError(response: {message: string;}) {
      setError(response.message);
    }

    function handleConnectError(err: Error) {
  console.log("Socket connect_error:", err.message);
  setError(err.message);
  setIsConnected(false);
}


  socket.on("connect_error", handleConnectError);

    socket.on("connect",handleConnect);
    socket.on("disconnect",handleDisconnect);
    console.log("👂 Registering tracking_update listener for orderId:", orderId);
    socket.on("tracking_update",handleTrackingUpdate);
    socket.on("tracking_error",handleTrackingError);
    // If already connected, join immediately.
    if (socket.connected) {
      socket.emit("join_order_tracking",{orderId});
    } else {
      socket.connect();
    }
    return () => {

      socket.off("connect_error", handleConnectError);

      socket.off("connect",handleConnect);
      socket.off("disconnect",handleDisconnect);
      socket.off("tracking_update",handleTrackingUpdate);
      socket.off("tracking_error",handleTrackingError);
      socket.disconnect();
    };
  }, [orderId]);
  return {
    partnerLocation,
    isConnected,
    error
  };
}