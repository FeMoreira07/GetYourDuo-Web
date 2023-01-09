import * as Dialog from "@radix-ui/react-dialog";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { DuoInfo } from "./DuoInfo";
import { IoClose } from "react-icons/all";

interface GameDataProps {
  game: {
    id: string;
    title: string;
  };
}

interface AdsProps {
  id: string;
  name: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
}

export function AdsListModal(gameData: GameDataProps) {
  const [ads, setAds] = useState<AdsProps[]>([]);
  const [isCopy, setIsCopy] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    slideChanged() {},
    vertical: true,
    loop: true,
    slides: {
      perView: 1,
      spacing: 30,
    },
    breakpoints: {
      "(min-width: 750px)": {
        vertical: false,
        slides: {
          perView: 3,
          spacing: 30,
        },
      },
    },
  });

  useEffect(() => {
    axios(`http://localhost:3000/games/${gameData.game.id}/ads`).then(
      (response) => {
        setAds(response.data);
      }
    );
  }, []);

  function copyToClipBoard(duoName: string) {
    copy(duoName);
    setIsCopy(true);
    toast.success("Id coppied!");
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[300px] md:w-[650px] shadow-lg shadow-black/25 flex flex-col items-center">
        <div className="flex flex-row w-full justify-between ">
          <Dialog.Title className="text-3xl font-black ">
            {gameData.game.title}
          </Dialog.Title>
          <Dialog.Close type="button" className="rounded-md font-semibold">
            <IoClose />
          </Dialog.Close>
        </div>
        <h1 className="mt-2 mb-6 self-start">Ads list</h1>
        {ads.length === 0 ? (
          <h1 className="text-lg text-zinc-500 ">
            There is no ads for this game yet!
          </h1>
        ) : (
          <div
            className={`${
              ads.length === 1 ? "" : "keen-slider h-[300px] md:h-[270px]"
            } `}
            ref={sliderRef}
          >
            <Toaster
              toastOptions={{
                className: "",
                style: {
                  background: "#1d1a24",
                  border: "1px solid rgb(139, 92, 246)",
                  padding: "16px",
                  color: "rgb(139, 92, 246)",
                },
              }}
            />
            {ads.map((duo) => {
              return (
                <div
                  className={`bg-[#1d1a24] rounded p-2 ${
                    ads.length === 1 ? "" : "keen-slider__slide flex flex-col"
                  } `}
                >
                  <DuoInfo title="Name" info={duo.name} />
                  <DuoInfo
                    title="Time playing"
                    info={`${duo.yearsPlaying} year(s)`}
                  />
                  <DuoInfo
                    title="Availability"
                    info={`${duo.weekDays.length} days ${duo.hourStart} - ${duo.hourEnd}`}
                    fontSize
                  />
                  <div className="mb-5 md:mb-2">
                    <h4 className="text-[#C4C4C6]">Audio calls?</h4>
                    {duo.useVoiceChannel ? (
                      <p className="text-[#25ff37]">Yes</p>
                    ) : (
                      <p className="text-[#ff4444]">No</p>
                    )}
                  </div>
                  <div className="self-center">
                    <button
                      className={`bg-violet-500 hover:bg-violet-600 w-40 h-8 rounded`}
                      onClick={() => {
                        copyToClipBoard(duo.name);
                      }}
                    >
                      Ad duo
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
