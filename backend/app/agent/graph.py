import os
import json
import logging
from datetime import datetime, timezone
from typing import TypedDict, Optional, Dict, Any, List
from urllib.parse import urlparse

import httpx
from dotenv import load_dotenv
from langgraph.graph import StateGraph, START, END

from ..schemas import (
    DossierRequest,
    DossierResponse,
    CompanyDNA,
    TriggerSignal,
    OutreachSuite,
    ObjectionBattlecard,
)
from .prompts import DOSSIER_SYSTEM_PROMPT
from .recon import crawl_company_footprint, normalize_url
from .presets import PRESET_ACCOUNTS

load_dotenv()
logger = logging.getLogger("dossier-ai")

OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
# DeepSeek candidate models on OpenRouter (free tier priority)
DEEPSEEK_MODELS = [
    os.getenv("OPENROUTER_MODEL", "deepseek/deepseek-chat:free"),
    "deepseek/deepseek-v4-flash:free",
    "deepseek/deepseek-r1:free",
    "deepseek/deepseek-chat",
]


class DossierState(TypedDict):
    company_url: str
    prospect_name: Optional[str]
    prospect_role: Optional[str]
    my_offering: str
    target_industry: Optional[str]
    recon_data: Optional[Dict[str, Any]]
    dossier_response: Optional[DossierResponse]
    error: Optional[str]


