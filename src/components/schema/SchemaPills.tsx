"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { TableSchema } from "@/lib/schema";

type Props = {
  schemas: TableSchema[];
};

export function SchemaPills({ schemas }: Props) {
  const [activeTable, setActiveTable] = useState<string | null>(null);

  const list = useMemo(() => {
    return [...schemas].sort((a, b) => a.table.localeCompare(b.table));
  }, [schemas]);

  const handleOpenChange = useCallback(
    (tableName: string) => (open: boolean) => {
      setActiveTable((previous) =>
        open ? tableName : previous === tableName ? null : previous,
      );
    },
    [],
  );

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">Tables</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {list.map((table) => (
          <Popover
            key={table.table}
            open={activeTable === table.table}
            onOpenChange={handleOpenChange(table.table)}
          >
            <PopoverTrigger asChild>
              <button
                type="button"
                onClick={() =>
                  setActiveTable((current) =>
                    current === table.table ? null : table.table,
                  )
                }
                className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
                aria-expanded={activeTable === table.table}
                aria-controls={`table-${table.table}`}
                title={table.description || table.table}
              >
                {table.table}
              </button>
            </PopoverTrigger>
            <PopoverContent
              id={`table-${table.table}`}
              className="w-[min(92vw,28rem)] sm:w-96 p-3 text-sm"
              side="bottom"
              align="start"
              avoidCollisions
              collisionPadding={8}
              aria-label={`${table.table} schema`}
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              {table.description ? (
                <p className="mb-2 text-muted-foreground">
                  {table.description}
                </p>
              ) : null}
              <ul className="max-h-56 space-y-1 overflow-auto pr-1">
                {table.columns.map((column) => (
                  <li
                    key={column.name}
                    className="flex items-start justify-between gap-2"
                  >
                    {column.description ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help font-mono text-foreground underline decoration-dotted underline-offset-2">
                            {column.name}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="max-w-xs text-left"
                        >
                          {column.description}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <span className="font-mono text-foreground">
                        {column.name}
                      </span>
                    )}
                    <span className="whitespace-nowrap font-mono text-xs text-primary/90">
                      {column.type}
                    </span>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
}
