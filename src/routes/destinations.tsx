import { createFileRoute } from "@tanstack/react-router";
import { WanderWiseApp } from "@/components/wanderwise/WanderWiseApp";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations Across India — WanderWise" },
      { name: "description", content: "Discover palace cities, coastlines, backwaters, and mountain retreats across India." },
      { property: "og:title", content: "Destinations Across India — WanderWise" },
      { property: "og:description", content: "Explore memorable destinations and beautiful stays across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  return <WanderWiseApp view="destinations" />;
}