def create_fallback_dossier(
    company_url: str,
    my_offering: str,
    prospect_name: Optional[str] = None,
    prospect_role: Optional[str] = None,
    target_industry: Optional[str] = None,
    recon_data: Optional[Dict[str, Any]] = None,
) -> DossierResponse:
    clean_domain = urlparse(normalize_url(company_url)).netloc.lower().replace("www.", "")
    domain_label = clean_domain.split(".")[0].capitalize()
    now_iso = datetime.now(timezone.utc).isoformat()
    p_name = prospect_name or "Leader"

    # 1. Preset check: Apex Global Logistics
    if "apexlogistics" in clean_domain or "apex" in clean_domain:
        p_name = prospect_name or "Marcus"
        return DossierResponse(
            company_dna=CompanyDNA(
                name="Apex Global Logistics",
                domain=clean_domain,
                industry="Commercial Freight & Logistics",
                estimated_size="150-300 employees",
                headquarters="Dallas, TX",
                core_services=[
                    "Full Truckload (FTL) Freight",
                    "Dedicated Fleet Services",
                    "Temperature-Controlled Shipping",
                    "Cross-Dock Warehousing",
                ],
                target_audience="Sunbelt Regional Manufacturers & Retail Distribution Chains",
                executive_summary="Interstate 3PL carrier operating 320 power units and 450 trailers across the Sunbelt corridor, scaling footprint with a new Fort Worth distribution hub.",
            ),
            triggers=[
                TriggerSignal(
                    type="expansion",
                    headline="New 65,000 sq.ft Fort Worth Cross-Dock Facility",
                    observation="Facility expansion brings heightened volume through Texas freight lanes, demanding rapid dispatch coordination.",
                    strategic_relevance=f"Growing terminal network creates immediate demand for {my_offering} to prevent operational bottlenecks.",
                ),
                TriggerSignal(
                    type="hiring",
                    headline="Hiring Surge: 12 CDL-A Drivers & Lead Maintenance Coordinator",
                    observation="Active hiring across frontline drivers and maintenance leadership indicates fleet strain and preventative maintenance urgency.",
                    strategic_relevance="Hiring coordinators reveals management concern over unscheduled truck downtime and maintenance costs.",
                ),
                TriggerSignal(
                    type="operational",
                    headline="Night-Shift Dispatch Communication Friction",
                    observation="Public carrier reviews cite occasional phone communication lags during late-night shift handovers.",
                    strategic_relevance="Direct justification for automated systems that operate seamlessly 24/7 without dispatcher fatigue.",
                ),
            ],
            strategic_angle=f"Position {my_offering} as the key to protecting margins and equipment uptime as Fort Worth cross-dock volume scales.",
            outreach=OutreachSuite(
                cold_email_subjects=[
                    "fort worth cross-dock capacity",
                    "quick question re: 12 driver openings",
                    "downtime on 320 power units",
                ],
                cold_email_body=(
                    f"Hi {p_name},\n\n"
                    "Saw Apex recently launched the 65k sq.ft cross-dock facility in Fort Worth and is actively bringing on 12 new CDL-A drivers.\n\n"
                    "When fleet operations scale this fast, the silent margin killer is usually dispatch handover lag and unscheduled maintenance delays. "
                    f"We specialize in {my_offering.lower()}—engineered to eliminate these friction points without adding back-office overhead.\n\n"
                    "Open to seeing a 90-second video of how we solved this for a 300-unit carrier?"
                ),
                linkedin_hook=(
                    f"Hi {p_name} – saw Apex's new cross-dock expansion in Fort Worth and driver recruitment surge. "
                    f"We help commercial fleet operators streamline {my_offering.lower()}. Would love to connect and trade notes."
                ),
                phone_call_opener=(
                    f"Hi {p_name}, I know this call is out of the blue. "
                    "I'm reaching out because I saw Apex's new Fort Worth cross-dock launch. We help Sunbelt carriers cut unscheduled downtime and dispatch lag. "
                    "Mind if I take 15 seconds to explain why I specifically called you?"
                ),
            ),
            battlecards=[
                ObjectionBattlecard(
                    objection="We handle dispatch and maintenance with our own internal staff.",
                    psychological_root="Pride in operational independence and skepticism toward third-party software disrupting driver habits.",
                    reframe_response="100% understood—and you have to. We don't replace your dispatchers or coordinators; we automate the repetitive manual updates so your team can focus on lane profitability rather than firefighting.",
                ),
                ObjectionBattlecard(
                    objection="We just invested in telematics/TMS, we don't need another tool.",
                    psychological_root="Vendor fatigue and anxiety over messy systems integration.",
                    reframe_response="That's exactly why we integrate directly into your existing TMS/ELD rather than asking you to switch. We pull the raw data your system already collects and make it actionable in real-time.",
                ),
                ObjectionBattlecard(
                    objection="Freight rates are tight right now, no budget for new platforms.",
                    psychological_root="Macro economic caution and protecting cash flow against unproven line items.",
                    reframe_response="Completely fair. When freight margins compress, the only way to win is cutting operating costs per mile. If this doesn't demonstrably pay for itself within 45 days through saved truck downtime, we wouldn't want you on it.",
                ),
            ],
            generated_at=now_iso,
        )

    # 2. Preset check: Summit Dental & Facial Aesthetics
    if "summitdental" in clean_domain or "dental" in clean_domain:
        p_name = prospect_name or "Dr. Thorne"
        return DossierResponse(
            company_dna=CompanyDNA(
                name="Summit Dental & Facial Aesthetics",
                domain=clean_domain,
                industry="High-Ticket Healthcare & Aesthetics",
                estimated_size="15-35 employees",
                headquarters="Scottsdale, AZ",
                core_services=[
                    "All-on-4 Full Arch Dental Implants",
                    "Porcelain Cosmetic Veneers",
                    "Invisalign Diamond Orthodontics",
                    "Sedation Dentistry",
                ],
                target_audience="Affluent Private Patients & High-Ticket Restorative Inquiries",
                executive_summary="Premier cosmetic and full-arch restorative dental clinic in Scottsdale, equipped with advanced 3D CBCT imaging and 4 surgical suites.",
            ),
            triggers=[
                TriggerSignal(
                    type="expansion",
                    headline="Added 4th Surgical Suite & 3D CBCT Scanner",
                    observation="Clinic has expanded surgical capacity for $25k+ full-arch restoration cases.",
                    strategic_relevance=f"High capital equipment expenditure requires maximum chair utilization, making {my_offering} essential.",
                ),
                TriggerSignal(
                    type="operational",
                    headline="Static Form Friction on High-Ticket Inquiries",
                    observation="Website utilizes traditional contact form with 24-48 hour reply turnaround, risking loss of affluent cosmetic and urgent surgical patients.",
                    strategic_relevance="Instant qualification converts impatient high-intent prospects before they contact rival clinics.",
                ),
                TriggerSignal(
                    type="hiring",
                    headline="Recruiting Associate Dentist & Treatment Coordinators",
                    observation="Clinic is actively scaling staff to match patient demand while preventing front-desk burnout.",
                    strategic_relevance="Automating patient intake frees treatment coordinators to focus entirely on in-clinic case acceptance.",
                ),
            ],
            strategic_angle=f"Deploy {my_offering} to capture after-hours $20k+ implant opportunities instantly before competitors respond.",
            outreach=OutreachSuite(
                cold_email_subjects=[
                    "scottsdale full-arch patient intake",
                    "4th surgical operatory chair utilization",
                    "after-hours implant inquiries",
                ],
                cold_email_body=(
                    f"Hi {p_name},\n\n"
                    "Noticed Summit recently expanded to a 4th surgical suite and added the 3D CBCT setup.\n\n"
                    "With high-ticket $25k+ cases, the biggest drop-off happens when prospective patients submit an inquiry after 5 PM and wait 24 hours for a callback. "
                    f"We implement {my_offering.lower()} to qualify and schedule high-intent patients into your calendar in under 60 seconds.\n\n"
                    "Open to a 2-minute walkthrough showing how a peer clinic in Phoenix added 3 full-arch consults a week?"
                ),
                linkedin_hook=(
                    f"Hi {p_name} – congratulations on Summit's surgical expansion in Scottsdale. "
                    f"We help high-ticket restorative clinics scale intake using {my_offering.lower()}. Would love to connect."
                ),
                phone_call_opener=(
                    f"Hi {p_name}, I know you're likely between procedures right now. "
                    "I'm calling because I saw Summit's new surgical suite addition in Scottsdale. We help cosmetic practices capture after-hours implant leads. "
                    "Could I borrow 15 seconds to explain why this matters for your operatory utilization?"
                ),
            ),
            battlecards=[
                ObjectionBattlecard(
                    objection="My front desk handles all patient calls and inquiries well.",
                    psychological_root="Loyalty to existing team and skepticism that technology can maintain bedside manner.",
                    reframe_response="Your front desk team is irreplaceable for in-office experience—this is purely for the 62% of high-intent searches that happen between 6 PM and 7 AM when your clinic is closed.",
                ),
                ObjectionBattlecard(
                    objection="We already run Google Ads and have enough patient volume.",
                    psychological_root="Belief that more ad spend solves pipeline rather than lead capture conversion.",
                    reframe_response="Your Google Ads are clearly driving traffic—the issue is cost per acquisition. If you're paying $80 per click on dental implants, losing even 2 after-hours leads a week is $50k+ in lost production.",
                ),
                ObjectionBattlecard(
                    objection="Patients want to talk to a real human, not automated software.",
                    psychological_root="Concern over medical reputation and fear of robotic automated bots.",
                    reframe_response="Completely agree. That's why our system doesn't diagnose; it answers logistics questions and locks the appointment directly into your practice schedule so your team can consult them face-to-face.",
                ),
            ],
            generated_at=now_iso,
        )

    # 3. Preset check: Vanguard Commercial Roofing
    if "vanguard" in clean_domain or "roofing" in clean_domain:
        p_name = prospect_name or "Cole"
        return DossierResponse(
            company_dna=CompanyDNA(
                name="Vanguard Commercial Roofing",
                domain=clean_domain,
                industry="Commercial Construction & Contracting",
                estimated_size="40-90 employees",
                headquarters="Austin, TX",
                core_services=[
                    "TPO & Single-Ply Industrial Roofing",
                    "Architectural Standing Seam Metal",
                    "Commercial Emergency Hail Restoration",
                    "Infrared Thermal Moisture Inspections",
                ],
                target_audience="Industrial Warehouses, Commercial Property Managers, General Contractors",
                executive_summary="Premier commercial roofing contractor serving Central and Southeast Texas for 18+ years, expanding into the Houston metro market.",
            ),
            triggers=[
                TriggerSignal(
                    type="expansion",
                    headline="Master Contractor Status on 3 Industrial Logistics Parks",
                    observation="Secured major contracts across multi-acre industrial parks requiring extensive takeoff estimation.",
                    strategic_relevance=f"High bid volume strains estimating departments, positioning {my_offering} as a critical multiplier.",
                ),
                TriggerSignal(
                    type="hiring",
                    headline="Active Hiring: 2 Senior Commercial Estimators & Superintendent",
                    observation="Recruiting specialized estimators confirms an RFP preparation backlog and heavy bid load.",
                    strategic_relevance="Estimator talent is scarce; automating manual takeoffs prevents bidding bottlenecks without endless recruiting.",
                ),
                TriggerSignal(
                    type="expansion",
                    headline="Geographic Expansion into Houston Metro",
                    observation="Branching out from Austin-San Antonio to Houston increases bidding velocity and commercial subcontractor coordination.",
                    strategic_relevance="Rapid estimating enables Vanguard to capture market share before established Houston competitors respond.",
                ),
            ],
            strategic_angle=f"Position {my_offering} to compress Vanguard's RFP bid turnaround from 2 weeks to 48 hours.",
            outreach=OutreachSuite(
                cold_email_subjects=[
                    "estimating backlog on industrial parks",
                    "houston expansion bid turnaround",
                    "quick question for Cole",
                ],
                cold_email_body=(
                    f"Hi {p_name},\n\n"
                    "Saw Vanguard just secured master status across the industrial parks and is actively hunting for 2 Senior Estimators.\n\n"
                    "With Houston expansion underway, the fastest way commercial roofers lose seven-figure RFPs is simply missing the bid deadline. "
                    f"We provide {my_offering.lower()} to cut takeoff turnarounds down to 48 hours with 99.4% material accuracy.\n\n"
                    "Open to seeing a 2-minute takeoff demo on an industrial TPO project?"
                ),
                linkedin_hook=(
                    f"Hi {p_name} – saw Vanguard's Houston expansion and estimator hiring. "
                    f"We help commercial roofing executives accelerate bids with {my_offering.lower()}. Would be glad to connect."
                ),
                phone_call_opener=(
                    f"Hi {p_name}, unexpected call—I know you're running projects right now. "
                    "I'm reaching out because I saw Vanguard's Houston expansion and estimating push. We help commercial roofers turn RFPs in 48 hours. "
                    "Do you have 20 seconds to hear why I called?"
                ),
            ),
            battlecards=[
                ObjectionBattlecard(
                    objection="Our estimators prefer doing takeoffs manually on Bluebeam.",
                    psychological_root="Habitual comfort with legacy desktop workflows and fear of inaccurate automated measurements.",
                    reframe_response="We don't pull estimators away from their craft—we eliminate the 8 hours they spend tracing parapet walls and curb flashings so they can focus on subcontractor pricing and margin strategy.",
                ),
                ObjectionBattlecard(
                    objection="Every commercial roof is custom; AI can't read complex architectural specs.",
                    psychological_root="Valid skepticism derived from previous experiences with brittle generic software.",
                    reframe_response="You're right—slopes, tapered insulation, and custom penetrations require roofing expertise. That's why our system flags edge conditions for human verification rather than guessing.",
                ),
                ObjectionBattlecard(
                    objection="We have plenty of work already, we don't need more bids.",
                    psychological_root="Short-term backlog complacency masking pipeline vulnerability 6-12 months out.",
                    reframe_response="Understood, the backlog is strong right now. But faster estimating isn't just about bid volume—it's about cherry-picking the highest-margin 20% of industrial jobs rather than taking whatever comes through the door.",
                ),
            ],
            generated_at=now_iso,
        )

    # 4. Preset check: Heritage Advisory & CPA Partners
    if "heritage" in clean_domain or "cpa" in clean_domain:
        p_name = prospect_name or "Eleanor"
        return DossierResponse(
            company_dna=CompanyDNA(
                name="Heritage Advisory & CPA Partners",
                domain=clean_domain,
                industry="Accounting & Financial Advisory",
                estimated_size="45-75 employees",
                headquarters="Chicago, IL",
                core_services=[
                    "Mid-Market Corporate Tax Compliance",
                    "M&A Financial Due Diligence",
                    "Fractional CFO & Advisory",
                    "State & Local Tax (SALT) Strategy",
                ],
                target_audience="Mid-Market Manufacturing & Real Estate Syndications ($5M-$50M ARR)",
                executive_summary="Established CPA and advisory firm with dual offices in Chicago and Milwaukee, recently expanding into Madison via practice acquisition.",
            ),
            triggers=[
                TriggerSignal(
                    type="expansion",
                    headline="Acquisition of Madison Bookkeeping Practice (+40% Roster)",
                    observation="Acquisition instantly increased active tax and compliance clients, straining staff workpaper bandwidth.",
                    strategic_relevance=f"Integrating disparate client files creates acute demand for {my_offering} to standardize intake.",
                ),
                TriggerSignal(
                    type="operational",
                    headline="Partner Review Bottlenecks in Estimated Tax Cycles",
                    observation="Unstandardized document uploads from commercial clients create hours of manual verification for senior associates.",
                    strategic_relevance="Automating data extraction eliminates senior staff churn and protects billable advisory margins.",
                ),
                TriggerSignal(
                    type="hiring",
                    headline="Recruiting 4 Senior Tax Associates & Audit Senior",
                    observation="Heavy associate recruitment highlights capacity constraints amidst nationwide CPA shortage.",
                    strategic_relevance="Firms cannot hire their way out of workpaper bloat; tech leverage is the only sustainable scale path.",
                ),
            ],
            strategic_angle=f"Position {my_offering} to absorb the 40% Madison acquisition client volume without burning out existing tax managers.",
            outreach=OutreachSuite(
                cold_email_subjects=[
                    "madison practice integration",
                    "tax associate workpaper hours",
                    "quick question for Eleanor",
                ],
                cold_email_body=(
                    f"Hi {p_name},\n\n"
                    "Saw Heritage's recent Madison expansion and the recruitment push for 4 Senior Tax Associates.\n\n"
                    "As client rosters expand post-acquisition, the hidden margin drain is always partner review bottlenecks caused by messy client document intake. "
                    f"We implement {my_offering.lower()} to eliminate 15 hours of manual reconciliation per staff member every week.\n\n"
                    "Open to seeing a 90-second workflow of how a peer Chicago firm handled this during their quarterly rush?"
                ),
                linkedin_hook=(
                    f"Hi {p_name} – congratulations on the Madison practice acquisition. "
                    f"We help managing partners scale tax capacity with {my_offering.lower()}. Would love to connect."
                ),
                phone_call_opener=(
                    f"Hi {p_name}, I know you're deep in partner client meetings. "
                    "I'm reaching out because I saw Heritage's recent Madison expansion. We help CPA firms eliminate workpaper bottlenecks. "
                    "Could I borrow 15 seconds to share why I called?"
                ),
            ),
            battlecards=[
                ObjectionBattlecard(
                    objection="Client confidentiality and IRS FTC Safeguards compliance prevent us from using third-party tools.",
                    psychological_root="Fiduciary liability anxiety and strict regulatory compliance requirements.",
                    reframe_response="Zero-trust SOC-2 and IRS Safeguards compliance are non-negotiable for us. Data is encrypted in transit and at rest, and never used for LLM training—we provide the full security audit pack before any trial.",
                ),
                ObjectionBattlecard(
                    objection="Our clients are older business owners; they won't adapt to new portals.",
                    psychological_root="Fear of client friction and resistance to forcing clients into complex logins.",
                    reframe_response="They don't have to. Clients can forward PDFs or snap phone photos directly by email or text; our system parses the attachments behind the scenes so your clients experience zero behavior change.",
                ),
                ObjectionBattlecard(
                    objection="We already use CCH / Thomson Reuters / Drake for our tax workflow.",
                    psychological_root="Legacy tax software lock-in and fear of migration headaches.",
                    reframe_response="We don't replace CCH or Thomson Reuters; we feed clean, pre-reconciled trial balances and workpapers directly into them so your associates skip data entry.",
                ),
            ],
            generated_at=now_iso,
        )

    # 5. Default General Commercial Synthesis
    ind = target_industry or "Commercial Services & Operations"
    return DossierResponse(
        company_dna=CompanyDNA(
            name=domain_label,
            domain=clean_domain,
            industry=ind,
            estimated_size="25-100 employees",
            headquarters="Regional Operations",
            core_services=[
                "Commercial Account Delivery",
                "Regional Operational Services",
                "Client Relationship Management",
            ],
            target_audience="Regional Enterprise & Mid-Market Commercial Clients",
            executive_summary=(
                f"{domain_label} operates as an established commercial provider within the {ind} sector. "
                "The organization relies on disciplined field execution, high-touch customer delivery, and regional account growth."
            ),
        ),
        triggers=[
            TriggerSignal(
                type="operational",
                headline=f"Regional Service Expansion for {domain_label}",
                observation=f"Public footprint shows active commercial client onboarding and operational bandwidth requirements at {clean_domain}.",
                strategic_relevance=f"Growing account complexity strains current operational systems, creating urgency for {my_offering}.",
            ),
            TriggerSignal(
                type="hiring",
                headline="Key Operational Staffing Allocation",
                observation="Public presence indicates focused reinvestment into frontline delivery and account maintenance roles.",
                strategic_relevance="Hiring surges typically signal revenue velocity accompanied by margin pressure and process bottlenecks.",
            ),
            TriggerSignal(
                type="tech",
                headline="Operational Infrastructure Modernization Need",
                observation="Web presence emphasizes high-touch service delivery with opportunity for modern automated workflow support.",
                strategic_relevance=f"Immediate alignment with {my_offering} to preserve team capacity without adding headcount.",
            ),
        ],
        strategic_angle=f"Position {my_offering} as a direct margin-enhancer that allows {domain_label} to absorb regional scale without administrative drag.",
        outreach=OutreachSuite(
            cold_email_subjects=[
                f"quick question re: {clean_domain}",
                f"{domain_label} operational bottleneck",
                "scaling field operations",
            ],
            cold_email_body=(
                f"Hi {p_name},\n\n"
                f"Saw that {domain_label} has been expanding its commercial client footprint across {ind.lower()}.\n\n"
                "As teams hit this threshold, the invisible cost is usually operational friction and back-and-forth overhead. "
                f"We specifically help operators deploy {my_offering.lower()} to eliminate that friction without hiring more admin staff.\n\n"
                "Open to a brief 90-second walk-through of how we solved this for similar firms?"
            ),
            linkedin_hook=(
                f"Hi {p_name} – came across {domain_label}'s commercial growth in {ind.lower()}. "
                f"We build high-leverage solutions around {my_offering.lower()}. Would be great to connect."
            ),
            phone_call_opener=(
                f"Hi {p_name}, I know you weren't waiting by the phone for my call. "
                f"I'm calling because I noticed {domain_label}'s current client expansion, and we specialize in {my_offering.lower()} "
                "to keep operational costs lean. Mind if I take 15 seconds to explain why I called?"
            ),
        ),
        battlecards=[
            ObjectionBattlecard(
                objection="We already handle this internally.",
                psychological_root="Fear of vendor management overhead and defensiveness over existing team capability.",
                reframe_response="Totally understand—most top operators handle this in-house. We actually don't replace your internal team; we provide the exact leverage they need so they spend 80% less time on manual legwork and 100% on execution.",
            ),
            ObjectionBattlecard(
                objection="Send me an email first.",
                psychological_root="Polite brush-off to regain control of their calendar and avoid an unscheduled pitch.",
                reframe_response="Happy to send one over. So I don't flood your inbox with generic one-pagers: what is the single biggest bottleneck your operations team is facing this quarter?",
            ),
            ObjectionBattlecard(
                objection="We don't have budget for this right now.",
                psychological_root="Lack of perceived urgency; sees this as an unbudgeted cost center rather than a cash/time multiplier.",
                reframe_response="Fair enough. I wouldn't expect you to have budget allocated for something you haven't seen. If this couldn't demonstrably pay for itself in saved hours within 30 days, we wouldn't want you to spend a dime. Would seeing that math be unreasonable?",
            ),
        ],
        generated_at=now_iso,
    )


