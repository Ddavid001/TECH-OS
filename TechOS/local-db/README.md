Local PostgreSQL (no Supabase) for TechOS

Prereqs
- Docker Desktop (Windows)

How to start
1) Open a terminal in TechOS/local-db
2) Run: docker compose up -d
3) Wait ~10s until postgres is healthy
4) Optional: Open Adminer at http://localhost:8080
   - System: PostgreSQL
   - Server: postgres
   - User: techos
   - Password: techos
   - Database: techos

What gets created
- Extensions: pgcrypto, uuid-ossp
- Roles: web_anon (para API)
- Tables: public.institutions, public.job_offers, public.job_applications
- Seed data: 5 institutions (Caracas) + 5 job offers
- REST API: PostgREST en http://localhost:3001 (OpenAPI en /)

Connection string (for tools)
postgresql://techos:techos@localhost:5432/techos

Reset database
docker compose down -v && docker compose up -d


