# Infrastructure Intelligence Platform — Full Context

This document is the single source of truth for what this platform is, whom it serves, and how it is built. Use it for onboarding and when making product or architecture decisions.

**Scope for this repo:** **Frontend only.** The backend (Express API, MongoDB, ingestion engine, cron jobs) is built by a separate backend developer. This codebase builds the Next.js UI and consumes the backend API.

---

## 1. The Big Idea

The platform is an **intelligence system for infrastructure markets**, analogous to:

- **Bloomberg Terminal** (finance intelligence)
- **Crunchbase** (startups and funding)
- **Google News + Database** + project tracking

Focused on **infrastructure development**: highways, power plants, data centers, airports, ports, housing, industrial zones — **Africa first**, then globally.

It continuously collects and organizes information so that users see in one place:

- What projects exist
- Which are active, delayed, or stalled
- Who is funding and building them
- What stage they are in

**Outcome**: A living database of infrastructure development activity.

---

## 2. The Problem Solved

Infrastructure information is **extremely fragmented**. A single project can appear in:

- Ministry announcements
- News articles
- Development bank reports (e.g. AfDB)
- Parliamentary speeches
- Tender portals
- Contractor press releases

These sources are not connected. Analysts, investors, and advisors must monitor many sites, track projects in spreadsheets, and guess status. The platform solves this by providing **one structured source of truth**.

---

## 3. Target Users (High-Value Professionals)

- **Infrastructure investors** — PE and infra funds looking for opportunities
- **Development finance institutions** — AfDB, World Bank, IFC, etc.
- **Strategy teams** — consulting and research
- **Government planning units** — ministries tracking pipelines
- **Project developers** — construction, engineering, PPP developers

The platform is **decision-support**, not a casual public site.

---

## 4. What Makes It Valuable

1. **Structured database** — Data in fields: name, country, sector, status, stage, cost, developers, agency, sources, timeline. Enables queries like: “All solar projects in Kenya under construction above $200M.”
2. **Project lifecycle tracking** — Concept → feasibility → tender → financing → construction → operational (plus delayed/stalled). Enables pipeline health insights (e.g. “40% of announced power projects in West Africa never reach construction”).
3. **Automated ingestion** — Daily collection from RSS (development banks, government, infrastructure news, regulators). Pipeline: fetch → extract metadata → keyword classification → link to project → update record.

---

## 5. Why MVP Avoids AI

Phase 1 uses **deterministic rules** instead of AI:

- AI needs training, is less predictable, more expensive, and requires labeling.
- Rules (e.g. if “announced” → status = announced; if “tender” → pipeline; if “construction” → active) are cheap, transparent, and reliable.
- AI can be introduced in later phases.

---

## 6. System Architecture

```
Users
  ↓
Next.js Frontend (auth, dashboards, filters, project pages, admin)
  ↓
Express API (auth, project DB, ingestion pipeline, admin)
  ↓
MongoDB (users, projects, ingestion articles, logs)
  +
Cron jobs (data ingestion)
```

- **Frontend**: Next.js, TypeScript, Tailwind — auth UI, dashboards, filters, project detail, admin.
- **Backend**: Express — auth, project APIs, ingestion pipeline, admin controls.
- **Database**: MongoDB — users, projects, ingestion articles, logs.
- **Deployment**: Vercel (frontend), Render (backend), MongoDB Atlas.

---

## 7. Ingestion Engine (Intelligence Core)

Runs on a schedule (e.g. daily at 6AM):

1. **Fetch** — RSS parser for AfDB, World Bank, infrastructure news, etc.
2. **Extract** — title, source, url, date, summary.
3. **Classify** — sector, country, stage via keywords (e.g. “solar plant” → Energy; “port expansion” → Maritime).
4. **Deduplicate** — URL hashing, title similarity, source filtering.
5. **Save/update** — create new project or update existing (e.g. timeline).

---

## 8. Roles

| Role       | Browse | Filter/Search | View details | Validate | Edit/Delete | Logs |
|-----------|--------|----------------|--------------|----------|-------------|------|
| Public    | ✓      | ✓              | ✓            | —        | —           | —    |
| Admin     | ✓      | ✓              | ✓            | ✓        | ✓           | ✓    |

Admin validation exists because automation is imperfect (misclassification, multiple projects per article, incomplete info). Admin review keeps the platform trusted.

---

## 9. Frontend Responsibilities

- **Dashboard** — Table: Project name, country, sector, status, stage, last updated. Filters: country, sector, status, stage.
- **Project detail** — Full profile: name, country, sector, status, stage, cost, developers, sources (links).
- **Admin** — Edit project, validate ingestion, view flagged items, see logs.

---

## 10. Deployment

- **Frontend**: Vercel  
- **Backend**: Render  
- **Database**: MongoDB Atlas  

Chosen for cost-efficient MVP.

---

## 11. Development Timeline (8 Weeks)

- **Phase 1**: Authentication
- **Phase 2**: User dashboard and project browsing
- **Phase 3**: Admin dashboard and ingestion engine
- **Phase 4**: Testing and deployment

---

## 12. Future Vision (Post-MVP)

- Infrastructure market analytics
- Investment opportunity discovery
- Risk analysis and regional comparisons
- AI extraction, investment alerts, investor dashboards, analytics/charts, subscription reports  
→ Bloomberg-like platform for infrastructure markets.

---

## 13. Main Technical Challenges

- **Data ingestion** — Messy, heterogeneous sources.
- **Project matching** — Deciding if two articles refer to the same project.
- **Data normalization** — Different naming and units across sources.
- **Quality** — Keeping records correct; admin validation is essential.

In short: a **data engineering problem** delivered as a web application.

---

## 14. Mental Model for Development

Three subsystems that must work together:

1. **User application** — Dashboard and browsing.
2. **Intelligence engine** — RSS ingestion and classification.
3. **Admin control** — Validation and data correction.

Use this document and the Cursor rule in `.cursor/rules/` to keep architecture and product intent consistent as you build.
