"use client";
import {MapContainer,TileLayer,Marker,Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapUpdater from "./MapUpdater";
import {Polyline} from "react-leaflet";
import "./leaflet-icons";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface DeliveryMapProps {
  pickup: Coordinates;
  partner: Coordinates;
  dropoff: Coordinates;
}

const DeliveryMap=({pickup,partner,dropoff}: DeliveryMapProps)=> {
  return (
    <MapContainer center={[partner.latitude,partner.longitude]} zoom={14} style={{
        height: "500px",
        width: "100%"}}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater latitude={partner.latitude} longitude={partner.longitude}/>
      <Marker position={[pickup.latitude,pickup.longitude]}>
        <Popup>Pickup location</Popup>
      </Marker>
      <Marker position={[partner.latitude,partner.longitude]}>
        <Popup>Delivery partner</Popup>
      </Marker>
      <Marker position={[dropoff.latitude,dropoff.longitude]}>
        <Popup>Drop-off location</Popup>
      </Marker>
      <Polyline positions={[
        [pickup.latitude,pickup.longitude],
        [partner.latitude,partner.longitude],
        [dropoff.latitude,dropoff.longitude]]}/>
    </MapContainer>
  );
}

export default DeliveryMap;