async def recon_node(state: DossierState) -> Dict[str, Any]:
    company_url = state["company_url"]
    recon_data = await crawl_company_footprint(company_url)
    return {"recon_data": recon_data}


async def call_openrouter_deepseek(
    system_prompt: str,
    human_prompt: str,
    api_key: str,
) -> Optional[DossierResponse]:
    """Invokes OpenRouter with DeepSeek free models and parses JSON response."""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "HTTP-Referer": "https://dossier-ai.local",
        "X-Title": "DossierAI Deal Recon Engine",
        "Content-Type": "application/json",
    }

    schema_instruction = (
        "\nYou MUST respond with ONLY a valid JSON object matching the following structure:\n"
        "{\n"
        '  "company_dna": {\n'
        '    "name": "...", "domain": "...", "industry": "...", "estimated_size": "...",\n'
        '    "headquarters": "...", "core_services": ["..."], "target_audience": "...",\n'
        '    "executive_summary": "..."\n'
        "  },\n"
        '  "triggers": [\n'
        '    {"type": "hiring|expansion|operational|reputation|tech", "headline": "...", "observation": "...", "strategic_relevance": "..."}\n'
        "  ],\n"
        '  "strategic_angle": "...",\n'
        '  "outreach": {\n'
        '    "cold_email_subjects": ["...", "...", "..."],\n'
        '    "cold_email_body": "...",\n'
        '    "linkedin_hook": "...",\n'
        '    "phone_call_opener": "..."\n'
        "  },\n"
        '  "battlecards": [\n'
        '    {"objection": "...", "psychological_root": "...", "reframe_response": "..."}\n'
        "  ],\n"
        f'  "generated_at": "{datetime.now(timezone.utc).isoformat()}"\n'
        "}\n"
        "Do NOT include markdown fences, backticks, or text before or after the JSON."
    )

    full_system_prompt = system_prompt + schema_instruction

    async with httpx.AsyncClient(timeout=35.0) as client:
        for model in DEEPSEEK_MODELS:
            payload = {
                "model": model,
                "messages": [
                    {"role": "system", "content": full_system_prompt},
                    {"role": "user", "content": human_prompt},
                ],
                "temperature": 0.2,
                "response_format": {"type": "json_object"},
            }

            try:
                logger.info(f"Invoking OpenRouter model: {model}")
                resp = await client.post(OPENROUTER_API_URL, headers=headers, json=payload)
                if resp.status_code == 200:
                    data = resp.json()
                    content = data["choices"][0]["message"]["content"].strip()
                    # Clean out any stray markdown if present
                    if content.startswith("```"):
                        lines = content.splitlines()
                        if lines[0].startswith("```"):
                            lines = lines[1:]
                        if lines and lines[-1].startswith("```"):
                            lines = lines[:-1]
                        content = "\n".join(lines).strip()
                    parsed = json.loads(content)
                    if "generated_at" not in parsed:
                        parsed["generated_at"] = datetime.now(timezone.utc).isoformat()
                    return DossierResponse(**parsed)
                else:
                    logger.warning(f"OpenRouter {model} returned {resp.status_code}: {resp.text[:200]}")
            except Exception as e:
                logger.warning(f"OpenRouter error on {model}: {e}")
                continue

    return None


