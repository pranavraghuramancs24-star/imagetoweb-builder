import { createFileRoute } from "@tanstack/react-router";
import { WanderWiseApp } from "@/components/wanderwise/WanderWiseApp";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Stays — WanderWise" },
      { name: "description", content: "Search personalized stays across India and refine recommendations by price, rating, and amenities." },
      { property: "og:title", content: "Explore Stays — WanderWise" },
      { property: "og:description", content: "Find personalized stays across India with clear reasons behind every recommendation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  return <WanderWiseApp view="explore" />;
}