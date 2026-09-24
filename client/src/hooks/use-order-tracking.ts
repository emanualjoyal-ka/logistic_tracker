// "use client";

// import { useEffect } from "react";
// import { socket } from "@/lib/socket";

// interface TrackingUpdate {
//   orderId: string;
//   latitude: number;
//   longitude: number;
//   recordedAt: string;
// }

// export const useOrderTracking=(orderId: string,onLocationUpdate: (update: TrackingUpdate) => void)=> {
//   useEffect(() => {
//     if (!orderId) {
//       return;
//     }
//     socket.connect();
//     // Listen for successful room joining.
//     const handleJoined = (data: {orderId: string;}) => {
//       console.log("Joined tracking:",data.orderId);
//     };
//     // Listen for location updates.
//     const handleTrackingUpdate = (update: TrackingUpdate) => {
//       onLocationUpdate(update);
//     };
//     // Listen for errors.
//     const handleTrackingError = (error: { message: string }) => {
//       console.error("Tracking error:",error.message);
//     };
//     socket.on("tracking_joined",handleJoined);
//     socket.on("tracking_update",handleTrackingUpdate);
//     socket.on("tracking_error",handleTrackingError);
//     // Ask server to join this order's room.
//     socket.emit("join_order_tracking",{orderId});
//     return () => {
//       socket.off("tracking_joined",handleJoined);
//       socket.off("tracking_update",handleTrackingUpdate);
//       socket.off("tracking_error",handleTrackingError);
//       socket.disconnect();
//     };
//   },[orderId, onLocationUpdate]);
// }


// "use client";

// import { useEffect,useState } from "react";
// import { socket } from "@/lib/socket"; // Make sure inside this file it targets http://localhost:5000!

// interface TrackingUpdate {
//   orderId: string;
//   latitude: number;
//   longitude: number;
//   recordedAt: string;
// }

// export const useOrderTracking = (orderId: string, onLocationUpdate: (update: TrackingUpdate) => void) => {
//   useEffect(() => {
//     if (!orderId) return;

//     // 1. Force establish connection manually if disconnected
//     if (!socket.connected) {
//       socket.connect();
//     }

//     console.log("🔌 Attempting to join tracking room for:", orderId);

//     // 2. Event Handler Definitions
//     const handleConnect = () => {
//       console.log("✅ Socket connected! Requesting room join...");
//       socket.emit("join_order_tracking", { orderId });
//     };

//     const handleJoined = (data: { orderId: string }) => {
//       console.log("🎉 Successfully joined backend tracking room for:", data.orderId);
//     };

//     const handleTrackingUpdate = (update: TrackingUpdate) => {
//       console.log("📥 Raw socket packet received from server:", update);
//       // Ensure the incoming update matches this specific order page
//       if (update.orderId === orderId) {
//         onLocationUpdate(update);
//       } else {
//         console.warn("⚠️ Received location update for a different order ID:", update.orderId);
//       }
//     };

//     const handleTrackingError = (error: { message: string }) => {
//       console.error("❌ Backend Tracking Error:", error.message);
//     };

//     // 3. Register Event Listeners
//     socket.on("connect", handleConnect);
//     socket.on("tracking_joined", handleJoined);
//     socket.on("tracking_update", handleTrackingUpdate);
//     socket.on("tracking_error", handleTrackingError);

//     // If socket is already connected (due to React strict double render), emit immediately
//     if (socket.connected) {
//       socket.emit("join_order_tracking", { orderId });
//     }

//     // 4. Cleanup on unmount
//     return () => {
//       console.log("🧹 Cleaning up socket listeners for order:", orderId);
//       socket.off("connect", handleConnect);
//       socket.off("tracking_joined", handleJoined);
//       socket.off("tracking_update", handleTrackingUpdate);
//       socket.off("tracking_error", handleTrackingError);
//     };
//   }, [orderId, onLocationUpdate]);
// };

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