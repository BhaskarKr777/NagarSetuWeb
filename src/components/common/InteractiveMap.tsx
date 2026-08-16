import React, { useEffect, useRef, useState } from 'react';
import { Issue, IssueCategory } from '../../types';
import L from 'leaflet';
import { MapPin, Navigation, Compass, Layers, ShieldCheck, Filter, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface InteractiveMapProps {
  issues: Issue[];
  selectedIssueId?: string | null;
  onSelectIssue?: (issue: Issue) => void;
  center?: [number, number];
  zoom?: number;
  height?: string;
  allowClickToPickLocation?: boolean;
  onLocationPicked?: (lat: number, lng: number, addressHint?: string) => void;
  showCitySwitcher?: boolean;
}

const INDIAN_CITIES = [
  { name: 'All India', coords: [22.3511, 78.6677] as [number, number], zoom: 5, icon: '🇮🇳' },
  { name: 'Bengaluru', coords: [12.9716, 77.5946] as [number, number], zoom: 13, icon: '🏙️' },
  { name: 'Delhi NCR', coords: [28.6139, 77.2090] as [number, number], zoom: 12, icon: '🏛️' },
  { name: 'Mumbai', coords: [19.0760, 72.8777] as [number, number], zoom: 12, icon: '🌊' },
  { name: 'Pune', coords: [18.5204, 73.8567] as [number, number], zoom: 13, icon: '🏞️' },
  { name: 'Hyderabad', coords: [17.3850, 78.4867] as [number, number], zoom: 12, icon: '🏰' },
  { name: 'Chennai', coords: [13.0827, 80.2707] as [number, number], zoom: 12, icon: '🌺' },
  { name: 'Kolkata', coords: [22.5726, 88.3639] as [number, number], zoom: 12, icon: '🌉' },
  { name: 'Jaipur', coords: [26.9124, 75.7873] as [number, number], zoom: 12, icon: '🏰' },
  { name: 'Lucknow', coords: [26.8467, 80.9462] as [number, number], zoom: 12, icon: '🕌' },
];

const CATEGORY_MAP: Record<string, string> = {
  'Roads': '🚗',
  'Garbage': '🗑️',
  'Drainage': '🌊',
  'Water': '💧',
  'Streetlight': '💡',
  'Infrastructure': '🏢',
  'Other': '📍',
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  issues,
  selectedIssueId,
  onSelectIssue,
  center = [20.5937, 78.9629],
  zoom = 5,
  height = '520px',
  allowClickToPickLocation = false,
  onLocationPicked,
  showCitySwitcher = true,
}) => {
  const [activeCity, setActiveCity] = useState<string>('All India');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const pickedMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        minZoom: 4,
        maxZoom: 18,
        zoomControl: false, // custom placed
        scrollWheelZoom: true,
      });

      // High quality CartoDB Positron / OSM light tiles (clean modern SaaS aesthetic)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Custom smooth zoom control in top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;
      mapInstanceRef.current = map;

      // Location picker on click
      if (allowClickToPickLocation) {
        map.on('click', (e: L.LeafletMouseEvent) => {
          const { lat, lng } = e.latlng;
          if (pickedMarkerRef.current) {
            pickedMarkerRef.current.setLatLng([lat, lng]);
          } else {
            const pinIcon = L.divIcon({
              className: 'custom-map-pin-picked',
              html: `
                <div style="
                  background-color: #007A5A;
                  width: 36px; height: 36px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
                  display: flex; align-items: center; justify-content: center;
                  color: white; font-size: 16px; font-weight: bold;
                ">📍</div>
              `,
              iconSize: [36, 36],
              iconAnchor: [18, 36],
            });
            pickedMarkerRef.current = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
          }
          if (onLocationPicked) {
            onLocationPicked(lat, lng, `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
          }
        });
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when issues, filters, or selected ID change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const filtered = selectedCategory === 'All' 
      ? issues 
      : issues.filter(i => i.category === selectedCategory);

    filtered.forEach((issue) => {
      if (!issue.location?.lat || !issue.location?.lng) return;

      const isSelected = issue.id === selectedIssueId;
      const isResolved = issue.status === 'Resolved';
      
      let markerBg = '#4A154B';
      let statusColor = '#007A5A';

      if (isResolved) {
        markerBg = '#007A5A';
      } else if (issue.priority === 'High') {
        markerBg = '#E01E5A';
      } else if (issue.priority === 'Medium') {
        markerBg = '#ECB22E';
      }

      const iconEmoji = CATEGORY_MAP[issue.category] || '📍';

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background-color: ${markerBg}; 
            width: ${isSelected ? '38px' : '30px'}; 
            height: ${isSelected ? '38px' : '30px'}; 
            border-radius: 50%; 
            border: 2.5px solid white; 
            box-shadow: 0 6px 14px rgba(0,0,0,0.25); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: ${isSelected ? '16px' : '13px'};
            cursor: pointer;
            transition: transform 0.2s;
          ">
            ${iconEmoji}
          </div>
        `,
        iconSize: isSelected ? [38, 38] : [30, 30],
        iconAnchor: isSelected ? [19, 19] : [15, 15],
      });

      const marker = L.marker([issue.location.lat, issue.location.lng], { icon: customIcon });

      const popupHtml = `
        <div style="font-family: inherit; width: 250px; border-radius: 14px; overflow: hidden; padding: 0; background: white;">
          <img src="${issue.imageUrl}" alt="${issue.title}" style="width: 100%; height: 120px; object-fit: cover;" />
          <div style="padding: 12px; background: white;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 11px; font-family: monospace; font-weight: 800; color: #4A154B;">${issue.id}</span>
              <span style="font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; background-color: ${isResolved ? '#E6F4EA' : '#FFF3C4'}; color: ${isResolved ? '#007A5A' : '#9E6A00'};">
                ${issue.status}
              </span>
            </div>
            <h4 style="font-size: 13px; font-weight: 800; color: #1D1C1D; margin: 0 0 4px 0; line-height: 1.2;">${issue.title}</h4>
            <p style="font-size: 11px; color: #616061; margin: 0 0 10px 0;">📍 ${issue.location.ward}</p>
            <button id="popup-btn-${issue.id}" style="
              width: 100%; 
              background-color: #007A5A; 
              color: white; 
              font-size: 11px; 
              font-weight: 800; 
              padding: 8px 12px; 
              border-radius: 8px; 
              border: none; 
              cursor: pointer;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            ">
              Inspect Grievance Details →
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${issue.id}`);
        if (btn && onSelectIssue) {
          btn.onclick = () => onSelectIssue(issue);
        }
      });

      marker.on('click', () => {
        if (onSelectIssue) onSelectIssue(issue);
      });

      markersLayerRef.current?.addLayer(marker);

      if (isSelected && mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([issue.location.lat, issue.location.lng], 14, { duration: 0.8 });
        marker.openPopup();
      }
    });
  }, [issues, selectedIssueId, selectedCategory]);

  const handleCitySelect = (city: typeof INDIAN_CITIES[0]) => {
    setActiveCity(city.name);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(city.coords, city.zoom, { duration: 1.2 });
    }
  };

  const categories = ['All', 'Roads', 'Garbage', 'Drainage', 'Water', 'Streetlight', 'Infrastructure'];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#EAE8E2] shadow-sm space-y-4">
      
      {/* Top Map Toolbar: City Jumps & Category Pills */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#F0EDE6]">
        
        {/* City Selector Pills with Generous Padding */}
        {showCitySwitcher && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            <span className="text-xs font-bold text-[#616061] mr-1 shrink-0">Focus City:</span>
            {INDIAN_CITIES.map((city) => (
              <button
                key={city.name}
                type="button"
                onClick={() => handleCitySelect(city)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1 ${
                  activeCity === city.name
                    ? 'bg-[#4A154B] text-white shadow-2xs'
                    : 'bg-[#F8F6F2] text-[#4A484A] hover:bg-[#EAE8E2] border border-[#EAE8E2]'
                }`}
              >
                <span>{city.icon}</span>
                <span>{city.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 shrink-0">
          <span className="text-xs font-bold text-[#616061] mr-1 hidden sm:inline">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#007A5A] text-white shadow-2xs'
                  : 'bg-[#F8F6F2] text-[#616061] hover:bg-[#EAE8E2] border border-[#EAE8E2]'
              }`}
            >
              {cat === 'All' ? 'All Pins' : `${CATEGORY_MAP[cat] || ''} ${cat}`}
            </button>
          ))}
        </div>

      </div>

      {/* Map Canvas Container with Clean Rounded Frame */}
      <div className="relative rounded-2xl overflow-hidden border border-[#EAE8E2] bg-[#F8F6F2]">
        <div ref={mapContainerRef} style={{ height, width: '100%' }} className="z-10" />

        {/* Floating Interactive Map Legend */}
        <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border border-[#EAE8E2] text-xs flex flex-wrap items-center gap-4">
          <span className="font-black text-[#1D1C1D] text-xs">Active Heatmap:</span>
          
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E01E5A]" />
            <span className="text-[#1D1C1D] font-bold text-xs">High Priority</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ECB22E]" />
            <span className="text-[#1D1C1D] font-bold text-xs">Medium</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#4A154B]" />
            <span className="text-[#1D1C1D] font-bold text-xs">Assigned</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#007A5A]" />
            <span className="text-[#1D1C1D] font-bold text-xs">Resolved</span>
          </div>
        </div>

        {/* Floating Counter Badge */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md border border-[#EAE8E2] text-xs font-bold text-[#1D1C1D] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#2EB67D] animate-pulse" />
          <span>Showing <strong>{issues.length}</strong> Geotagged Tickets</span>
        </div>
      </div>

    </div>
  );
};
