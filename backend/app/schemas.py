from typing import List, Optional, Literal
from pydantic import BaseModel, Field


class DossierRequest(BaseModel):
    company_url: str = Field(..., description="Target business domain or URL (e.g. apexlogistics.com)")
    prospect_name: Optional[str] = Field(None, description="Target decision maker name (optional)")
    prospect_role: Optional[str] = Field(None, description="Target decision maker role (e.g. VP of Operations, Owner)")
    my_offering: str = Field(..., description="What you sell / your agency or service offering")
    target_industry: Optional[str] = Field(None, description="Industry hint if known (e.g. Commercial Logistics, Dental)")


class CompanyDNA(BaseModel):
    name: str = Field(..., description="Company or business name")
    domain: str = Field(..., description="Clean company domain")
    industry: str = Field(..., description="Primary industry / sector")
    estimated_size: str = Field(..., description="Estimated size / employee band (e.g. 10-50, 50-200)")
    headquarters: Optional[str] = Field(None, description="Headquarters location (City, State/Country)")
    core_services: List[str] = Field(..., description="Top 3-5 services or products they provide")
    target_audience: str = Field(..., description="Who they sell to (B2B, B2C, regional commercial)")
    executive_summary: str = Field(..., description="2-3 sentence strategic executive profile")


class TriggerSignal(BaseModel):
    type: Literal["hiring", "expansion", "operational", "reputation", "tech"] = Field(
        ..., description="Category of the verified business signal"
    )
    headline: str = Field(..., description="Punchy, concrete signal title (e.g. 'Active Hiring Surge: 4 Field Engineers')")
    observation: str = Field(..., description="Exact verifiable observation mined from their web footprint")
    strategic_relevance: str = Field(..., description="Why this signal makes them primed for your specific service right now")


class OutreachSuite(BaseModel):
    cold_email_subjects: List[str] = Field(..., description="3 high-open-rate, trigger-first subject line variations")
    cold_email_body: str = Field(..., description="Crisp 3-4 sentence trigger-first cold email (no generic AI fluff)")
    linkedin_hook: str = Field(..., description="Sub-300 character high-conversion LinkedIn connection / InMail note")
    phone_call_opener: str = Field(..., description="15-second pattern-interrupt phone script for cold calling")


class ObjectionBattlecard(BaseModel):
    objection: str = Field(..., description="Common prospect objection (e.g. 'We handle this in-house')")
    psychological_root: str = Field(..., description="Why they say this (fear, budget timing, vendor fatigue)")
    reframe_response: str = Field(..., description="Exact talk track top 1% closers use to bypass the objection")


class DossierResponse(BaseModel):
    company_dna: CompanyDNA
    triggers: List[TriggerSignal]
    strategic_angle: str = Field(..., description="The high-probability sales angle mapping their pain to your solution")
    outreach: OutreachSuite
    battlecards: List[ObjectionBattlecard]
    generated_at: str = Field(..., description="ISO 8601 timestamp of analysis")
