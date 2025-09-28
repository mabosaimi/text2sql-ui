import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <div className='grid w-full gap-2'>
          <Textarea
            placeholder='What was the revenue in Q2?'
            className='resize-none'
          />
          <Button>Generate SQL</Button>
        </div>
      </main>
    </div>
  );
}
