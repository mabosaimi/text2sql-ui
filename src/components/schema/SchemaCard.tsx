import type { TableSchema } from "@/lib/schema";

type Props = {
  tableSchema: TableSchema;
};

export function SchemaCard({ tableSchema }: Props) {
  return (
    <div className="rounded-xl border border-accent-foreground/30 bg-accent/30 p-4 shadow-sm backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-base text-foreground">
          <span className="font-mono text-primary">{tableSchema.table}</span>
        </h3>
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
          Table
        </span>
      </div>
      {tableSchema.description ? (
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {tableSchema.description}
        </p>
      ) : null}

      <div className="rounded-lg bg-background/60 p-3">
        <div className="mb-1 text-xs font-medium text-muted-foreground">
          Columns
        </div>
        <ul className="grid grid-cols-1 gap-1 text-sm">
          {tableSchema.columns.slice(0, 6).map((column) => (
            <li
              key={column.name}
              className="flex items-start justify-between gap-2"
            >
              <div className="min-w-0">
                <span className="font-mono text-foreground">{column.name}</span>
                {column.description ? (
                  <span className="ml-2 truncate text-xs text-muted-foreground">
                    — {column.description}
                  </span>
                ) : null}
              </div>
              <span className="whitespace-nowrap font-mono text-xs text-primary/90">
                {column.type}
              </span>
            </li>
          ))}
        </ul>
        {tableSchema.columns.length > 6 ? (
          <div className="mt-2 text-xs text-muted-foreground">
            +{tableSchema.columns.length - 6} more…
          </div>
        ) : null}
      </div>
    </div>
  );
}
