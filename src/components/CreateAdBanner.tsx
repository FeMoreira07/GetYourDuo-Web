import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center gap-4">
        <div>
          <strong className="text-2xl text-white font-black block">
            Did not find your duo?
          </strong>
          <span className="text-zinc-400">Post an ad to find new players!</span>
        </div>
        <Dialog.Trigger className="px-4 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3 ">
          <MagnifyingGlassPlus size={24} />
          Post ad
        </Dialog.Trigger>
      </div>
    </div>
  );
}
