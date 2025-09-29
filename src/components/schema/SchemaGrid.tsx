"use client";

import type { TableSchema } from "@/lib/schema";
import { SchemaCard } from "./SchemaCard";
import { useMemo, useState } from "react";

type Props = {
  schemas: TableSchema[];
  title?: string;
  subtitle?: string;
};

export function SchemaGrid({ schemas, title = "Schemas", subtitle }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return schemas;
    return schemas.filter((tableSchema) => {
      if (tableSchema.table.toLowerCase().includes(q)) return true;
      if (tableSchema.description?.toLowerCase().includes(q)) return true;
      return tableSchema.columns.some(
        (column) =>
          column.name.toLowerCase().includes(q) ||
          column.type.toLowerCase().includes(q) ||
          column.description?.toLowerCase().includes(q),
      );
    });
  }, [schemas, query]);

  return (
    <section className="w-full">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <div className="relative w-full max-w-xs">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tables or columns…"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-0 focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((tableSchema) => (
          <SchemaCard key={tableSchema.table} tableSchema={tableSchema} />
        ))}
      </div>
    </section>
  );
}
