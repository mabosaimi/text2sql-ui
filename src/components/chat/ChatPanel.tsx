"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

// TODO: Batch evaluation/generation (user drags and drops a file in a specific format then we evaluate it... or return the SQL for each query)

export function ChatPanel() {
  const [userRequests, setUserRequests] = useState<string[]>([]);
  const [requestInput, setRequestInput] = useState("");

  const submitRequest = () => {
    const trimmed = requestInput.trim();
    if (!trimmed) return;
    setUserRequests((previous) => [...previous, trimmed]);
    setRequestInput("");
  };

  return (
    <section className="rounded-xl border border-border bg-card shadow-sm">
      <div className="p-4 sm:p-6 space-y-3">
        <p className="text-sm text-muted-foreground">Describe your question</p>
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
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={submitRequest}
            disabled={!requestInput.trim()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate
          </button>
        </div>
      </div>
    </section>
  );
}