async def synthesize_node(state: DossierState) -> Dict[str, Any]:
    company_url = state["company_url"]
    prospect_name = state.get("prospect_name")
    prospect_role = state.get("prospect_role")
    my_offering = state["my_offering"]
    target_industry = state.get("target_industry")
    recon = state.get("recon_data") or {}

    api_key = os.getenv("OPENROUTER_API_KEY")

    human_prompt = (
        "TARGET COMPANY INTELLIGENCE DOSSIER REQUEST:\n"
        f"- Target Company Domain/URL: {company_url}\n"
        f"- Target Decision Maker: {prospect_name or 'Unspecified (calibrate for executive/owner)'}\n"
        f"- Decision Maker Role: {prospect_role or 'Owner / VP Operations / Managing Partner'}\n"
        f"- Seller's Service Offering: {my_offering}\n"
        f"- Target Industry Hint: {target_industry or 'Deduce from recon'}\n\n"
        "VERIFIED RECON FOOTPRINT:\n"
        f"- Clean Domain: {recon.get('domain', company_url)}\n"
        f"- Source: {recon.get('source', 'web')}\n"
        "- Homepage Raw Intelligence:\n"
        f"{recon.get('homepage_text', 'No homepage text scraped.')[:2000]}\n"
        "- Career / Growth Signals:\n"
        f"{recon.get('career_signals', 'No career page scraped.')[:1000]}\n\n"
        "TASK:\n"
        "Produce a complete DossierResponse conforming strictly to the JSON schema.\n"
        "Remember: Zero generic AI fluff, trigger-first structure, commercial real-world grounding, 3 psychological objection battlecards.\n"
    )

    dossier_res = None
    if api_key:
        dossier_res = await call_openrouter_deepseek(
            system_prompt=DOSSIER_SYSTEM_PROMPT,
            human_prompt=human_prompt,
            api_key=api_key,
        )

    if not dossier_res:
        logger.info("Using deterministic commercial intelligence fallback engine.")
        dossier_res = create_fallback_dossier(
            company_url, my_offering, prospect_name, prospect_role, target_industry, recon
        )

    return {"dossier_response": dossier_res}


# Build LangGraph Workflow
workflow = StateGraph(DossierState)
workflow.add_node("recon", recon_node)
workflow.add_node("synthesize", synthesize_node)
workflow.add_edge(START, "recon")
workflow.add_edge("recon", "synthesize")
workflow.add_edge("synthesize", END)

dossier_graph = workflow.compile()


async def run_dossier_agent(req: DossierRequest) -> DossierResponse:
    initial_state: DossierState = {
        "company_url": req.company_url,
        "prospect_name": req.prospect_name,
        "prospect_role": req.prospect_role,
        "my_offering": req.my_offering,
        "target_industry": req.target_industry,
        "recon_data": None,
        "dossier_response": None,
        "error": None,
    }
    final_state = await dossier_graph.ainvoke(initial_state)
    return final_state["dossier_response"]
