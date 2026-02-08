export type ReportStatus = 'pending' | 'researching' | 'completed';

export type NarrativePayload = {
  genesis_era: string;
  original_guardians: string;
  architectural_soul: string;
  neighborhood_legacy: string;
};

export type Report = {
  id: string;
  address: string;
  status: ReportStatus;
  raw_research_text: string | null;
  ai_narrative_json: NarrativePayload | null;
  customer_email: string;
};
