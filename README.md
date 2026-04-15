# Yelp Restaurant Finder

A simple Next.js app to search top-rated restaurants by city using the Yelp API.

## Setup

### 1. Get a Yelp API Key

1. Go to [https://www.yelp.com/developers/v3/manage_app](https://www.yelp.com/developers/v3/manage_app)
2. Create an app to get your **API Key**

### 2. Configure your key

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and paste your key:

```
YELP_API_KEY=your_actual_key_here
```

### 3. Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Approach

I structured the app around a single Next.js API route that proxies requests to the Yelp API, keeping the client simple and the API key secure. The frontend is a single client component using plain useState and fetch — no unnecessary libraries or abstractions. I mapped Yelp's response to a lean data shape server-side, stripping out everything the UI doesn't need before it ever hits the browser. The result is two focused files with a clear separation: one handles data fetching, one handles display.

## Accuray & Edge Cases

Accuracy & Edge Cases
To keep results geographically relevant, I set an 8,000m radius (~5 miles) and passed the city name directly as Yelp's location parameter, which it resolves reliably against its own geocoding. Results are sorted by rating so the most relevant spots surface first. On the error side, the API route validates for a missing city param and a missing API key before hitting Yelp, and surfaces Yelp's own error descriptions when the upstream call fails — so the UI always gets a meaningful message rather than a silent failure. Businesses without photos or price tiers are handled gracefully with fallback states in the UI.

## How it works

- **`/app/page.tsx`** — Client-side UI: city input, results list
- **`/app/api/restaurants/route.ts`** — Server-side API route that proxies Yelp requests

The API route is necessary because Yelp's API blocks direct browser requests (CORS). The Next.js API route keeps your API key secure and handles the fetch server-side.

## Search parameters

- Radius: 8,000m (~5 miles)
- Limit: 20 results
- Sorted by: rating
- Category: restaurants

## What's displayed

- Name, rating (stars + numeric), review count
- Price tier, cuisine categories
- Full address
- Lat/lng coordinates
- Thumbnail photo (links to Yelp listing)
