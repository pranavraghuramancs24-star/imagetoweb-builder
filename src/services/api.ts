import { mockHotels, type Hotel } from "@/data/mock-hotels";
import palaceImageAsset from "@/assets/hotel-palace.jpg.asset.json";
import haveliImageAsset from "@/assets/hotel-haveli.jpg.asset.json";
import retreatImageAsset from "@/assets/hotel-retreat.jpg.asset.json";

const palaceImage = palaceImageAsset.url;
const haveliImage = haveliImageAsset.url;
const retreatImage = retreatImageAsset.url;

type SearchFilters = {
  city_id?: string;
  price_max?: string;
  star_min?: number;
  category?: string;
  amenities?: string[];
};

export type SearchRequest = {
  session_id: string;
  user_id?: string;
  query_text: string;
  language: string;
  filters: SearchFilters;
  top_k: number;
};

export type SearchResponse = {
  results: Hotel[];
  query_guard: { relaxed: boolean; relaxed_filter?: string; narrow_results: boolean };
};

export type InteractionType = "view" | "click" | "like" | "save" | "book" | "dismiss" | "share" | "search";

// The live backend (backend/src/schemas.py:ResultItem) only returns
// entity_type, entity_id, name, score and explanation — it has no image,
// price, stars, location or amenities. Those fields exist only in the
// design-time Hotel type this UI was built against. fillDisplayFields()
// backfills them from the search filters (or a sensible placeholder) so
// the existing cards keep working once wired to the real API, without
// pretending the backend sent data it didn't.
type BackendResultItem = {
  entity_type: string;
  entity_id: string;
  name: string;
  score?: number;
  explanation?: string | null;
  moved_up?: boolean | null;
};

type BackendSearchResponse = {
  results: BackendResultItem[];
  query_guard: { relaxed: boolean; relaxed_filter?: string; narrow_results: boolean };
};

const placeholderImages = [palaceImage, haveliImage, retreatImage];

function fillDisplayFields(item: BackendResultItem, index: number, filters: SearchFilters): Hotel {
  const image = placeholderImages[index % placeholderImages.length] ?? palaceImage;
  return {
    entity_type: "hotel",
    entity_id: item.entity_id,
    name: item.name,
    price: filters.price_max ?? "0.00",
    stars: filters.star_min ?? 3,
    category: filters.category ?? item.entity_type,
    location: filters.city_id ?? "India",
    amenities: filters.amenities ?? [],
    explanation: item.explanation ?? "Matched to your search.",
    image,
    imageAlt: `${item.name} — photo not provided by the API`,
  };
}

const API_BASE = import.meta.env["VITE_WANDERWISE_API_URL"] as string | undefined;

export async function searchStays(payload: SearchRequest): Promise<SearchResponse> {
  if (!API_BASE) {
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    return {
      results: mockHotels.filter((hotel) => {
        const max = payload.filters.price_max;
        const stars = payload.filters.star_min ?? 0;
        return (!max || hotel.price.localeCompare(max, undefined, { numeric: true }) <= 0) && hotel.stars >= stars;
      }),
      query_guard: { relaxed: true, relaxed_filter: "price", narrow_results: false },
    };
  }

  const response = await fetch(`${API_BASE}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error((await response.text()) || "Search failed");
  const data = (await response.json()) as BackendSearchResponse;
  return {
    results: data.results.map((item, index) => fillDisplayFields(item, index, payload.filters)),
    query_guard: data.query_guard,
  };
}

export async function recordInteraction(payload: {
  session_id: string;
  entity_type?: string;
  entity_id?: string;
  interaction_type: InteractionType;
}) {
  if (!API_BASE) return { mock: true };
  const response = await fetch(`${API_BASE}/interactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error((await response.text()) || "Interaction failed");
  return response.json();
}
