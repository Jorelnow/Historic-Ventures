create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  address text not null,
  status text not null check (status in ('pending', 'researching', 'completed')) default 'pending',
  raw_research_text text,
  ai_narrative_json jsonb,
  customer_email text not null
);
