import reviews from '../../../data/reviews.json';

export const dynamic = 'force-static';

export async function GET() {
  return Response.json(reviews);
}
