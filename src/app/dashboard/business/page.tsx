"use client"

import { Link, Star } from "lucide-react"
import { useEffect, useRef } from "react";

export default function BusinessPage() {

    const mapRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const infoWindowRef = useRef<HTMLDivElement>(null);

    // Load Google Maps JS dynamically
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAHdq8ochmwsT4ZkZ-hAx8feHth19H3vOA&libraries=places&callback=initMap`;
        script.async = true;
        window.initMap = initMap;
        document.head.appendChild(script);

        // Cleanup on unmount
        return () => {
            delete window.initMap;
        }
    }, []);

    // Initialize the map when the script loads
    function initMap() {
        if (!mapRef.current || !inputRef.current || !infoWindowRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
            center: { lat: -33.8688, lng: 151.2195 },
            zoom: 13,
        });

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
            fields: ["place_id", "geometry", "formatted_address", "name"],
        });

        autocomplete.bindTo("bounds", map);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputRef.current);

        const infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent(infoWindowRef.current);

        const marker = new google.maps.Marker({ map });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });

        autocomplete.addListener("place_changed", () => {
            infoWindow.close();
            const place = autocomplete.getPlace();
            console.log('infoWindowRef.current', place);
            if (!place.geometry || !place.geometry.location) return;

            map.setCenter(place.geometry.location);
            map.setZoom(17);

            marker.setPlace({
                placeId: place.place_id,
                location: place.geometry.location,
            });

            marker.setVisible(true);
            infoWindowRef.current.querySelector("#place-name")!.textContent = place.name;
            infoWindowRef.current.querySelector("#place-id")!.textContent = place.place_id;
            infoWindowRef.current.querySelector("#place-address")!.textContent = place.formatted_address || "";
            infoWindow.open(map, marker);
        });
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Business Setup</h1>
                <p className="text-gray-400 mt-2">Configure your business details and review link</p>
            </div>

            <div className="bg-[#252525] rounded-lg p-6 max-w-3xl space-y-6">

                <div>
                    <label className="block text-sm font-medium mb-2">Business Name</label>
                    <input type="text" className="w-full p-3 bg-[#333333] border border-gray-700 rounded-md" placeholder="Enter your business name" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Google Review Link</label>
                    <div className="flex">
                        <input type="text" className="flex-1 p-3 bg-[#333333] border border-gray-700 rounded-l-md" placeholder="Paste your Google review link" />
                        <button className="bg-[#333333] border border-l-0 border-gray-700 rounded-r-md px-4 flex items-center">
                            <Link className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Or find your Google Place ID below</p>
                </div>

                {/* Place ID Finder */}
                <div className="space-y-4">
                    <input ref={inputRef} className="controls p-3 w-full bg-[#333333] border border-gray-700 rounded-md" type="text" placeholder="Search your business to get Place ID" />
                    <div ref={mapRef} className="h-64 rounded-md" />
                    <div ref={infoWindowRef} className="text-sm text-gray-400 space-y-1">
                        <div><strong>Place Name:</strong> <span id="place-name" /></div>
                        <div><strong>Place ID:</strong> <span id="place-id" /></div>
                        <div><strong>Address:</strong> <span id="place-address" /></div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Review Page Preview</h3>
                    <div className="bg-[#333333] rounded-lg p-6 text-center">
                        <div className="mb-4">
                            <div className="h-16 w-16 bg-gray-700 rounded-full mx-auto mb-2"></div>
                            <h4 className="font-medium">Your Business Name</h4>
                        </div>
                        <p className="text-gray-400 mb-4">We'd love to hear your feedback!</p>
                        <div className="flex justify-center gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-8 w-8 text-yellow-500" />
                            ))}
                        </div>
                        <div className="bg-[#1a1a1a] p-3 rounded-md">
                            <p className="text-sm text-gray-400">Review page preview</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-black font-medium px-6 py-2 rounded-md">
                        Save Changes
                    </button>
                </div>

            </div>
        </>
    );
}
