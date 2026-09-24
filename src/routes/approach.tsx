import { createFileRoute } from "@tanstack/react-router";
import { WanderWiseApp } from "@/components/wanderwise/WanderWiseApp";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Our Approach — WanderWise" },
      { name: "description", content: "See how WanderWise turns natural travel ideas into thoughtful, personalized stay recommendations." },
      { property: "og:title", content: "Our Approach — WanderWise" },
      { property: "og:description", content: "A more personal, transparent way to discover stays that match your travel rhythm." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApproachPage,
});

function ApproachPage() {
  return <WanderWiseApp view="approach" />;
}