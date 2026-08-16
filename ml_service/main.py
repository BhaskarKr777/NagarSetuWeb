"""NagarSetu's lightweight, explainable civic-issue classification API.

This service classifies the reporter's text hint and image filename/URL.  It does
not claim to inspect image pixels: replace ``CivicTextClassifier`` with a trained
vision model before using image labels in a production municipal workflow.
"""

from __future__ import annotations

from functools import lru_cache
from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel, Field
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

Category = Literal["Roads", "Garbage", "Water", "Streetlight", "Drainage", "Infrastructure"]
Priority = Literal["Low", "Medium", "High"]


class AnalyzeRequest(BaseModel):
    image_url: str = Field(min_length=1, max_length=2_000)
    user_hint: str = Field(default="", max_length=1_000)


class BoundingBox(BaseModel):
    x: int
    y: int
    width: int
    height: int


class AnalyzeResponse(BaseModel):
    detectedCategory: Category
    detectedObject: str
    confidence: float
    severityScore: int
    suggestedPriority: Priority
    dimensionsEstimated: str | None = None
    suggestedTitle: str
    suggestedDescription: str
    tags: list[str]
    hazardRisk: Literal["Low", "Moderate", "Critical"]
    safetyWarning: str | None = None
    boundingBox: BoundingBox
    model: str
    limitation: str


TRAINING_EXAMPLES: dict[str, list[str]] = {
    "Roads": ["pothole road asphalt crater damaged carriageway", "broken road surface traffic hazard"],
    "Garbage": ["garbage trash waste dumping overflowing bin", "street litter sanitation waste"],
    "Water": ["water leak burst pipe pipeline flooding", "drinking water supply leakage"],
    "Streetlight": ["broken streetlight lamp dark pole electrical", "non functional led light"],
    "Drainage": ["blocked drain sewer waterlogging flood silt", "clogged stormwater drainage"],
    "Infrastructure": ["damaged civic infrastructure public works anomaly", "municipal surface defect"],
}

PROFILES: dict[str, dict[str, object]] = {
    "Roads": {"object": "Road-surface defect", "severity": 82, "priority": "High", "title": "Road Surface Defect Requires Inspection", "description": "The report is classified as a road-surface issue. A municipal engineer should verify the defect and make the site safe.", "tags": ["#RoadSafety", "#RoadMaintenance"], "risk": "Critical", "warning": "Protect road users until the site inspection is complete.", "box": (22, 35, 56, 42)},
    "Garbage": {"object": "Solid-waste accumulation", "severity": 76, "priority": "High", "title": "Solid Waste Requires Collection", "description": "The report is classified as a sanitation issue requiring collection and area cleaning.", "tags": ["#SolidWaste", "#Sanitation"], "risk": "Moderate", "warning": "Use protective sanitation measures during clearance.", "box": (18, 28, 64, 50)},
    "Water": {"object": "Water-supply leakage", "severity": 88, "priority": "High", "title": "Water Pipeline Leakage Requires Repair", "description": "The report is classified as a water-supply issue. Inspect the line and control leakage promptly.", "tags": ["#WaterWastage", "#PipelineRepair"], "risk": "Critical", "warning": "Inspect for road undermining and water-supply loss.", "box": (25, 40, 50, 45)},
    "Streetlight": {"object": "Non-functional streetlight", "severity": 62, "priority": "Medium", "title": "Streetlight Requires Electrical Inspection", "description": "The report is classified as a street-lighting issue requiring an electrical inspection.", "tags": ["#NightSafety", "#ElectricalWing"], "risk": "Moderate", "warning": "Assess pedestrian safety while the location remains unlit.", "box": (35, 15, 30, 60)},
    "Drainage": {"object": "Blocked stormwater drain", "severity": 84, "priority": "High", "title": "Blocked Stormwater Drain Requires Cleaning", "description": "The report is classified as a drainage issue. Inspect for blockage and clear it before rainfall.", "tags": ["#DrainCleaning", "#FloodPrevention"], "risk": "Critical", "warning": "The location may waterlog during rainfall.", "box": (15, 30, 70, 48)},
    "Infrastructure": {"object": "Civic infrastructure anomaly", "severity": 65, "priority": "Medium", "title": "Civic Infrastructure Defect Requires Assessment", "description": "The report needs an on-site municipal engineering assessment.", "tags": ["#PublicWorks", "#MunicipalAudit"], "risk": "Moderate", "warning": None, "box": (20, 25, 60, 50)},
}


@lru_cache(maxsize=1)
def classifier() -> tuple[TfidfVectorizer, LogisticRegression]:
    texts, labels = [], []
    for category, examples in TRAINING_EXAMPLES.items():
        texts.extend(examples)
        labels.extend([category] * len(examples))
    vectorizer = TfidfVectorizer(ngram_range=(1, 2), lowercase=True, stop_words="english")
    matrix = vectorizer.fit_transform(texts)
    model = LogisticRegression(max_iter=1_000, random_state=42).fit(matrix, labels)
    return vectorizer, model


app = FastAPI(title="NagarSetu ML Service", version="0.1.0")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "model": "tfidf-logistic-regression-text-v1"}


@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(payload: AnalyzeRequest) -> AnalyzeResponse:
    # URL may contain a useful filename for sample images; no remote image is downloaded.
    text = f"{payload.user_hint} {payload.image_url}".replace("/", " ").replace("-", " ")
    vectorizer, model = classifier()
    probabilities = model.predict_proba(vectorizer.transform([text]))[0]
    category = str(model.classes_[probabilities.argmax()])
    confidence = round(float(probabilities.max()) * 100, 1)
    profile = PROFILES[category]
    x, y, width, height = profile["box"]  # deterministic UI overlay, not a pixel detection box
    return AnalyzeResponse(
        detectedCategory=category,  # type: ignore[arg-type]
        detectedObject=str(profile["object"]),
        confidence=confidence,
        severityScore=int(profile["severity"]),
        suggestedPriority=profile["priority"],  # type: ignore[arg-type]
        suggestedTitle=str(profile["title"]),
        suggestedDescription=str(profile["description"]),
        tags=list(profile["tags"]),
        hazardRisk=profile["risk"],  # type: ignore[arg-type]
        safetyWarning=profile["warning"],  # type: ignore[arg-type]
        boundingBox=BoundingBox(x=x, y=y, width=width, height=height),
        model="tfidf-logistic-regression-text-v1",
        limitation="Classifies text hints and image URLs only; it does not inspect image pixels.",
    )
