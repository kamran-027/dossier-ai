import logging
from datetime import datetime, timezone
from typing import List, Dict, Any

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from .schemas import DossierRequest, DossierResponse
from .agent.presets import PRESET_ACCOUNTS
from .agent.graph import run_dossier_agent

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("dossier-api")

app = FastAPI(
    title="DossierAI API",
    description="Autonomous Account Intelligence & Multi-Channel Trigger-First Cold Outbound Engine",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health", tags=["Health"])
async def health_check() -> Dict[str, Any]:
    return {
        "status": "healthy",
        "service": "DossierAI Core Engine",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/api/presets", tags=["Presets"])
async def get_presets() -> List[Dict[str, Any]]:
    """Returns turnkey commercial presets for 1-click demo and evaluation."""
    presets_data = []
    for p in PRESET_ACCOUNTS:
        presets_data.append({
            "id": p["id"],
            "title": p["title"],
            "category": p["category"],
            "company_url": p["company_url"],
            "prospect_name": p["prospect_name"],
            "prospect_role": p["prospect_role"],
            "my_offering": p["my_offering"],
            "target_industry": p["target_industry"],
            "mock_recon_text": p["mock_recon_text"].strip(),
        })
    return presets_data


@app.post("/api/generate-dossier", response_model=DossierResponse, tags=["Dossier"])
async def generate_dossier(request: DossierRequest) -> DossierResponse:
    """Runs autonomous reconnaissance and synthesizes an Executive Account Dossier."""
    if not request.company_url.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="company_url must be provided.",
        )
    if not request.my_offering.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="my_offering is required to calibrate outbound copy.",
        )

    try:
        logger.info(f"Initiating dossier generation for: {request.company_url}")
        dossier = await run_dossier_agent(request)
        return dossier
    except Exception as e:
        logger.exception("Failed generating dossier")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Dossier synthesis failure: {str(e)}",
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
