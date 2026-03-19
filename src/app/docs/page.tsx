"use client";

import {
  BracesIcon,
  Check,
  ChevronRight,
  Copy,
  GlobeIcon,
  Server,
  Shield,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { endpoints, typeDefinitions } from "../data/docs/endpoints";

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-lg bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-all opacity-0 group-hover:opacity-100"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
      <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-foreground/80">
        {code}
      </pre>
    </div>
  );
};

export default function Docs() {
  const [activeCategory, setActiveCategory] = useState("Instances");
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(
    "/v1/instances",
  );

  return (
    <div className="">
      <div className="my-container mt-20 mb-20 flex flex-col items-start">
        <div className="max-w-2xl">
          <h1 className="text-5xl">API Reference 🐠</h1>
          <p>
            Explore the Fediverse programmatically. All endpoints return JSON
            and require no authentication for read access.
          </p>
        </div>

        <div className="flex items-center bg-white px-3 py-2 mt-5 rounded-xl space-x-2 border-border border-2">
          <GlobeIcon className="text-primary" size={18} />
          <span>Base URL:</span>
          <span className="font-bold text-primary">
            https://api.fedisea.surf
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-12 mt-6 w-full">
          {[
            {
              icon: Zap,
              label: "Rate Limit",
              value: "100 req/min",
              color: "text-secondary",
            },
            {
              icon: Shield,
              label: "Auth",
              value: "None required",
              color: "text-primary",
            },
            {
              icon: Server,
              label: "Format",
              value: "JSON",
              color: "text-coral",
            },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 card">
              <div className="p-2 bg-muted rounded-lg">
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-foreground">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Sidebar nav */}
          <nav className="lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                Endpoints
              </p>
              {endpoints.map((section) => (
                <button
                  key={section.category}
                  type="button"
                  onClick={() => setActiveCategory(section.category)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === section.category
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  {section.category}
                  <span className="ml-auto text-xs font-mono opacity-60">
                    {section.items.length}
                  </span>
                </button>
              ))}

              <div className="my-3 border-t border-border" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                Types
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory("Types")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === "Types"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <BracesIcon className="w-4 h-4" />
                Type Reference
                <span className="ml-auto text-xs font-mono opacity-60">
                  {typeDefinitions.length}
                </span>
              </button>
            </div>
          </nav>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-6">
            {endpoints
              .filter((s) => s.category === activeCategory)
              .map((section) => (
                <div key={section.category}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2.5 rounded-xl ${section.bg}`}>
                      <section.icon className={`w-5 h-5 ${section.color}`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-foreground">
                        {section.category}
                      </h2>
                      <p className="text-sm text-muted-foreground font-medium">
                        {section.items.length} endpoint
                        {section.items.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {section.items.map((endpoint) => {
                      const isExpanded = expandedEndpoint === endpoint.path;
                      return (
                        <div
                          key={endpoint.path}
                          className={`bg-card border-2 rounded-2xl overflow-hidden transition-all ${
                            isExpanded
                              ? "border-primary/30 shadow-lg shadow-primary/5"
                              : "border-border hover:border-primary/20"
                          }`}
                        >
                          {/* Endpoint header */}
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedEndpoint(
                                isExpanded ? null : endpoint.path,
                              )
                            }
                            className="w-full flex items-center gap-3 p-4 sm:p-5 text-left"
                          >
                            <span
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono border bg-primary/15 text-primary border-primary/30`}
                            >
                              {endpoint.method}
                            </span>
                            <code className="text-sm font-mono font-bold text-foreground truncate">
                              {endpoint.path}
                            </code>
                            <ChevronRight
                              className={`w-4 h-4 ml-auto shrink-0 text-muted-foreground transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                          </button>

                          {/* Expanded content */}
                          {isExpanded && (
                            <div className="border-t-2 border-border">
                              <div className="p-4 sm:p-5">
                                <p className="text-sm text-muted-foreground font-medium mb-5">
                                  {endpoint.description}
                                </p>

                                {/* Parameters */}
                                {endpoint.params.length > 0 && (
                                  <div className="mb-5">
                                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                                      Parameters
                                    </h4>
                                    <div className="space-y-2">
                                      {endpoint.params.map((param) => (
                                        <div
                                          key={param.name}
                                          className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-2 px-3 bg-muted/40 rounded-xl"
                                        >
                                          <code className="text-sm font-mono font-bold text-foreground">
                                            {param.name}
                                          </code>
                                          <span className="text-xs font-mono text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-md w-fit">
                                            {param.type}
                                          </span>
                                          <span className="text-sm text-muted-foreground">
                                            {param.desc}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Response */}
                                <div>
                                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                                    Response
                                  </h4>
                                  <div className="bg-muted/30 border-2 border-border rounded-xl overflow-hidden">
                                    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b-2 border-border bg-muted/50">
                                      <div className="w-2.5 h-2.5 rounded-full bg-tertiary/60" />
                                      <div className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
                                      <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                                      <span className="ml-2 text-xs font-mono text-muted-foreground">
                                        200 OK — application/json
                                      </span>
                                    </div>
                                    <CodeBlock code={endpoint.response} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

            {/* Types section */}
            {activeCategory === "Types" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-secondary/10">
                    <BracesIcon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-foreground">
                      Type Reference
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium">
                      {typeDefinitions.length} type
                      {typeDefinitions.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {typeDefinitions.map((typeDef) => (
                    <div
                      key={typeDef.name}
                      className="bg-card border-2 border-border rounded-2xl overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 border-b-2 border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono border bg-secondary/15 text-secondary border-secondary/30">
                            type
                          </span>
                          <code className="text-sm font-mono font-bold text-foreground">
                            {typeDef.name}
                          </code>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                          {typeDef.description}
                        </p>
                      </div>
                      <div className="p-4 sm:p-5">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                          Fields
                        </h4>
                        <div className="space-y-2">
                          {typeDef.fields.map((field) => (
                            <div
                              key={field.name}
                              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-2 px-3 bg-muted/40 rounded-xl"
                            >
                              <code className="text-sm font-mono font-bold text-foreground">
                                {field.name}
                              </code>
                              <span className="text-xs font-mono text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-md w-fit">
                                {field.type}
                              </span>
                              {field.optional && (
                                <span className="text-xs font-mono text-secondary font-semibold bg-secondary/10 px-2 py-0.5 rounded-md w-fit">
                                  optional
                                </span>
                              )}

                              <span className="text-sm text-muted-foreground">
                                {field.desc}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
