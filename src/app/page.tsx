import { ChatPanel } from "@/components/chat/ChatPanel";
import { SchemaPills } from "@/components/schema/SchemaPills";
import { fetchSchemas } from "@/lib/api";
import { SAMPLE_SCHEMAS } from "@/lib/schema";

export default async function Home() {
  let schemas = SAMPLE_SCHEMAS;
  try {
    schemas = await fetchSchemas();
  } catch {
    // silent fallback to SAMPLE_SCHEMAS
  }
  return (
    <div className="font-sans min-h-screen p-6 pb-20 sm:p-10">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="rounded-lg border bg-card shadow-sm">
          <div className="p-4 sm:p-6">
            <SchemaPills schemas={schemas} />
          </div>
        </section>
        <ChatPanel />
      </div>
    </div>
  );
}
