export interface CompanyDNA {
  name: string;
  domain: string;
  industry: string;
  estimated_size: string;
  headquarters?: string | null;
  core_services: string[];
  target_audience: string;
  executive_summary: string;
}

export interface TriggerSignal {
  type: "hiring" | "expansion" | "operational" | "reputation" | "tech";
  headline: string;
  observation: string;
  strategic_relevance: string;
}

export interface OutreachSuite {
  cold_email_subjects: string[];
  cold_email_body: string;
  linkedin_hook: string;
  phone_call_opener: string;
}

export interface ObjectionBattlecard {
  objection: string;
  psychological_root: string;
  reframe_response: string;
}

export interface DossierResponse {
  company_dna: CompanyDNA;
  triggers: TriggerSignal[];
  strategic_angle: string;
  outreach: OutreachSuite;
  battlecards: ObjectionBattlecard[];
  generated_at: string;
}

export interface PresetAccount {
  id: string;
  title: string;
  category: string;
  company_url: string;
  prospect_name: string;
  prospect_role: string;
  my_offering: string;
  target_industry: string;
  mock_recon_text: string;
}
