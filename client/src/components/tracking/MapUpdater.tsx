"use client";

import { useEffect } from "react";
import {useMap} from "react-leaflet";

interface MapUpdaterProps {
  latitude: number;
  longitude: number;
}

const MapUpdater=({latitude,longitude}: MapUpdaterProps)=> {
  const map = useMap();
  useEffect(() => {
    map.setView([latitude, longitude],map.getZoom(),{animate: true});
  }, [latitude,longitude,map]);
  return null;
}

export default MapUpdater;