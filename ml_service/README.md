# NagarSetu Python ML service

This FastAPI service supplies the report page's `/ml-api/analyze` request.

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r ml_service/requirements.txt
python -m uvicorn ml_service.main:app --reload --port 8000
```

The initial model is a small TF-IDF + logistic-regression classifier over the reporter's category hint and image URL/filename. It is deliberately explicit about its limitation: it does not perform pixel-level computer vision. Use a trained, evaluated vision model and retain a human review step before operational use.
