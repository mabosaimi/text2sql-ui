import { SchemaPills } from "@/components/schema/SchemaPills";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { SAMPLE_SCHEMAS } from "@/lib/schema";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-6 pb-20 sm:p-10">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="rounded-lg border bg-card shadow-sm">
          <div className="p-4 sm:p-6">
            <SchemaPills schemas={SAMPLE_SCHEMAS} />
          </div>
        </section>
        <ChatPanel />
      </div>
    </div>
  );
}
