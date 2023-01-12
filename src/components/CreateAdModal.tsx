import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToogleGroup from "@radix-ui/react-toggle-group";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

interface GameProps {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<GameProps[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  useEffect(() => {
    axios("https://get-your-duo-back-end.vercel.app/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3000/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      toast.success("Ad created");
    } catch (err) {
      alert("Error creating the Ad, try again");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed " />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg md:w-[520px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">Post an Ad</Dialog.Title>
        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4 h-[400px] overflow-scroll pr-3 md:overflow-hidden md:h-fit">
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="game">
              Which is the game?
            </label>
            <select
              placeholder="Select the game you wish to play"
              name="game"
              id="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
              defaultValue=""
            >
              <option disabled value="">
                Select the game you wish to play
              </option>
              {games.map((game) => {
                return (
                  <option value={game.id} key={game.id}>
                    {game.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Your name (or nickname)</label>
            <Input
              name="name"
              id="name"
              placeholder="How are you called on the game?"
            />
          </div>
          <div className="flex flex-col md:grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">How long do you play?</label>
              <Input
                type="number"
                name="yearsPlaying"
                id="yearsPlaying"
                placeholder="no worries if it's zero"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">What is your discord?</label>
              <Input
                name="discord"
                id="discord"
                type="text"
                placeholder="User#0000"
              />
            </div>
          </div>
          <div className="md:flex flex-row gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">When do you usually play?</label>

              <ToogleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToogleGroup.Item
                  value="0"
                  title="Sunday"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("0") ? "bg-violet-500" : " bg-zinc-900"
                  }`}
                >
                  S
                </ToogleGroup.Item>
                <ToogleGroup.Item
                  value="1"
                  title="Monday"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("1") ? "bg-violet-500" : " bg-zinc-900"
                  }`}
                >
                  M
                </ToogleGroup.Item>
                <ToogleGroup.Item
                  value="2"
                  title="Tuesday"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("2") ? "bg-violet-500" : " bg-zinc-900"
                  }`}
                >
                  T
                </ToogleGroup.Item>
                <ToogleGroup.Item
                  value="3"
                  title="Wednesday"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("3") ? "bg-violet-500" : " bg-zinc-900"
                  }`}
                >
                  W
                </ToogleGroup.Item>
                <ToogleGroup.Item
                  value="4"
                  title="Thursday"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("4") ? "bg-violet-500" : " bg-zinc-900"
                  }`}
                >
                  T
                </ToogleGroup.Item>
                <ToogleGroup.Item
                  value="5"
                  title="Friday"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("5") ? "bg-violet-500" : " bg-zinc-900"
                  }`}
                >
                  F
                </ToogleGroup.Item>
                <ToogleGroup.Item
                  value="6"
                  title="Saturday"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("6") ? "bg-violet-500" : " bg-zinc-900"
                  }`}
                >
                  S
                </ToogleGroup.Item>
              </ToogleGroup.Root>
            </div>
            <div className="flex flex-col flex-1 ">
              <label htmlFor="hourStart">What time of the day?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="hourStart"
                  id="hourStart"
                  type="time"
                  placeholder="from"
                />
                <Input
                  name="hourEnd"
                  id="hourEnd"
                  type="time"
                  placeholder="until"
                />
              </div>
            </div>
          </div>
          <label className="mt-2 flex gap-2 text-sm items-center">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            I often connect to voice chat
          </label>
          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancel
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController className="w-6 h-6" />
              Find Duo
            </button>
          </footer>
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
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
