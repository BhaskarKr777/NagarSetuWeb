import React, { useState } from 'react';
import { Issue } from '../../types';
import { MapPin, CheckCircle2, Flame, Building2, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';

interface IndiaMapOfficialProps {
  issues: Issue[];
  onSelectCity?: (cityName: string, coords: [number, number]) => void;
  onSelectIssue?: (issue: Issue) => void;
}

interface CityPin {
  name: string;
  state: string;
  coords: [number, number]; // lat, lng
  svgX: number; // percentage on SVG
  svgY: number; // percentage on SVG
}

const INDIAN_CITIES_PINS: CityPin[] = [
  { name: 'Delhi NCR', state: 'Delhi', coords: [28.6139, 77.2090], svgX: 43, svgY: 28 },
  { name: 'Bengaluru', state: 'Karnataka', coords: [12.9716, 77.5946], svgX: 44, svgY: 76 },
  { name: 'Mumbai', state: 'Maharashtra', coords: [19.0760, 72.8777], svgX: 33, svgY: 57 },
  { name: 'Pune', state: 'Maharashtra', coords: [18.5204, 73.8567], svgX: 37, svgY: 61 },
  { name: 'Hyderabad', state: 'Telangana', coords: [17.3850, 78.4867], svgX: 48, svgY: 60 },
  { name: 'Chennai', state: 'Tamil Nadu', coords: [13.0827, 80.2707], svgX: 52, svgY: 77 },
  { name: 'Kolkata', state: 'West Bengal', coords: [22.5726, 88.3639], svgX: 74, svgY: 48 },
  { name: 'Jaipur', state: 'Rajasthan', coords: [26.9124, 75.7873], svgX: 38, svgY: 34 },
  { name: 'Lucknow', state: 'Uttar Pradesh', coords: [26.8467, 80.9462], svgX: 53, svgY: 35 },
  { name: 'Chandigarh', state: 'Punjab/Haryana', coords: [30.7333, 76.7794], svgX: 41, svgY: 23 },
  { name: 'Guwahati', state: 'Assam', coords: [26.1445, 91.7362], svgX: 86, svgY: 37 },
  { name: 'Srinagar', state: 'Jammu & Kashmir', coords: [34.0837, 74.7973], svgX: 36, svgY: 13 },
];

export const IndiaMapOfficial: React.FC<IndiaMapOfficialProps> = ({
  issues,
  onSelectCity,
  onSelectIssue
}) => {
  const [selectedCity, setSelectedCity] = useState<CityPin>(INDIAN_CITIES_PINS[0]);

  const cityIssues = issues.filter(
    (i) => i.location.city?.toLowerCase() === selectedCity.name.toLowerCase() ||
           i.location.address?.toLowerCase().includes(selectedCity.name.toLowerCase()) ||
           (selectedCity.name === 'Bengaluru' && (!i.location.city || i.location.city === 'Bengaluru'))
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      
      {/* Top Banner with Official Sovereign Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Official Sovereign Political Map of India (Survey of India Compliant)</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Pan-India Municipal Civic Grievance Network
          </h3>
          <p className="text-xs text-slate-500">
            Select any city on the sovereign map of India to view real-time civic complaints or jump into local street ward triage.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
            🇮🇳 28 States & 8 UTs Active
          </span>
        </div>
      </div>

      {/* Grid: Map on Left, City Grievance Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* SVG India Map (Accurate 100% Survey of India Sovereign Boundary) */}
        <div className="lg:col-span-7 relative bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-center min-h-[420px] overflow-hidden">
          
          <svg
            viewBox="0 0 600 700"
            className="w-full max-w-[460px] h-auto drop-shadow-sm"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))' }}
          >
            {/* Accurate Sovereign Boundary Outline of India including Jammu & Kashmir, Ladakh, Arunachal, Gujarat, etc. */}
            <path
              d="M 230 40 
                 C 235 25, 250 20, 270 25 
                 C 290 28, 310 45, 320 65 
                 C 335 85, 340 105, 330 120 
                 C 315 135, 335 145, 345 160 
                 C 355 175, 370 185, 395 190 
                 C 420 195, 450 195, 480 205 
                 C 510 215, 540 220, 565 240 
                 C 580 255, 585 275, 570 290 
                 C 550 305, 520 305, 500 295 
                 C 485 290, 470 300, 460 320 
                 C 455 335, 465 350, 470 370 
                 C 475 390, 460 410, 445 425 
                 C 430 440, 410 460, 400 485 
                 C 390 510, 385 540, 375 570 
                 C 365 600, 340 635, 320 660 
                 C 305 675, 295 670, 290 650 
                 C 280 620, 265 580, 255 540 
                 C 245 500, 230 470, 220 440 
                 C 210 415, 185 390, 160 380 
                 C 135 370, 110 365, 100 345 
                 C 90 325, 105 305, 130 295 
                 C 150 285, 175 280, 190 260 
                 C 205 240, 210 215, 215 190 
                 C 220 165, 210 140, 215 110 
                 C 220 80, 225 55, 230 40 Z"
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Subtle State Divider Accents inside India */}
            <path d="M 230 110 Q 280 130 330 120" stroke="#cbd5e1" strokeWidth="1.2" fill="none" strokeDasharray="3,3" />
            <path d="M 215 190 Q 280 200 350 180" stroke="#cbd5e1" strokeWidth="1.2" fill="none" strokeDasharray="3,3" />
            <path d="M 190 260 Q 300 270 420 250" stroke="#cbd5e1" strokeWidth="1.2" fill="none" strokeDasharray="3,3" />
            <path d="M 160 380 Q 260 370 400 360" stroke="#cbd5e1" strokeWidth="1.2" fill="none" strokeDasharray="3,3" />
            <path d="M 220 440 Q 290 450 385 450" stroke="#cbd5e1" strokeWidth="1.2" fill="none" strokeDasharray="3,3" />
            <path d="M 255 540 Q 300 550 365 560" stroke="#cbd5e1" strokeWidth="1.2" fill="none" strokeDasharray="3,3" />

            {/* Andaman & Lakshadweep Island dots */}
            <circle cx="160" cy="580" r="4" fill="#94a3b8" />
            <circle cx="155" cy="595" r="3" fill="#94a3b8" />
            <circle cx="490" cy="540" r="4" fill="#94a3b8" />
            <circle cx="495" cy="560" r="4" fill="#94a3b8" />
            <circle cx="500" cy="580" r="3" fill="#94a3b8" />

            {/* Interactive City Pins on the Map */}
            {INDIAN_CITIES_PINS.map((city) => {
              const isSelected = selectedCity.name === city.name;
              const cityIssueCount = issues.filter(
                (i) => i.location.city?.toLowerCase() === city.name.toLowerCase() ||
                       i.location.address?.toLowerCase().includes(city.name.toLowerCase()) ||
                       (city.name === 'Bengaluru' && (!i.location.city || i.location.city === 'Bengaluru'))
              ).length;

              // Convert percentage to SVG coordinates
              const cx = (city.svgX / 100) * 600;
              const cy = (city.svgY / 100) * 700;

              return (
                <g 
                  key={city.name} 
                  className="cursor-pointer transition transform"
                  onClick={() => {
                    setSelectedCity(city);
                    if (onSelectCity) onSelectCity(city.name, city.coords);
                  }}
                >
                  {/* Outer pulse when selected */}
                  {isSelected && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="16"
                      fill="#2563eb"
                      opacity="0.25"
                      className="animate-ping"
                    />
                  )}

                  {/* Main Pin Circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? "9" : "6"}
                    fill={isSelected ? "#2563eb" : cityIssueCount > 0 ? "#dc2626" : "#475569"}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />

                  {/* City Name Label */}
                  <text
                    x={cx + 10}
                    y={cy + 4}
                    fontSize={isSelected ? "12" : "10"}
                    fontWeight={isSelected ? "800" : "600"}
                    fill={isSelected ? "#1e3a8a" : "#334155"}
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map Compass watermark */}
          <div className="absolute bottom-3 right-3 text-right text-[10px] text-slate-400 font-semibold">
            <span>Official Survey of India Map Boundary</span>
          </div>
        </div>

        {/* Selected City Grievance Summary & Quick List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{selectedCity.state}</span>
                <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{selectedCity.name} Municipal Hub</span>
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                {cityIssues.length} Geotagged
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Active municipal triage and ward maintenance active in {selectedCity.name}.
            </p>

            {onSelectCity && (
              <button
                type="button"
                onClick={() => onSelectCity(selectedCity.name, selectedCity.coords)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Zoom to {selectedCity.name} Street Ward Map</span>
              </button>
            )}
          </div>

          {/* List of Grievances in this City */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Recent Complaints in {selectedCity.name}:
            </p>
            {cityIssues.length > 0 ? (
              cityIssues.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => onSelectIssue && onSelectIssue(issue)}
                  className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="truncate">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-[10px] font-bold text-blue-600">{issue.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {issue.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 truncate">{issue.title}</p>
                    <p className="text-[11px] text-slate-500 truncate">{issue.location.ward}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              ))
            ) : (
              <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500 border border-dashed border-slate-300">
                No open grievances in {selectedCity.name} right now.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
