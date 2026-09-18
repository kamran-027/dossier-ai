# 📁 DossierAI — Autonomous Account Intelligence & Trigger-Based Outbound Engine

> **Autonomous AI Agent for Sales Professionals, Agency Founders, & Service Providers.**  
> Transforms raw business domains into **Executive Account Dossiers**, **Verified Growth Trigger Signals**, and **Multi-Channel Cold Outreach Suites** in seconds.

---

## 🌟 The Problem DossierAI Solves

In commercial sales (logistics, commercial contracting, healthcare clinics, staffing, accounting, and B2B services), sales reps suffer from **The Research Tax**:
* Spending **20–30 minutes per account** opening 6 browser tabs (website, job boards, press releases) to find a genuine hook.
* Generic AI cold emails (*"Hope you are having a great week! Saw you are a leader..."*) get deleted or flagged as spam.
* The only outreach that converts at 10%–20% today is **Trigger-First Outreach** based on observable, verified business events (hiring surges, regional expansions, operational bottlenecks).

---

## ⚡ Key Capabilities

* **🔍 Autonomous Web & Signal Recon**: Asynchronously crawls target company websites, meta headers, services, and team DNA.
* **🎯 Career & Growth Signal Mining**: Scans `/careers` and job boards to detect internal team bottlenecks and active expansion initiatives.
* **📑 1-Page Executive Account Dossier**: Synthesizes company profile, target market, estimated scale, and operational gaps.
* **✉️ Multi-Channel Outreach Suite**:
  * **Trigger-First Cold Email**: 3–4 tight sentences leading with verified observations.
  * **LinkedIn Connection Hook**: Sub-300 character high-conversion message.
  * **15-Second Phone Opener**: Pattern interrupt script for cold calling.
* **🛡️ Pre-Call Objection Battlecard Playbook**: Predicts the top 3 objections this specific business will raise and provides 1% closer reframe talk tracks.
* **🖨️ 1-Page PDF / Print Brief**: Generates an executive briefing layout ready for download or team handoff.

---

## 🏗️ Architecture

```text
dossier-ai/
├── backend/
│   ├── app/
│   │   ├── agent/
│   │   │   ├── graph.py          # LangGraph multi-agent state machine
│   │   │   ├── nodes.py          # Recon, Signal Miner, Synthesizer nodes
│   │   │   ├── presets.py        # 4 real-world non-tech industry demo presets
│   │   │   └── prompts.py        # Structured Pydantic extraction prompts
│   │   ├── main.py               # FastAPI application & endpoints
│   │   └── schemas.py            # Pydantic data contracts
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── DossierView.tsx   # Executive Dossier & Trigger badges
│   │   │   ├── OutreachView.tsx  # Multi-channel copy suite
│   │   │   ├── Battlecards.tsx   # Objection handling matrix
│   │   │   └── Navbar.tsx        # Brand & theme toggle
│   │   ├── layout.tsx
│   │   └── page.tsx              # Split-panel workspace
│   └── package.json
└── README.md
```

---

## 🚀 Quick Setup (Coming Soon)

### Backend:
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

---

<div align="center">
Built as part of <b>Cadence Labs</b>.
</div>
