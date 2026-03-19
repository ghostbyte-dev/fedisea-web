import { BarChart3, Code, ServerIcon } from "lucide-react";

interface TypeField {
  name: string;
  type: string;
  desc: string;
  optional?: boolean;
}

interface TypeDef {
  name: string;
  description: string;
  fields: TypeField[];
}

export const typeDefinitions: TypeDef[] = [
  {
    name: "Instance",
    description: "Represents a single Fediverse server instance, including its software, user counts, and metadata.",
    fields: [
      { name: "domain", type: "string", desc: "Domain name of the instance" },
      { name: "description", type: "string", desc: "Instance description set by the administrator", optional: true },
      { name: "title", type: "string", desc: "Title of the instance", optional: true },
      { name: "software", type: "string", desc: "Software running on the instance (e.g. mastodon, lemmy)" },
      { name: "version", type: "string", desc: "Software version" },
      { name: "openRegistrations", type: "boolean", desc: "Whether the instance is accepting new sign-ups" },
      { name: "thumbnail", type: "string", desc: "URL to the instance thumbnail image", optional: true },
      { name: "sourceUrl", type: "string", desc: "Url to the source code repository", optional: true },
      { name: "totalUsers", type: "integer", desc: "Total registered users across all instances" },
      { name: "activeUsersHalfyear", type: "integer", desc: "Users active in the last 180 days" },
      { name: "activeUsersMonth", type: "integer", desc: "Users active in the last 30 days" },
      { name: "localPosts", type: "integer", desc: "Total posts across all instances" },
      { name: "localComments", type: "integer", desc: "Total comments across all instances", optional: true },
      { name: "softwareLogoUrl", type: "string", desc: "URL to logo of the software", optional: true },
    ],
  },
  {
    name: "Software",
    description: "A Fediverse software platform with aggregate statistics across all known instances running it.",
    fields: [
      { name: "identifier", type: "string", desc: "Identifier/slug of the software (e.g. mastodon, lemmy)" },
      { name: "name", type: "string", desc: "Canonical name of the software (e.g. Mastodon, Lemmy)" },
      { name: "website", type: "string", desc: "URL to the software project's homepage", optional: true },
      { name: "sourceCode", type: "string", desc: "URL to source code repository", optional: true },
      { name: "description", type: "string", desc: "Description of the software", optional: true },
      { name: "license", type: "string", desc: "Open-source license identifier (e.g. AGPL-3.0)", optional: true },
      { name: "joinUrl", type: "string", desc: "URL to website where users can join the platform", optional: true },
      { name: "instances", type: "integer", desc: "Total number of instances running this software" },
      { name: "activeUsersHalfyear", type: "integer", desc: "Users active in the last 180 days" },
      { name: "activeUsersMonth", type: "integer", desc: "Users active in the last 30 days" },
      { name: "totalUsers", type: "integer", desc: "Total registered users across all instances" },
      { name: "localPosts", type: "integer", desc: "Total posts across all instances" },
      { name: "localComments", type: "integer", desc: "Total comments across all instances", optional: true },
      { name: "iconUrl", type: "string", desc: "URL to logo of the software", optional: true },
    ],
  },
  {
    name: "Stats",
    description: "Aggregate statistics about the entire Fediverse as tracked by FediSea's crawler.",
    fields: [
      { name: "totalInstances", type: "integer", desc: "Total number of known Fediverse instances" },
      { name: "totalUsers", type: "integer", desc: "Sum of all registered users across all instances" },
      { name: "totalActiveUsersMonth", type: "integer", desc: "Sum of active users in the last 30 days" },
      { name: "totalActiveUsersHalfYear", type: "integer", desc: "Sum of active users in the last 180 days" },
      { name: "totalPosts", type: "integer", desc: "Sum of all posts" },
      { name: "totalComments", type: "integer", desc: "Sum of all comments" },
    ],
  },
  {
    name: "Page metadata",
    description: "Metadata that is included in all paged responses.",
    fields: [
      { name: "currentPage", type: "integer", desc: "Number of the current page" },
      { name: "totalPages", type: "integer", desc: "Total number of available pages" },
      { name: "totalItems", type: "integer", desc: "Total elements across all existing pages" },
      { name: "pageSize", type: "integer", desc: "Number of elements per page" },
      { name: "hasNext", type: "boolean", desc: "Has a next page" },
      { name: "hasPrevious", type: "boolean", desc: "Has a previous page" },
    ],
  },
];


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
      "title": "Mastodon",
      "description": "The original server operated by the Mastodon gGmbH non-profit",
      "sourceUrl": "https://github.com/mastodon/mastodon",
      "thumbnail": "https://files.mastodon.social/site_uploads/files/000/000/001/@1x/57c12f441d083cde.png",
      "software": "mastodon",
      "version": "4.6.0-nightly.2026-03-05",
      "openRegistration": true,
      "totalUsers": 3170635,
      "activeUsersMonth": 301031,
      "activeUsersHalfyear": 712642,
      "localPosts": 167545501,
      "localComments": null,
      "softwareLogoUrl": "https://assets.fedisea.surf/logos/mastodon.svg"
    }
  ],
  "currentPage": 0,
  "totalPages": 33589,
  "totalItems": 33589,
  "pageSize": 1,
  "hasNext": true,
  "hasPrevious": false
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
  "domain": "pixelfed.social",
  "title": "pixelfed",
  "description": "The original Pixelfed instance, operated by the main developer @dansup",
  "sourceUrl": "https://github.com/pixelfed/pixelfed",
  "thumbnail": "https://pixelfed.social/storage/headers/Hb2Qs2gfWofB4kEmSRArGqfr0h3DeBgrjLcwZ23r.jpg",
  "software": "pixelfed",
  "version": "0.12.7",
  "openRegistration": true,
  "totalUsers": 540768,
  "activeUsersMonth": 100380,
  "activeUsersHalfyear": 310219,
  "localPosts": 16762444,
  "localComments": 0,
  "softwareLogoUrl": "https://assets.fedisea.surf/logos/pixelfed.svg"
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
        params: [{ name: "page", type: "integer", desc: "Page number (default: 1)" },
        {
          name: "size",
          type: "integer",
          desc: "Results per page (default: 20, max: 100)",
        },
        {
          name: "search",
          type: "string",
          desc: "Search for software name",
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
        },],
        response: `{
  "data": [
    {
      "identifier": "mastodon",
      "name": "Mastodon",
      "website": "https://joinmastodon.org",
      "sourceCode": "https://github.com/mastodon/mastodon",
      "description": "Mastodon is an open source decentralized social network - by the people for the people",
      "licence": "AGPL",
      "joinUrl": "https://joinmastodon.org/servers",
      "instances": 9452,
      "activeUsersHalfyear": 1734091,
      "activeUsersMonthly": 878652,
      "totalUsers": 10648368,
      "localPosts": 1066563967,
      "localComments": null,
      "iconUrl": "https://assets.fedisea.surf/logos/mastodon.svg"
    }
  ],
  "currentPage": 0,
  "totalPages": 62,
  "totalItems": 62,
  "pageSize": 1,
  "hasNext": true,
  "hasPrevious": false
}`,
      },
      {
        method: "GET",
        path: "/v1/software/:slug",
        description: "Get detailed information about a specific software.",
        params: [
          {
            name: "slug",
            type: "string",
            desc: "The slug of the software (e.g. mastodon)",
          },
        ],
        response: `{
  "identifier": "mastodon",
  "name": "Mastodon",
  "website": "https://joinmastodon.org",
  "sourceCode": "https://github.com/mastodon/mastodon",
  "description": "Mastodon is an open source decentralized social network - by the people for the people",
  "licence": "AGPL",
  "joinUrl": "https://joinmastodon.org/servers",
  "instances": 9452,
  "activeUsersHalfyear": 1734091,
  "activeUsersMonthly": 878652,
  "totalUsers": 10648368,
  "localPosts": 1066563967,
  "localComments": null,
  "iconUrl": "https://assets.fedisea.surf/logos/mastodon.svg"
}`,
      },
      {
        method: "GET",
        path: "/v1/software/:slug/versions",
        description:
          "List all detected Fediverse software platforms and their instance counts.",
        params: [{
          name: "slug",
          type: "string",
          desc: "The software slug",
        },
        { name: "page", type: "integer", desc: "Page number (default: 1)" },
        {
          name: "size",
          type: "integer",
          desc: "Results per page (default: 20, max: 100)",
        },
        ],
        response: `{
  "data": [
    {
      "version": "4.5.7",
      "count": 4061,
      "percentage": 42.96
    },
    {
      "version": "4.5.6",
      "count": 796,
      "percentage": 8.42
    }
  ],
  "currentPage": 0,
  "totalPages": 217,
  "totalItems": 433,
  "pageSize": 2,
  "hasNext": true,
  "hasPrevious": false
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
  "totalInstances": 34586,
  "totalUsers": 20203729,
  "totalActiveUsersMonth": 1233977,
  "totalActiveUsersHalfYear": 2830618,
  "totalPosts": 1584443855,
  "totalComments": 34350245
}`,
      },
    ],
  },
];
