import { BarChart3, Code, ServerIcon } from "lucide-react";

export const endpoints = [
  {
    category: "Instances",
    icon: ServerIcon,
    color: "text-primary",
    bg: "bg-primary/10",
    items: [
      {
        method: "GET",
        path: "/v1/instances",
        description:
          "List all known Fediverse instances with pagination and filtering.",
        params: [
          { name: "page", type: "integer", desc: "Page number (default: 1)" },
          {
            name: "size",
            type: "integer",
            desc: "Results per page (default: 20, max: 100)",
          },
          {
            name: "software",
            type: "string",
            desc: "Filter by software (e.g. mastodon, lemmy)",
          },
          {
            name: "search",
            type: "string",
            desc: "Search for instance name",
          },
          {
            name: "sort",
            type: "string",
            desc: "Sort by: users, activeUsersMonth, activeUsersHalfyear, posts, softwareVersion, name",
          },
          {
            name: "order",
            type: "string",
            desc: "asc or desc (default: desc)",
          },
        ],
        response: `{
  "data": [
    {
      "domain": "mastodon.social",
      "software": "mastodon",
      "version": "4.3.2",
      "users": 1823402,
      "statuses": 82741923,
      "connections": 48291,
      "open_registrations": true,
      "description": "The original server operated by Mastodon gGmbH",
      "languages": ["en"],
      "last_crawled": "2025-02-25T10:30:00Z"
    }
  ],
  "meta": {
    "total": 32847,
    "page": 1,
    "per_page": 20
  }
}`,
      },
      {
        method: "GET",
        path: "/v1/instances/:domain",
        description: "Get detailed information about a specific instance.",
        params: [
          {
            name: "domain",
            type: "string",
            desc: "The instance domain (path parameter)",
          },
        ],
        response: `{
  "domain": "mastodon.social",
  "software": "mastodon",
  "version": "4.3.2",
  "users": 1823402,
  "statuses": 82741923,
  "connections": 48291,
  "open_registrations": true,
  "description": "The original server operated by Mastodon gGmbH",
  "admin": "Gargron",
  "thumbnail": "https://mastodon.social/thumbnail.png",
  "languages": ["en"],
  "rules": [...],
  "last_crawled": "2025-02-25T10:30:00Z"
}`,
      },
    ],
  },
  {
    category: "Software",
    icon: Code,
    color: "text-secondary",
    bg: "bg-secondary/10",
    items: [
      {
        method: "GET",
        path: "/v1/software",
        description:
          "List all detected Fediverse software platforms and their instance counts.",
        params: [],
        response: `{
  "data": [
    { "name": "mastodon", "instances": 16842, "percentage": 51.3 },
    { "name": "lemmy", "instances": 3291, "percentage": 10.0 },
    { "name": "misskey", "instances": 2847, "percentage": 8.7 },
    { "name": "pleroma", "instances": 2103, "percentage": 6.4 },
    { "name": "peertube", "instances": 1456, "percentage": 4.4 },
    { "name": "pixelfed", "instances": 891, "percentage": 2.7 }
  ]
}`,
      },
    ],
  },
  {
    category: "Stats",
    icon: BarChart3,
    color: "text-primary",
    bg: "bg-primary/10",
    items: [
      {
        method: "GET",
        path: "/v1/stats",
        description: "Get aggregate statistics about the entire Fediverse.",
        params: [],
        response: `{
  "total_instances": 32847,
  "total_users": 12482910,
  "total_statuses": 1847291042,
  "active_instances": 28401,
  "software_count": 94,
  "last_updated": "2025-02-25T10:30:00Z"
}`,
      },
    ],
  },
];
