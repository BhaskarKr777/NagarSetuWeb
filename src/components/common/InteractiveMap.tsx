import React, { useEffect, useRef } from 'react';
import { Issue } from '../../types';
import L from 'leaflet';

interface InteractiveMapProps {
  issues: Issue[];
  selectedIssueId?: string | null;
  onSelectIssue?: (issue: Issue) => void;
  center?: [number, number];
  zoom?: number;
  height?: string;
  allowClickToPickLocation?: boolean;
  onLocationPicked?: (lat: number, lng: number, addressHint?: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  issues,
  selectedIssueId,
  onSelectIssue,
  center = [12.9716, 77.5946], // Default Bengaluru center
  zoom = 12,
  height = '500px',
  allowClickToPickLocation = false,
  onLocationPicked,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const pickedMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map if not already initialized
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;
      mapInstanceRef.current = map;

      // Handle map clicks for picking location in reporting form
      if (allowClickToPickLocation) {
        map.on('click', (e: L.LeafletMouseEvent) => {
          const { lat, lng } = e.latlng;
          if (pickedMarkerRef.current) {
            pickedMarkerRef.current.setLatLng([lat, lng]);
          } else {
            const pinIcon = L.divIcon({
              className: 'custom-map-pin-picked',
              html: `<div style="background-color: #2563eb; width: 26px; height: 26px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">📍</div>`,
              iconSize: [26, 26],
              iconAnchor: [13, 26],
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
      // Clean up map on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when issues or selectedIssueId changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    issues.forEach((issue) => {
      if (!issue.location?.lat || !issue.location?.lng) return;

      const isSelected = issue.id === selectedIssueId;
      const isResolved = issue.status === 'Resolved';
      
      // Color coding: Red = High, Amber = Medium, Green = Resolved, Blue = Low
      let markerColor = '#3b82f6';
      if (isResolved) {
        markerColor = '#10b981';
      } else if (issue.priority === 'High') {
        markerColor = '#ef4444';
      } else if (issue.priority === 'Medium') {
        markerColor = '#f59e0b';
      }

      const pulseClass = issue.priority === 'High' && !isResolved ? 'pulse-high' : '';

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div class="${pulseClass}" style="
            background-color: ${markerColor}; 
            width: ${isSelected ? '32px' : '26px'}; 
            height: ${isSelected ? '32px' : '26px'}; 
            border-radius: 50%; 
            border: 2px solid white; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.35); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
            font-size: ${isSelected ? '14px' : '11px'};
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
          ">
            ${isResolved ? '✓' : issue.priority === 'High' ? '!' : '•'}
          </div>
        `,
        iconSize: isSelected ? [32, 32] : [26, 26],
        iconAnchor: isSelected ? [16, 16] : [13, 13],
      });

      const marker = L.marker([issue.location.lat, issue.location.lng], { icon: customIcon });

      const popupHtml = `
        <div style="font-family: inherit; width: 230px; border-radius: 10px; overflow: hidden; padding: 0;">
          <img src="${issue.imageUrl}" alt="${issue.title}" style="width: 100%; height: 110px; object-fit: cover; border-bottom: 1px solid #e2e8f0;" />
          <div style="padding: 10px 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase;">${issue.id}</span>
              <span style="font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 9999px; background-color: ${isResolved ? '#dcfce7' : '#fee2e2'}; color: ${isResolved ? '#166534' : '#991b1b'};">
                ${issue.status}
              </span>
            </div>
            <h4 style="font-size: 12px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0; line-height: 1.3;">
              ${issue.title}
            </h4>
            <p style="font-size: 11px; color: #475569; margin: 0 0 8px 0; line-height: 1.2;">
              📍 ${issue.location.ward}
            </p>
            <button id="popup-btn-${issue.id}" style="
              width: 100%; 
              background-color: #2563eb; 
              color: white; 
              font-size: 11px; 
              font-weight: 600; 
              padding: 6px 10px; 
              border-radius: 6px; 
              border: none; 
              cursor: pointer;
              transition: background-color 0.15s;
            ">
              View Issue Details →
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${issue.id}`);
        if (btn) {
          btn.onclick = () => {
            if (onSelectIssue) onSelectIssue(issue);
          };
        }
      });

      marker.on('click', () => {
        if (onSelectIssue) onSelectIssue(issue);
      });

      markersLayerRef.current?.addLayer(marker);

      if (isSelected && mapInstanceRef.current) {
        mapInstanceRef.current.panTo([issue.location.lat, issue.location.lng], { animate: true });
        marker.openPopup();
      }
    });
  }, [issues, selectedIssueId]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
      <div ref={mapContainerRef} style={{ height, width: '100%' }} className="z-10" />
      
      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-xs px-3 py-2 rounded-xl shadow-lg border border-slate-200 text-xs flex flex-wrap items-center gap-3">
        <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Legend:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block animate-pulse"></span>
          <span className="text-slate-600 font-medium">High Priority</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
          <span className="text-slate-600 font-medium">Medium</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
          <span className="text-slate-600 font-medium">Low/Under Review</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
          <span className="text-slate-600 font-medium">Resolved</span>
        </div>
      </div>
    </div>
  );
};
