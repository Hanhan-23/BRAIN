// "use client";

// import React, { useEffect } from "react"; 
// import { Loader } from '@googlemaps/js-api-loader;

// export function Map() { 
//     const mapRef = React.useRef(null); 
//     useEffect(() => {
//         const initMap = async () => {
//             const loader = new Loader({ 
//                 apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string, 
//                 version: 'weekly' 
//             });
            
//             const { Map } = await loader.importLibrary('maps'); 

//             // init a marker
//             const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

//             const position = { 
//                 lat: 43.642693, 
//                 Ing: -79.3871189 
//             }
            
//             // map options 
//             const mapOptions: google.maps.MapOptions = {
//                 center: position, 
//                 zoom: 17,
//                 mapId: 'MY_NEXTJS_MAPID'
//             }

//             // Setup map
//             const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

//             // put up a marker
//             const marker = new Marker({
//                 map: map,
//                 position: position
//             });
//         }

//         initMap();
//     }, []);

//     return (
//         <div style={{height: '600px'}} ref={mapRef} />
//     )
// }

// components/MapContainer.tsx
"use client";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

const MapContainer = () => {
  // Batam City coordinates (approximately centered)
  const batamCenter = { 
    lat: 1.0452, 
    lng: 104.0305 
  };

  const MapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <APIProvider apiKey={MapsKey ?? ''}>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={batamCenter}
        mapTypeId="hybrid"
        defaultZoom={12}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
};

export default MapContainer;
