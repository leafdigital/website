import Link from "next/link";

// Interim homepage — the full umbrella build-out (thesis narrative, products
// index, blog migration) lands in Milestone 3. This page exists so the domain
// has a coherent home at cutover; until cutover the old site remains live.
export default function Home() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-green-700">
        Agentic commerce
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        AI agents are becoming the shoppers.
        <br />
        Make your catalog legible to machines.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-600">
        Leaf Digital builds Shopify apps and services that get your store seen,
        understood, and recommended by AI — starting with your images.
      </p>
      <div className="mt-10">
        <Link
          href="/apps/alt-text"
          className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
        >
          See our first app →
        </Link>
      </div>
    </section>
  );
}
