-- Vercel Postgres Schema for BrandKernel Waitlist
-- This schema replaces the Redis implementation to avoid database archiving issues

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(100) DEFAULT 'website',
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create index on position for analytics
CREATE INDEX IF NOT EXISTS idx_waitlist_position ON waitlist(position);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

-- Create a sequence for position counter (starts at 71 to match existing counter)
CREATE SEQUENCE IF NOT EXISTS waitlist_position_seq START WITH 71;

-- Function to get next position
CREATE OR REPLACE FUNCTION get_next_position()
RETURNS INTEGER AS $$
DECLARE
  next_pos INTEGER;
BEGIN
  SELECT nextval('waitlist_position_seq') INTO next_pos;
  RETURN next_pos;
END;
$$ LANGUAGE plpgsql;

-- Function to get total signups count
CREATE OR REPLACE FUNCTION get_total_signups()
RETURNS INTEGER AS $$
DECLARE
  count INTEGER;
BEGIN
  SELECT COUNT(*) INTO count FROM waitlist;
  RETURN count;
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a view for analytics
CREATE OR REPLACE VIEW waitlist_stats AS
SELECT
  COUNT(*) as total_signups,
  MAX(created_at) as last_signup,
  MAX(position) as current_position,
  COUNT(CASE WHEN source = 'website' THEN 1 END) as website_signups,
  COUNT(CASE WHEN source = 'landing' THEN 1 END) as landing_signups,
  COUNT(CASE WHEN source = 'social' THEN 1 END) as social_signups
FROM waitlist;

-- Grant permissions (Vercel handles this automatically, but good for local dev)
-- GRANT ALL PRIVILEGES ON TABLE waitlist TO your_user;
-- GRANT USAGE, SELECT ON SEQUENCE waitlist_position_seq TO your_user;
