"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { searchQuery, type SearchResponse } from "@/lib/api";
import { Dice4, Loader2 } from "lucide-react";

// TODO: batch evaluation/generation (user drags and drops a file in a specific format then we evaluate it... or return the SQL for each query)
// TODO: maybe store user queries and responses in local storage?
export function ChatPanel() {
  const [requestInput, setRequestInput] = useState("");
  const [limitInput, setLimitInput] = useState<string>("5");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<SearchResponse | null>(null);

  const submitRequest = () => {
    const trimmed = requestInput.trim();
    if (!trimmed) return;
    const parsedLimit = Math.min(
      50,
      Math.max(1, Number.parseInt(limitInput || "5", 10)),
    );
    setLimitInput(String(parsedLimit));
    setIsSubmitting(true);
    setErrorMessage(null);
    setApiResponse(null);

    searchQuery(trimmed, parsedLimit)
      .then((data) => setApiResponse(data))
      .catch((err: unknown) => {
        setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      })
      .finally(() => {
        setIsSubmitting(false);
        setRequestInput("");
      });
  };

  return (
    <section className="rounded-xl border border-border bg-card shadow-sm">
      <div className="p-4 sm:p-6 space-y-3">
        <p className="text-sm text-muted-foreground">Ask about the data</p>
        <label htmlFor="request" className="sr-only">
          Request
        </label>
        <Textarea
          id="request"
          value={requestInput}
          onChange={(e) => setRequestInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitRequest();
            }
          }}
          placeholder="What are the work items due this week with status blocked"
          aria-label="Request"
          className="resize-none"
        />
        <div className="flex flex-wrap items-center justify-end gap-2">
          <div className="mr-auto flex items-center gap-2">
            <label htmlFor="limit" className="text-xs text-muted-foreground">
              Limit
            </label>
            <input
              id="limit"
              type="number"
              min={1}
              max={50}
              value={limitInput}
              onChange={(e) => setLimitInput(e.target.value)}
              className="w-20 rounded-md border border-border bg-background px-2 py-1 text-sm outline-none focus:border-primary"
            />
          </div>
          <Dice4 className="text-muted-foreground" />
          <button
            type="button"
            onClick={submitRequest}
            disabled={!requestInput.trim() || isSubmitting}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Generating
              </>
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="p-4 sm:p-6 space-y-3">
          {errorMessage ? (
            <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive-foreground">
              {errorMessage}
            </div>
          ) : null}

          {apiResponse ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {apiResponse.count ?? apiResponse.results.length} result
                  {(apiResponse.count ?? apiResponse.results.length) === 1
                    ? ""
                    : "s"}
                </div>
                <div className="text-xs text-muted-foreground">
                  limit {apiResponse.limit}
                </div>
              </div>
              <ul className="space-y-3">
                {apiResponse.results.map((result) => (
                  <li
                    key={result.index}
                    className="rounded-md border bg-background p-3"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="text-xs text-muted-foreground">
                        score {result.score.toFixed(3)}
                      </div>
                    </div>
                    <pre className="whitespace-pre-wrap break-words rounded-md bg-card p-2 font-mono text-sm text-foreground">
                      {result.text}
                    </pre>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
