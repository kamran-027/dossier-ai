# 📁 DossierAI — Autonomous Account Intelligence & Trigger-Based Outbound Engine

> **Autonomous AI Agent for Sales Professionals, Agency Founders, & Enterprise Outbound Teams.**  
> Transforms raw commercial domains into **Executive Account Dossiers**, **Verified Growth Trigger Signals**, **Multi-Channel Cold Outreach Suites**, and **Objection Battlecards** in seconds.

---

## 🌟 The Problem DossierAI Solves

In commercial B2B sales (logistics, commercial contracting, healthcare clinics, staffing, accounting, and professional services), sales reps suffer from **The Research Tax**:
* Spending **20–30 minutes per account** opening 5+ browser tabs (website, job boards, press releases) just to find a genuine conversation hook.
* Generic AI cold emails (*"Hope this finds you well! I was impressed by your company..."*) get immediately deleted or marked as spam.
* The only outreach that consistently converts at 10%–20% today is **Trigger-First Outreach** based on observable, verified business events (hiring surges, facility expansions, operational friction).

---

## ⚡ Key Capabilities

* **🔍 Autonomous Web & Signal Recon**: Asynchronously crawls target company websites, meta headers, service portfolios, and operating footprint.
* **🎯 Career & Growth Signal Mining**: Scans `/careers` and public postings to detect internal bottlenecks and active hiring surges.
* **📑 1-Page Executive Account Dossier**: Synthesizes company profile, target market, estimated headcount, and operational gaps.
* **✉️ Multi-Channel Trigger-First Outreach Suite**:
  * **Cold Email**: Short, lowercase high-open subject lines and 3-sentence body leading with verified observations (sub-100 words).
  * **LinkedIn Connection Hook**: Sub-300 character high-conversion note.
  * **15-Second Phone Opener**: Pattern-interrupt script for cold calling.
* **🛡️ Pre-Call Objection Battlecard Playbook**: Diagnoses the top 3 subconscious objections the prospect will raise and provides the 1% closer reframe talk track.
* **🖨️ 1-Page PDF / Print Export**: Executive briefing layout ready for instant PDF export and CRM handoff.
* **⚡ 4 Turnkey Commercial Presets**:
  1. **Apex Global Logistics** (Freight & Fleet — Dallas, TX)
  2. **Summit Dental & Facial Aesthetics** (High-Ticket Medical — Scottsdale, AZ)
  3. **Vanguard Commercial Roofing** (Commercial Construction — Austin, TX)
  4. **Heritage Advisory & CPA Partners** (Accounting & Legal — Chicago, IL)

---

## 🏗️ Architecture

```text
dossier-ai/
├── backend/
│   ├── app/
│   │   ├── agent/
│   │   │   ├── graph.py          # LangGraph state machine & synthesis
│   │   │   ├── recon.py          # Asynchronous web crawler & DOM text extractor
│   │   │   ├── presets.py        # 4 turnkey non-tech commercial presets
│   │   │   └── prompts.py        # Trigger-first system prompt & guidelines
│   │   ├── main.py               # FastAPI application (/api/generate-dossier, /api/presets, /api/health)
│   │   └── schemas.py            # Pydantic data contracts
│   ├── .env                      # API keys (GOOGLE_API_KEY / GEMINI_API_KEY)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx        # Next.js 15 App Router root layout
│   │   │   ├── page.tsx          # Split-panel workspace
│   │   │   └── globals.css       # Tailwind & print export styles
│   │   ├── components/
│   │   │   ├── Navbar.tsx        # Developer-grade header & PDF export
│   │   │   ├── PresetSelector.tsx# Turnkey commercial presets bar
│   │   │   ├── InputPanel.tsx    # Recon parameters command center
│   │   │   ├── DossierView.tsx   # Executive Dossier presentation
│   │   │   ├── OutreachSuiteView.tsx # Cold email, LinkedIn & phone tabs
│   │   │   ├── BattlecardsView.tsx # Objection handling playbook
│   │   │   ├── TriggerBadge.tsx  # Monospace colored signal badges
│   │   │   └── CopyButton.tsx    # 1-click clipboard utility
│   │   └── types/
│   │       └── index.ts          # TypeScript interfaces
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── README.md
```

---

## 🚀 Quick Setup & Running

### 1. Start the Backend:
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation will be live at `http://localhost:8000/docs`.

### 2. Start the Frontend:
```bash
cd frontend
bun install   # or npm install
bun dev       # or npm run dev
```
Open `http://localhost:3000` to access the DossierAI workspace.

---

<div align="center">
Built by <b>Cadence Labs</b> // Day 17 Build-in-Public
</div>
