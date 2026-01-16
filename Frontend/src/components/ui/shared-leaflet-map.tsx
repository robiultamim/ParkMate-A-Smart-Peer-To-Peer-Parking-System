import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Star, Clock } from 'lucide-react';
import { Button } from './button';

// Fix for default Leaflet markers in React
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Predictable coordinate generation based on address (Deterministic)
export const getCoordinatesFromAddress = (address: string, id: string) => {
    let hash = 0;
    const str = (address || id) + "salt-v2";
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    const centerLat = 37.7749;
    const centerLng = -122.4194;
    const latOffset = (hash % 100) / 1000;
    const lngOffset = ((hash >> 7) % 100) / 1000;
    return [centerLat + latOffset, centerLng + lngOffset] as [number, number];
};

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

interface SharedLeafletMapProps {
    spots: any[];
    onNavigate?: (page: string, params?: any) => void;
    getBookingStatus?: (spaceId: string) => string | null;
    center: [number, number];
    zoom: number;
    height?: string;
    className?: string;
}

export function SharedLeafletMap({
    spots,
    onNavigate,
    getBookingStatus,
    center,
    zoom,
    height = '100%',
    className = ""
}: SharedLeafletMapProps) {
    return (
        <div style={{ height }} className={`relative overflow-hidden ${className}`}>
            {/* Leaflet CSS */}
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                crossOrigin=""
            />

            <MapContainer
                center={center as any}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapController center={center} zoom={zoom} />

                {spots.map((spot: any) => {
                    const coords = spot.latitude && spot.longitude
                        ? [spot.latitude, spot.longitude]
                        : getCoordinatesFromAddress(spot.address || spot.location, spot.id);

                    const status = getBookingStatus?.(spot.id) || null;
                    const availability = spot.current_availability ?? spot.available ?? spot.total_spots;
                    const isAvailable = availability > 0;

                    return (
                        <Marker key={spot.id} position={coords as any}>
                            <Popup>
                                <div className="min-w-[200px] p-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900 line-clamp-1">{spot.name}</h3>
                                        <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-700">
                                            <Star className="w-2.5 h-2.5 fill-current" />
                                            4.8
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-3 line-clamp-1 italic">{spot.address || spot.location}</p>

                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        <div className="bg-purple-50 p-2 rounded-lg text-center text-xs">
                                            <div className="text-[9px] text-purple-600 font-bold uppercase">Price</div>
                                            <div className="font-bold text-purple-900">${spot.hourly_rate || spot.price}/hr</div>
                                        </div>
                                        <div className={`${isAvailable ? 'bg-green-50' : 'bg-red-50'} p-2 rounded-lg text-center text-xs`}>
                                            <div className={`text-[9px] ${isAvailable ? 'text-green-600' : 'text-red-600'} font-bold uppercase`}>Status</div>
                                            <div className={`font-bold ${isAvailable ? 'text-green-900' : 'text-red-900'}`}>
                                                {isAvailable ? `${availability} Left` : 'Full'}
                                            </div>
                                        </div>
                                    </div>

                                    {status === 'pending' ? (
                                        <Button disabled className="w-full h-8 text-[10px] bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 font-bold uppercase tracking-wider">
                                            <Clock className="w-3.5 h-3.5 mr-2" />
                                            Pending Approval
                                        </Button>
                                    ) : status === 'confirmed' ? (
                                        <Button variant="outline" className="w-full h-8 text-[10px] border-green-200 text-green-700 hover:bg-green-50 font-bold uppercase tracking-wider">
                                            <Star className="w-3.5 h-3.5 mr-2" />
                                            Confirmed
                                        </Button>
                                    ) : (
                                        <Button
                                            className="w-full h-8 text-[10px] bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 font-bold uppercase tracking-wider"
                                            onClick={() => onNavigate?.('book-now', { id: spot.id })}
                                            disabled={!isAvailable}
                                        >
                                            {isAvailable ? 'Book Now' : 'Notify Me'}
                                        </Button>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
