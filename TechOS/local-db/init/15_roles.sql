-- Web anonymous role for PostgREST (run after schema exists)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'web_anon') THEN
    CREATE ROLE web_anon NOLOGIN;
  END IF;
END$$;

GRANT USAGE ON SCHEMA public TO web_anon;
GRANT SELECT ON TABLE public.institutions TO web_anon;
GRANT SELECT ON TABLE public.job_offers TO web_anon;
GRANT SELECT, INSERT ON TABLE public.job_applications TO web_anon;

DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT sequence_schema, sequence_name FROM information_schema.sequences WHERE sequence_schema='public'
  LOOP
    EXECUTE format('GRANT USAGE, SELECT ON SEQUENCE %I.%I TO web_anon', r.sequence_schema, r.sequence_name);
  END LOOP;
END$$;



