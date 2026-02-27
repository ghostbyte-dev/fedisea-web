"use client";

import {
  AnchorIcon,
  Clock,
  Compass,
  Database,
  FileSearch,
  GithubIcon,
  Network,
  ServerIcon,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const dataEndpoints = [
  {
    source: "NodeInfo",
    url: "/.well-known/nodeinfo",
    appliesTo: "All Fediverse software",
    color: "bg-primary/10 text-primary border-primary/30",
    fields: [
      "Software name & version",
      "Protocol support (ActivityPub, etc.)",
      "Total users, active users (monthly/half-year)",
      "Local posts count",
      "Open registrations status",
    ],
  },
  {
    source: "Mastodon API",
    url: "/api/v1/instance",
    appliesTo: "Mastodon, Pixelfed",
    color: "bg-secondary/10 text-secondary border-secondary/30",
    fields: [
      "Instance title & description",
      "Admin contact info",
      "Thumbnail / banner image",
      "Languages",
      "Server rules",
      "Registration policy",
      "Peer list (connected instances)",
    ],
  },
];

const crawlerSteps = [
  {
    icon: Compass,
    title: "Discovery",
    description:
      "The crawler starts from a seed list and expands by following peer lists from known instances. New domains are queued for crawling.",
  },
  {
    icon: ShieldCheck,
    title: "Robots.txt Check",
    description:
      "Before making any request, the crawler fetches and parses robots.txt. If crawling is disallowed, the instance is skipped entirely.",
  },
  {
    icon: FileSearch,
    title: "NodeInfo Fetch",
    description:
      "The /.well-known/nodeinfo endpoint is probed first to identify the software and gather universal stats available on all Fediverse platforms.",
  },
  {
    icon: Database,
    title: "Software-Specific Data",
    description:
      "Based on the detected software, the crawler hits the appropriate API endpoint (Mastodon, Lemmy, Misskey, etc.) for richer metadata.",
  },
  {
    icon: Network,
    title: "Peer Discovery",
    description:
      "Connected instances are extracted from peer lists and federation data, feeding new domains back into the discovery queue.",
  },
  {
    icon: Clock,
    title: "Scheduled Re-crawl",
    description:
      "Instances are re-crawled on a rolling schedule. Popular instances are checked more frequently, inactive ones less often.",
  },
];

export default function Crawler() {
  return (
    <div className="">
      <div className="my-container mt-20 flex flex-col items-start">
        <div className="max-w-2xl">
          <h1>
            <p>How we map</p>
            <p>
              the <span className="text-primary">Fediverse</span>
            </p>
          </h1>
          <p>
            FediSea's crawler is an open-source bot that respectfully discovers
            and indexes Fediverse instances. It gathers publicly available
            metadata to build a comprehensive map of the decentralized social
            web.
          </p>
        </div>

        <Link
          href="https://github.com/ghostbyte-dev/fedisea-crawler"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-primary-dark px-4 py-3 mt-5 rounded-xl space-x-2 text-white"
        >
          <GithubIcon size={18} />
          <span className="font-bold">View on GitHub</span>
        </Link>

        {/* Robots.txt notice */}
        <div className="mb-20 mt-20 p-6 bg-primary/7 border-2 border-primary/20 rounded-2xl flex gap-5 items-start">
          <div className="p-3 bg-primary/10 rounded-xl shrink-0">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-black text-foreground mb-2">
              We respect robots.txt
            </h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Before crawling any instance, we check its{" "}
              <code className="px-1.5 py-0.5 bg-muted rounded-md text-sm font-mono font-bold text-foreground">
                robots.txt
              </code>{" "}
              file. If an instance disallows our user agent or the paths we
              need, we skip it completely. Instance administrators can opt out
              at any time by updating their robots.txt. We also enforce polite
              rate limiting — no more than <strong>1 request per second</strong>{" "}
              per domain.
            </p>
          </div>
        </div>

        <section className="mb-20">
          <h2 className="text-3xl font-black text-foreground mb-3">
            How the crawler works 🐙
          </h2>
          <p className="text-muted-foreground font-medium mb-10 max-w-2xl">
            The crawling pipeline runs in six stages, continuously discovering
            and updating instance data.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {crawlerSteps.map((step, i) => (
              <div
                key={step.title}
                className="relative p-5 bg-card border-2 border-border rounded-2xl hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-black font-mono">
                    {i + 1}
                  </span>
                  <step.icon className="w-4.5 h-4.5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-black text-foreground mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full">
          <h2>What data we collect</h2>
          <p>
            We only collect publicly available metadata from standard API
            endpoints. No private user data, no posts, no DMs — ever.
          </p>

          <div className="space-y-5">
            {dataEndpoints.map((ep) => (
              <div
                key={ep.source}
                className="bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-colors"
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                    <h3 className="font-black text-lg text-foreground">
                      {ep.source}
                    </h3>
                    <code
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border w-fit ${ep.color}`}
                    >
                      {ep.url}
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground font-semibold mb-4 flex items-center gap-2">
                    <ServerIcon className="w-3.5 h-3.5" />
                    {ep.appliesTo}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                    {ep.fields.map((field) => (
                      <div
                        key={field}
                        className="flex items-center gap-2 text-sm text-foreground/80 font-medium py-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                        {field}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 bg-secondary/10 border-2 border-secondary/20 rounded-2xl mt-20 mb-20 w-full">
          <div className="flex items-start gap-4">
            <AnchorIcon className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
            <div>
              <h3 className="font-black text-foreground mb-2">
                Want to opt out?
              </h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Add the following to your instance's{" "}
                <code className="px-1.5 py-0.5 bg-muted rounded-md text-xs font-mono font-bold text-foreground">
                  robots.txt
                </code>{" "}
                to prevent FediSea from crawling your server:
              </p>
              <pre className="mt-3 p-4 bg-muted/50 border-2 border-border rounded-xl text-sm font-mono text-foreground">
                {`User-agent: FediSeaBot
Disallow: /`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
