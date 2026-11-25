# Ardea Skin: a Shopify store with an identity of its own

A working store for a fictional skincare brand: real catalog, cart and Shopify checkout in test mode, with an AI
advisor built in.

## The problem

Every client wants something made to their taste. Most online stores offer useful features, but cast from a mold
made for everyone. That is where the need comes from: building an identity of its own on top of a site, one that
represents what the client wants to sell to their users.

## How I built it

Frontend: Next.js 16, React 19, TypeScript and Tailwind 4, the same app that serves my portfolio, so there is one
codebase and one deploy. Shopify handles the catalog, inventory, checkout, orders, and the images and videos (from
its own CDN). The chat agent runs on Claude Haiku 5.5, with measured costs and per-visitor limits against spam.
Supabase (managed Postgres) stores the chat conversations, the token cost of every message, the escalated cases and
the date of the last reports, so none is sent twice. A Telegram integration runs the store from outside, with an AI
agent between the two.

## Result

A site made to measure for a potential client. The products are demos, but it shows an identity that carries into
every part of the store and every new product, making the store much simpler and more automated to run without
losing the human touch users look for.

## The store agent

Users want a system that solves things, not a chat that answers with simple rules. The store owner wants an agent
they can delegate work to, ask for information and trust to run the site by their guidelines: what a person would
do today, handed to an AI agent, all in one place.

- **On the store:** it recommends routines and adds products to the bag. Complaints and medical questions are
  escalated to the owner with a reference code.
- **On the owner's side, in Telegram:** it restocks or adjusts stock (always after a Confirm tap), builds charts,
  sends a daily summary and a weekly report, remembers the conversation, and escalates complaints, order issues and
  medical questions from the store chat.
- **Cost:** about $0.0002–0.001 per turn. Conversations, token usage and cost are logged in Supabase, with a daily
  spend cap and per-visitor rate limits.

The product photos, category covers and tutorial videos were made with AI under one art direction. How they were
made is in [ai-media](https://github.com/izzosuarez-boop/ai-media).

## What's in this repo

| Folder | What it is |
|---|---|
| `web/` | The storefront: Next.js 16 with server-side Storefront API calls (the private token never reaches the browser) and the chat widget |
| `api/` | FastAPI: the store agent, the owner's Telegram agent, Shopify webhooks, daily and weekly reports, Supabase migrations |
| `scripts/shopify/` | Catalog seeding, test orders, webhooks and file uploads to Shopify |
| `scripts/telegram/`, `scripts/db/` | Telegram bot setup and the database migration runner |
| `scripts/tests/` | Browser test of the chat (Playwright), agent replies and the restock flow |
| `infra/` | Docker Compose and Caddy (automatic HTTPS) |

## Run it

```bash
cp .env.example .env        # fill in Shopify, Anthropic, Supabase and Telegram
cd web && npm install && npm run dev        # http://localhost:3000
cd api && pip install -r requirements.txt && uvicorn app.main:app --reload
```

Or everything behind Caddy: `docker compose -f infra/docker-compose.yml up -d --build`.

## Stack

Shopify Storefront API · Shopify Admin API · Next.js 16 · React 19 · Tailwind 4 · TypeScript · FastAPI ·
Claude API · Supabase · Telegram Bot API · Playwright · Docker · Caddy
