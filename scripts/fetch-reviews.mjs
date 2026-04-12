#!/usr/bin/env node
/**
 * Fetches 5-star Google reviews from the Places API (New) and writes them to
 * data/reviews.json so the static site always shows up-to-date reviews on each deploy.
 *
 * Required env vars:
 *   GOOGLE_PLACES_API_KEY — Google Cloud API key with Places API (New) enabled
 *   GOOGLE_PLACE_ID       — The Google Place ID for Classic Countertops LLC
 *                           Find it at: https://developers.google.com/maps/documentation/places/web-service/place-id
 *
 * If either env var is missing, the script exits without modifying data/reviews.json,
 * preserving whichever reviews are already there as fallback.
 */

import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '..', 'data', 'reviews.json');

const GOOGLE_COLORS = [
  '#4285F4',
  '#EA4335',
  '#34A853',
  '#FBBC05',
  '#0F9D58',
  '#1565C0',
];

const { GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID } = process.env;

if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
  console.log(
    '[fetch-reviews] GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID not set — skipping review fetch, using existing data/reviews.json.'
  );
  process.exit(0);
}

async function fetchReviews() {
  const url = `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}`;

  const res = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'reviews',
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google Places API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.reviews ?? [];
}

function mapReview(apiReview, index) {
  const displayName = apiReview.authorAttribution?.displayName ?? 'Google Reviewer';
  const initial = displayName.charAt(0).toUpperCase();
  const color = GOOGLE_COLORS[index % GOOGLE_COLORS.length];
  const reviewText =
    apiReview.originalText?.text ?? apiReview.text?.text ?? '';
  const date = apiReview.relativePublishTimeDescription ?? '';
  const rating = apiReview.rating ?? 5;

  return {
    name: displayName,
    location: '',
    rating,
    date,
    review: reviewText,
    initial,
    color,
  };
}

try {
  console.log('[fetch-reviews] Fetching reviews from Google Places API…');
  const rawReviews = await fetchReviews();

  // Keep only 5-star reviews; preserve order returned by the API (most relevant first)
  const fiveStarReviews = rawReviews.filter((r) => r.rating === 5);

  if (fiveStarReviews.length === 0) {
    console.log(
      '[fetch-reviews] No 5-star reviews returned by API — keeping existing data/reviews.json.'
    );
    process.exit(0);
  }

  const mapped = fiveStarReviews.map(mapReview);

  // Merge locations from existing JSON where names match (to preserve manually-curated locations)
  let existing = [];
  try {
    existing = JSON.parse(readFileSync(OUTPUT_PATH, 'utf8'));
  } catch {
    // no existing file — fine
  }
  const locationByName = Object.fromEntries(
    existing.map((r) => [r.name, r.location])
  );
  const merged = mapped.map((r) => ({
    ...r,
    location: locationByName[r.name] ?? r.location,
  }));

  writeFileSync(OUTPUT_PATH, JSON.stringify(merged, null, 2) + '\n');
  console.log(
    `[fetch-reviews] Wrote ${merged.length} review(s) to data/reviews.json.`
  );
} catch (err) {
  console.error('[fetch-reviews] Failed to fetch reviews:', err.message);
  console.error('[fetch-reviews] Keeping existing data/reviews.json as fallback.');
  process.exit(0); // non-fatal — build should still succeed
}
