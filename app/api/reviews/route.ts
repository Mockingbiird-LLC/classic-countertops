import fallbackReviews from '../../../data/reviews.json';

const GOOGLE_COLORS = [
  '#4285F4',
  '#EA4335',
  '#34A853',
  '#FBBC05',
  '#0F9D58',
  '#1565C0',
];

interface ApiReview {
  rating: number;
  authorAttribution?: { displayName?: string };
  originalText?: { text?: string };
  text?: { text?: string };
  relativePublishTimeDescription?: string;
}

function mapReview(apiReview: ApiReview, index: number) {
  const displayName = apiReview.authorAttribution?.displayName ?? 'Google Reviewer';
  return {
    name: displayName,
    location: '',
    rating: apiReview.rating ?? 5,
    date: apiReview.relativePublishTimeDescription ?? '',
    review: apiReview.originalText?.text ?? apiReview.text?.text ?? '',
    initial: displayName.charAt(0).toUpperCase(),
    color: GOOGLE_COLORS[index % GOOGLE_COLORS.length],
  };
}

export async function GET() {
  const { GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID } = process.env;

  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
    return Response.json(fallbackReviews);
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}`,
      {
        headers: {
          'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask': 'reviews',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return Response.json(fallbackReviews);
    }

    const data = await res.json();
    const rawReviews: ApiReview[] = data.reviews ?? [];
    const fiveStarReviews = rawReviews.filter((r) => r.rating === 5);

    if (fiveStarReviews.length === 0) {
      return Response.json(fallbackReviews);
    }

    const locationByName: Record<string, string> = {};
    for (const r of fallbackReviews) {
      locationByName[r.name] = r.location;
    }

    const mapped = fiveStarReviews.map((r, i) => {
      const review = mapReview(r, i);
      return { ...review, location: locationByName[review.name] ?? '' };
    });

    return Response.json(mapped);
  } catch {
    return Response.json(fallbackReviews);
  }
}
