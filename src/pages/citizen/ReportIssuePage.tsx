import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { IssueCategory, IssuePriority } from '../../types';
import { MOCK_SAMPLE_PHOTOS } from '../../data/mockData';
import { InteractiveMap } from '../../components/common/InteractiveMap';
import confetti from 'canvas-confetti';
import { 
  Camera, 
  Upload, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  ShieldAlert, 
  ArrowRight, 
  FileText, 
  Navigation,
  RefreshCw,
  Info
} from 'lucide-react';

export const ReportIssuePage: React.FC = () => {
  const navigate = useNavigate();
  const { createIssue, currentUser } = useApp();


  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('Roads');
  const [priority, setPriority] = useState<IssuePriority>('High');
  const [address, setAddress] = useState('100 Feet Road, Near Metro Pillar 142, Indiranagar');
  const [ward, setWard] = useState('Ward 14 - Indiranagar');
  const [landmark, setLandmark] = useState('Opposite Costa Coffee');
  const [lat, setLat] = useState<number>(12.9784);
  const [lng, setLng] = useState<number>(77.6408);
  const [imageUrl, setImageUrl] = useState<string>(MOCK_SAMPLE_PHOTOS[0].url);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success State
  const [submittedIssueId, setSubmittedIssueId] = useState<string | null>(null);

  // Quick Preset Autofil
  const applyPreset = (preset: typeof MOCK_SAMPLE_PHOTOS[0]) => {
    setImageUrl(preset.url);
    if (preset.label.includes('Pothole')) {
      setTitle('Hazardous Deep Pothole on Main Road');
      setDescription('Large crater causing severe traffic slowdown and hazard for two-wheelers.');
      setCategory('Roads');
      setPriority('High');
    } else if (preset.label.includes('Garbage')) {
      setTitle('Overflowing Garbage Dumpster on Footpath');
      setDescription('Trash has not been cleared for 3 days and is spilling onto the pedestrian path.');
      setCategory('Garbage');
      setPriority('High');
    } else if (preset.label.includes('Water')) {
      setTitle('Underground Water Pipe Burst');
      setDescription('Massive drinking water leakage gushing onto the road and flooding basements.');
      setCategory('Water');
      setPriority('High');
    } else if (preset.label.includes('Streetlight')) {
      setTitle('Non-Functional Streetlights on Residential Stretch');
      setDescription('Street is pitch dark after 7 PM causing safety concerns for pedestrians.');
      setCategory('Streetlight');
      setPriority('Medium');
    } else if (preset.label.includes('Drain')) {
      setTitle('Blocked Stormwater Drain Causing Waterlogging');
      setDescription('Inlet blocked by silt and plastic waste. Water accumulating rapidly.');
      setCategory('Drainage');
      setPriority('High');
    }
  };

  // Browser Geolocation
  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setAddress(`GPS Location (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`);
        setIsLocating(false);
      },
      (err) => {
        console.warn('Geolocation error', err);
        setIsLocating(false);
        // Fallback default coordinates
        setLat(12.9716);
        setLng(77.5946);
        setAddress('Indiranagar 100 Feet Road, Bengaluru');
      },
      { timeout: 8000 }
    );
  };

  // Handle image file upload (converts to base64 preview)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newIssue = createIssue({
        title,
        description,
        category,
        priority,
        address,
        ward,
        landmark,
        lat,
        lng,
        imageUrl: imageUrl || MOCK_SAMPLE_PHOTOS[0].url
      });

      // Confetti burst for rewarding citizen engagement!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }

      setSubmittedIssueId(newIssue.id);
      setIsSubmitting(false);
    }, 600);
  };

  // Success Screen
  if (submittedIssueId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-6">
          
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20 animate-bounce-short">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Grievance Registered
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Your civic issue has been reported successfully!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Our municipal control desk has acknowledged your complaint and automatically routed it to the concerned ward department.
            </p>
          </div>

          {/* Generated ID Badge */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Complaint Reference ID</p>
            <p className="text-2xl font-extrabold font-mono text-blue-700 tracking-wider my-1">{submittedIssueId}</p>
            <p className="text-[11px] text-slate-500">Save this ID or track directly in your dashboard.</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(`/citizen/report/${submittedIssueId}`)}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2"
            >
              <span>View Report Details & Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/citizen/my-reports')}
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition"
            >
              Go to My Reports
            </button>
          </div>


          <p className="text-[11px] text-slate-400">
            You will receive instant SMS & WhatsApp updates as the field officer progresses with resolution.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
          <Sparkles className="w-4 h-4" />
          <span>New Civic Complaint</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Report a Civic Issue
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Provide issue details, location and photographic evidence for quick municipal resolution.
        </p>
      </div>

      {/* Quick Demo Sample Presets */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Quick Demo Autofill Presets (Click to test instantly):
          </span>
          <span className="text-[10px] text-blue-600 font-medium">1-Click Test</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {MOCK_SAMPLE_PHOTOS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => applyPreset(preset)}
              className="px-2.5 py-1 bg-white hover:bg-blue-100 text-slate-700 hover:text-blue-800 rounded-lg text-xs font-semibold border border-blue-200 shadow-2xs transition"
            >
              📷 {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Reporting Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        
        {/* 1. Image Upload & Preview Section */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            1. Photo Evidence <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* Upload Zone */}
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-slate-50/60 hover:bg-blue-50/30 transition flex flex-col items-center justify-center cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                <Camera className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-800">
                Click or Drag & Drop Image Here
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Supports JPG, PNG, WEBP (Max 10MB)
              </p>
              <span className="mt-3 px-3 py-1 bg-white text-blue-600 rounded-lg border border-slate-200 text-xs font-semibold shadow-2xs">
                Browse Files
              </span>
            </div>

            {/* Preview Box */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 h-48 flex items-center justify-center group">
              {imageUrl ? (
                <>
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold">
                    ✓ Photo Ready for Evidence
                  </div>
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[10px] font-semibold backdrop-blur-xs">
                    Uploaded Preview
                  </span>
                </>
              ) : (
                <span className="text-xs text-slate-400">No image uploaded</span>
              )}
            </div>
          </div>
        </div>

        {/* 2. Issue Title & Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              2. Issue Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Deep hazardous pothole near 100ft road cross"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as IssueCategory)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold bg-white"
            >
              <option value="Roads">🚗 Roads & Potholes</option>
              <option value="Garbage">🗑️ Garbage & Sanitation</option>
              <option value="Drainage">🌊 Drainage & Waterlogging</option>
              <option value="Water">💧 Drinking Water Supply</option>
              <option value="Streetlight">💡 Streetlights & Electricity</option>
              <option value="Infrastructure">🏢 Public Infrastructure</option>
              <option value="Other">❓ Other Civic Problem</option>
            </select>
          </div>
        </div>

        {/* 3. Description */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            3. Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            placeholder="Describe the severity, how long it has persisted, and any specific safety risk..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        {/* 4. Location & Map Card */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              4. Location & Landmark <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleFetchLocation}
              disabled={isLocating}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-lg border border-blue-200 transition"
            >
              <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Fetching GPS...' : 'Use My Current Location'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Street Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                placeholder="e.g. 100 Feet Road, 12th Main Corner"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Municipal Ward</label>
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white"
              >
                <option value="Ward 14 - Indiranagar">Ward 14 - Indiranagar</option>
                <option value="Ward 08 - Koramangala">Ward 08 - Koramangala</option>
                <option value="Ward 05 - Shivaji Nagar">Ward 05 - Shivaji Nagar</option>
                <option value="Ward 03 - Malleshwaram">Ward 03 - Malleshwaram</option>
                <option value="Ward 12 - HSR Layout">Ward 12 - HSR Layout</option>
                <option value="Ward 22 - Whitefield">Ward 22 - Whitefield</option>
                <option value="Ward 09 - Jayanagar">Ward 09 - Jayanagar</option>
                <option value="Ward 18 - Central Business District">Ward 18 - Central Business District</option>
                <option value="Ward 20 - Bellandur">Ward 20 - Bellandur</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Nearest Landmark (Helps field team locate spot)</label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              placeholder="e.g. Opposite Costa Coffee, Metro Pillar 142"
            />
          </div>

          {/* Interactive Mini Map Location Picker */}
          <div className="pt-2">
            <p className="text-[11px] text-slate-500 mb-2 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-blue-500" />
              <span>Click anywhere on the map to fine-tune the exact pin coordinates:</span>
            </p>
            <InteractiveMap
              issues={[]}
              center={[lat, lng]}
              zoom={14}
              height="220px"
              allowClickToPickLocation={true}
              onLocationPicked={(newLat, newLng) => {
                setLat(newLat);
                setLng(newLng);
              }}
            />
          </div>
        </div>

        {/* 5. Priority Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            5. Urgency / Priority Level <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-3 gap-3">
            {[
              { level: 'Low' as const, label: 'Low', desc: 'Non-urgent (72-96h SLA)', color: 'border-slate-300 hover:border-slate-400' },
              { level: 'Medium' as const, label: 'Medium', desc: 'Moderate nuisance (48h SLA)', color: 'border-amber-300 hover:border-amber-400' },
              { level: 'High' as const, label: 'High Priority', desc: 'Immediate safety hazard (24h SLA)', color: 'border-red-400 hover:border-red-500' },
            ].map((p) => (
              <button
                key={p.level}
                type="button"
                onClick={() => setPriority(p.level)}
                className={`p-3 rounded-2xl border-2 text-left transition flex flex-col justify-between ${
                  priority === p.level
                    ? p.level === 'High' 
                      ? 'border-red-500 bg-red-50/70 ring-2 ring-red-200'
                      : p.level === 'Medium'
                      ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-200'
                      : 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-200'
                    : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className={`text-xs font-bold ${priority === p.level ? 'text-slate-900' : 'text-slate-700'}`}>
                    {p.label}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{p.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Reporting as: <span className="font-bold text-slate-800">{currentUser.name}</span> ({currentUser.phone})
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-lg shadow-blue-600/30 transition transform hover:scale-102 active:scale-98 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Registering Complaint...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Submit Grievance Report</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
