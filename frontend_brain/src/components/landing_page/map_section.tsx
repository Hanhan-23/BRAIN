"use client";

import { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { 
  ArrowsOutIcon,
  ArrowsInIcon,
} from "@phosphor-icons/react";

import { Button } from "../ui/button"
import { CardRekomendasiItemUtama } from "@/types/masyarakattypes/utamatype";

    const MapComponent = ({item} : {item: CardRekomendasiItemUtama[]}) => {
      const batamCenter = { 
          lat: 1.0452, 
          lng: 104.0305 
      };

    const markers = item;

    const MapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const getMarkerIcon = (status: string) => {
    switch (status) {
      case "tinggi":
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
      case "sedang":
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      case "rendah":
        return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
      default:
        return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"; 
    }
  };

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-2 md:text-3xl lg:text-5xl">
                <a aria-label="Link to Section">Peta Persebaran</a>
            </h1>
            <p className="text-[10px] max-w-md md:text-xs lg:text-sm mb-6">Visualisasi geografis atas laporan kerusakan jalan yang dihimpun melalui partisipasi publik.</p>
            <div className="flex relative">
                <APIProvider apiKey={MapsKey ?? ''}>
                  <div className="border-none overflow-hidden shadow-xl w-full h-72 md:h-[512px] rounded-4xl">
                    <Map
                      style={{ width: "100%", height: "100%" }}
                      defaultCenter={batamCenter}
                      mapTypeId="hybrid"
                      defaultZoom={12}
                      gestureHandling="greedy"
                      disableDefaultUI={true}
                      mapId="YOUR_MAP_ID"
                    >
                      {markers.map((marker) => (
                        <Marker
                          key={marker['id_rekomendasi']}
                          position={{ lat: marker['latitude'], lng: marker['longitude'] }}
                          title={marker['judul_laporan']}
                            icon={{
                            url: getMarkerIcon(marker["status_urgent"]),
                          }}
                        />
                      ))}
                    </Map>
                  </div>
                </APIProvider>
            </div>
        </div>
    )
}

export default MapComponent;