-- Fewer Better Dates — waitlist signups (Cloudflare D1)
-- Run once: wrangler d1 execute fewer-better-dates --file=schema.sql

CREATE TABLE IF NOT EXISTS signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  city TEXT,
  landing_city TEXT,
  source_page TEXT,
  landing_variant TEXT,

  age_range TEXT,
  local_area TEXT,
  goal TEXT,
  gender TEXT,
  looking_to_meet TEXT,
  frustration TEXT,

  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  email TEXT NOT NULL,
  ip_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_signups_city ON signups(city);
CREATE INDEX IF NOT EXISTS idx_signups_created_at ON signups(created_at);
CREATE INDEX IF NOT EXISTS idx_signups_city_created_at ON signups(city, created_at);
CREATE UNIQUE INDEX IF NOT EXISTS idx_signups_email_city ON signups(email, city);
