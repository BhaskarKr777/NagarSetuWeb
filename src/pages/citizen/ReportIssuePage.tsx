import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { IssueCategory, IssuePriority } from '../../types';
import { MOCK_SAMPLE_PHOTOS } from '../../data/mockData';
import { InteractiveMap } from '../../components/common/InteractiveMap';
import { analyzeCivicImage, checkDuplicateGrievance, AIImageAnalysisResult, DuplicateCheckResult } from '../../services/aiService';
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
  Info,
  Layers,
  Cpu,
  ThumbsUp,
  ExternalLink
} from 'lucide-react';

export const ReportIssuePage: React.FC = () => {
  const navigate = useNavigate();
  const { createIssue, currentUser, issues, upvoteIssue, showNotification } = useApp();

  // Form State
  const [title, setTitle] = useState('Hazardous Deep Pothole on Main Road');
  const [description, setDescription] = useState('Large crater causing severe traffic slowdown and hazard for two-wheelers.');
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

  // AI State
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIImageAnalysisResult | null>(null);
  const [duplicateCheck, setDuplicateCheck] = useState<DuplicateCheckResult | null>(null);

  // Success State
  const [submittedIssueId, setSubmittedIssueId] = useState<string | null>(null);

  // Trigger AI Image Analysis when image changes
  useEffect(() => {
    if (!imageUrl) return;
    setIsAnalyzingImage(true);
    analyzeCivicImage(imageUrl, category).then((result) => {
      setAiAnalysis(result);
      setIsAnalyzingImage(false);
    });
  }, [imageUrl, category]);

  // Trigger Duplicate Check when title/location changes
  useEffect(() => {
    if (!title || !lat || !lng) return;
    const dup = checkDuplicateGrievance(title, category, lat, lng, issues);
    setDuplicateCheck(dup);
  }, [title, category, lat, lng, issues]);

  // Quick Preset Autofill
  const applyPreset = (preset: typeof MOCK_SAMPLE_PHOTOS[0]) => {
    setImageUrl(preset.url);
    if (preset.label.includes('Pothole')) {
      setCategory('Roads');
    } else if (preset.label.includes('Garbage')) {
      setCategory('Garbage');
    } else if (preset.label.includes('Water')) {
      setCategory('Water');
    } else if (preset.label.includes('Streetlight')) {
      setCategory('Streetlight');
    } else if (preset.label.includes('Drainage')) {
      setCategory('Drainage');
    }
  };

  const handleApplyAiDraft = () => {
    if (!aiAnalysis) return;
    setTitle(aiAnalysis.suggestedTitle);
    setDescription(aiAnalysis.suggestedDescription);
    setCategory(aiAnalysis.detectedCategory);
    setPriority(aiAnalysis.suggestedPriority);
    showNotification('AI Draft Applied: Title, Description, & Category updated!', 'success');
  };

  // Get current device GPS
  const handleGetLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        setLat(latitude);
        setLng(longitude);
        setAddress(`GPS: ${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E (Auto-detected)`);
        setWard('Ward 14 - Indiranagar Central');
        setIsLocating(false);
        showNotification('GPS Coordinates locked successfully', 'info');
      },
      (err) => {
        console.warn('GPS Error:', err);
        setIsLocating(false);
        setLat(12.9716);
        setLng(77.5946);
        setAddress('Indiranagar 100 Feet Road, Bengaluru');
      },
      { timeout: 8000 }
    );
  };

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
    }, 500);
  };

  // Success Screen
  if (submittedIssueId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center bg-[#F8F6F2]">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE8E2] shadow-xl space-y-6">
          
          <div className="w-20 h-20 bg-[#007A5A]/10 text-[#007A5A] rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#007A5A] bg-[#007A5A]/10 px-3 py-1 rounded-full">
              Grievance Registered
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1D1C1D]">
              Your civic issue has been reported successfully!
            </h1>
            <p className="text-xs sm:text-sm text-[#616061] max-w-md mx-auto">
              Our central municipal control desk has acknowledged your complaint and routed it to the concerned ward department.
            </p>
          </div>

          {/* Generated ID Badge */}
          <div className="p-4 bg-[#F8F6F2] rounded-2xl border border-[#EAE8E2] max-w-sm mx-auto">
            <p className="text-[11px] font-bold text-[#616061] uppercase tracking-wider">Complaint Reference ID</p>
            <p className="text-2xl font-black font-mono text-[#4A154B] tracking-wider my-1">{submittedIssueId}</p>
            <p className="text-[11px] text-[#616061]">Save this ID or track status in your dashboard.</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(`/citizen/report/${submittedIssueId}`)}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#007A5A] hover:bg-[#006046] text-white text-xs sm:text-sm font-black rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Report Details & Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/citizen/my-reports')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#EAE8E2] text-[#1D1C1D] text-xs sm:text-sm font-black rounded-xl border border-[#D4CEBF] transition cursor-pointer"
            >
              Go to My Reports
            </button>
          </div>

          <p className="text-[11px] text-[#616061]">
            Instant SMS & WhatsApp tracking updates are automatically triggered as the field officer progresses.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F8F6F2]">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#007A5A]/10 text-[#007A5A] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#E01E5A]" />
          <span>CivicSight AI • Computer Vision Assisted Reporting</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1D1C1D] tracking-tight">
          Report a Civic Problem
        </h1>
        <p className="text-xs sm:text-sm text-[#616061] font-medium">
          Upload photo proof, let our AI model detect severity & category, and submit directly to the municipal field roster.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* STEP 1: PHOTO UPLOAD & AI COMPUTER VISION SCAN */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE8E2] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#1D1C1D] flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#4A154B]" />
              <span>1. Photograph Evidence & AI Vision Scan</span>
            </h3>
            <span className="text-xs font-bold text-[#E01E5A] bg-[#E01E5A]/10 px-2.5 py-0.5 rounded-full">
              Step 1 of 3
            </span>
          </div>

          {/* Image Preview & AI Scanner Display */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            
            {/* Image Preview Box with Bounding Box Overlay */}
            <div className="md:col-span-6 relative h-64 rounded-2xl overflow-hidden bg-slate-900 border border-[#EAE8E2] group">
              <img
                src={imageUrl}
                alt="Uploaded proof"
                className="w-full h-full object-cover"
              />

              {/* Laser Scanning Animation when analyzing */}
              {isAnalyzingImage && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-2">
                  <div className="w-full h-1 bg-[#2EB67D] shadow-[0_0_15px_#2EB67D] animate-bounce" />
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-[#2EB67D] animate-spin" />
                    <span>Neural Network Scanning Image...</span>
                  </span>
                </div>
              )}

              {/* AI Bounding Box Overlay */}
              {!isAnalyzingImage && aiAnalysis && (
                <div 
                  style={{
                    left: `${aiAnalysis.boundingBox?.x || 20}%`,
                    top: `${aiAnalysis.boundingBox?.y || 25}%`,
                    width: `${aiAnalysis.boundingBox?.width || 60}%`,
                    height: `${aiAnalysis.boundingBox?.height || 50}%`,
                  }}
                  className="absolute border-2 border-[#2EB67D] bg-[#2EB67D]/10 rounded-lg pointer-events-none flex items-start justify-start p-1"
                >
                  <span className="bg-[#2EB67D] text-black font-black text-[9px] px-1.5 py-0.5 rounded shadow-xs">
                    {aiAnalysis.confidence}% {aiAnalysis.detectedCategory}
                  </span>
                </div>
              )}

              {/* Action Overlay */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <label className="px-3 py-1.5 bg-black/75 hover:bg-black text-white text-xs font-bold rounded-lg cursor-pointer backdrop-blur-xs transition flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>

                <span className="text-[10px] text-white/90 bg-black/60 px-2 py-1 rounded backdrop-blur-xs">
                  GPS Geotag Embedded
                </span>
              </div>
            </div>

            {/* AI Analysis Result Card */}
            <div className="md:col-span-6 space-y-3">
              <div className="bg-[#F8F6F2] p-4 rounded-2xl border border-[#EAE8E2] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#4A154B] flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>CivicSight AI Detection</span>
                  </span>
                  {aiAnalysis && (
                    <span className="text-[11px] font-black text-[#007A5A] bg-[#007A5A]/10 px-2 py-0.5 rounded">
                      {aiAnalysis.confidence}% Confidence
                    </span>
                  )}
                </div>

                {aiAnalysis ? (
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="text-[10px] text-[#616061] uppercase font-bold">Detected Defect</p>
                      <p className="font-bold text-[#1D1C1D]">{aiAnalysis.detectedObject}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#EAE8E2]">
                      <div>
                        <p className="text-[10px] text-[#616061] uppercase font-bold">Severity Score</p>
                        <p className="font-black text-[#E01E5A]">{aiAnalysis.severityScore}/100 ({aiAnalysis.hazardRisk} Risk)</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#616061] uppercase font-bold">Category</p>
                        <p className="font-bold text-[#4A154B]">{aiAnalysis.detectedCategory}</p>
                      </div>
                    </div>

                    {aiAnalysis.dimensionsEstimated && (
                      <div className="pt-1 border-t border-[#EAE8E2]">
                        <p className="text-[10px] text-[#616061] uppercase font-bold">Physical Extent</p>
                        <p className="text-[11px] text-[#1D1C1D] font-medium">{aiAnalysis.dimensionsEstimated}</p>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleApplyAiDraft}
                        className="w-full py-2 bg-[#4A154B] hover:bg-[#3B113C] text-white text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#ECB22E]" />
                        <span>Apply AI Auto-Draft Details</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#616061] italic">Select or upload an image to run AI computer vision analysis.</p>
                )}
              </div>

              {/* Quick Sample Photos */}
              <div>
                <p className="text-[11px] font-bold text-[#616061] mb-1.5">Quick Demo Images:</p>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {MOCK_SAMPLE_PHOTOS.map((sample) => (
                    <button
                      key={sample.url}
                      type="button"
                      onClick={() => applyPreset(sample)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition cursor-pointer ${
                        imageUrl === sample.url ? 'border-[#007A5A] ring-2 ring-[#007A5A]/30' : 'border-[#EAE8E2] opacity-75 hover:opacity-100'
                      }`}
                      title={sample.label}
                    >
                      <img src={sample.url} alt={sample.label} className="w-full h-full object-cover" />
                    </button>
                  ))}

                </div>
              </div>

            </div>

          </div>

          {/* AI Duplicate Grievance Alert (if detected within 150m) */}
          {duplicateCheck?.isDuplicate && duplicateCheck.matchedIssue && (
            <div className="p-4 bg-[#FFF3C4] border border-[#ECB22E] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-[#9E6A00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-[#1D1C1D]">
                    AI Duplicate Match Detected ({duplicateCheck.distanceMeters}m away)
                  </h4>
                  <p className="text-[#616061] mt-0.5">
                    Ticket <strong>{duplicateCheck.matchedIssue.id}</strong> ({duplicateCheck.matchedIssue.title}) already reports this exact problem.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  upvoteIssue(duplicateCheck.matchedIssue!.id);
                  showNotification(`Upvoted ticket ${duplicateCheck.matchedIssue!.id} to escalate priority!`, 'success');
                }}
                className="px-4 py-2 bg-[#007A5A] hover:bg-[#006046] text-white font-bold rounded-xl shrink-0 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Upvote Existing Ticket ({duplicateCheck.matchedIssue.upvotes})</span>
              </button>
            </div>
          )}

        </div>

        {/* STEP 2: GRIEVANCE PARTICULARS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE8E2] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#1D1C1D] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#007A5A]" />
              <span>2. Issue Particulars & Category</span>
            </h3>
            <span className="text-xs font-bold text-[#4A154B] bg-[#4A154B]/10 px-2.5 py-0.5 rounded-full">
              Step 2 of 3
            </span>
          </div>

          <div className="space-y-4">
            
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider">
                Issue Headline / Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Deep Hazardous Pothole on Main Road"
                className="w-full px-4 py-3 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#4A154B] text-[#1D1C1D]"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider">
                Detailed Description *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide details about the issue size, hazard level, or surrounding hazards..."
                className="w-full px-4 py-3 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#4A154B] text-[#1D1C1D]"
              />
            </div>

            {/* Category & Priority Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as IssueCategory)}
                  className="w-full px-4 py-3 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#4A154B] text-[#1D1C1D]"
                >
                  <option value="Roads">🚗 Roads & Potholes</option>
                  <option value="Garbage">🗑️ Garbage & Sanitation</option>
                  <option value="Water">💧 Water Supply & Leakage</option>
                  <option value="Streetlight">💡 Streetlight & Lighting</option>
                  <option value="Drainage">🌊 Drainage & Sewerage</option>
                  <option value="Infrastructure">🏢 Civic Infrastructure</option>
                  <option value="Other">📍 Other Civic Grievance</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider">
                  Priority Level
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as IssuePriority)}
                  className="w-full px-4 py-3 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#4A154B] text-[#1D1C1D]"
                >
                  <option value="High">🔴 High Priority (&lt; 24h SLA Target)</option>
                  <option value="Medium">🟡 Medium Priority (48h SLA Target)</option>
                  <option value="Low">🟢 Low Priority (Standard 72h SLA)</option>
                </select>
              </div>

            </div>

          </div>
        </div>

        {/* STEP 3: LOCATION & GPS MAPPING */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE8E2] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#1D1C1D] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1264A3]" />
              <span>3. Geolocation & Ward Assignment</span>
            </h3>
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={isLocating}
              className="px-3.5 py-1.5 bg-[#007A5A] hover:bg-[#006046] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Locating...' : 'Auto-Detect GPS'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider">
                Street Address / Landmark
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 100 Feet Road, Indiranagar"
                className="w-full px-4 py-3 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs font-semibold focus:outline-none focus:bg-white text-[#1D1C1D]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider">
                Ward & Zone
              </label>
              <input
                type="text"
                required
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                placeholder="e.g. Ward 14 - Indiranagar"
                className="w-full px-4 py-3 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs font-semibold focus:outline-none focus:bg-white text-[#1D1C1D]"
              />
            </div>
          </div>

          {/* Interactive Map with Click-to-Pick Location */}
          <div className="space-y-2">
            <p className="text-xs text-[#616061] font-medium">
              Click anywhere on the map to pin the exact issue coordinates:
            </p>
            <InteractiveMap
              issues={issues}
              height="300px"
              allowClickToPickLocation={true}
              onLocationPicked={(newLat, newLng) => {
                setLat(newLat);
                setLng(newLng);
                setAddress(`Coordinates: ${newLat.toFixed(4)}° N, ${newLng.toFixed(4)}° E`);
              }}
              center={[lat, lng]}
              zoom={13}
            />
          </div>

        </div>

        {/* SUBMIT BUTTON */}
        <div className="p-6 bg-white rounded-3xl border border-[#EAE8E2] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-xs text-[#616061]">
            Filing report as: <strong className="text-[#1D1C1D]">{currentUser.name}</strong> ({currentUser.phone})
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-4 bg-[#007A5A] hover:bg-[#006046] text-white font-black text-sm rounded-2xl shadow-md transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
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
