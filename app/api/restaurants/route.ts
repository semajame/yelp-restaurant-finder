import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city");

  if (!city) {
    return NextResponse.json({ error: "City is required" }, { status: 400 });
  }

  const apiKey = process.env.YELP_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Yelp API key not configured" }, { status: 500 });
  }

  const params = new URLSearchParams({
    location: city,
    categories: "restaurants",
    limit: "20",
    radius: "8000", // ~5 miles in meters
    sort_by: "rating",
  });

  const res = await fetch(`https://api.yelp.com/v3/businesses/search?${params}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err.error?.description || "Yelp API error" }, { status: res.status });
  }

  const data = await res.json();

  const restaurants = data.businesses.map((b: any) => ({
    id: b.id,
    name: b.name,
    rating: b.rating,
    review_count: b.review_count,
    address: [b.location.address1, b.location.city, b.location.state].filter(Boolean).join(", "),
    coordinates: b.coordinates,
    price: b.price ?? null,
    categories: b.categories.map((c: any) => c.title).slice(0, 2),
    image_url: b.image_url,
    url: b.url,
  }));

  return NextResponse.json({ restaurants, total: data.total });
}
