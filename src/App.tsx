import { useState, useEffect } from "react";
import "./styles/main.css";
import logo from "./assets/Logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { GamerBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";
import { AdsListModal } from "./components/CreateAdsListModal";
export interface GameProps {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}
function App() {
  const [games, setGames] = useState<GameProps[]>([]);
  useEffect(() => {
    axios("/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex  flex-col items-center my-20">
      <img src={logo} alt="Logo image" />
      <h1 className=" p-3 text-6xl text-white font-black mt-20">
        Your{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          Duo
        </span>{" "}
        is here.
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-16 p-[30px]">
        {games.map((game) => {
          return (
            <Dialog.Root key={game.id}>
              <Dialog.Trigger className="grid">
                <GamerBanner
                  key={game.id}
                  bannerUrl={game?.bannerUrl}
                  title={game.title}
                  adsCount={game._count.ads}
                />
              </Dialog.Trigger>
              <AdsListModal game={game} />
            </Dialog.Root>
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
