import { AdsListModal } from "./CreateAdsListModal";

interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GamerBanner(props: GameBannerProps) {
  return (
      <div className="relative rounded-lg overflow-hidden h-[180px] md:h-64">
        <img src={props.bannerUrl} alt="" />

        <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
          <strong className="font-bold text-white block">{props.title}</strong>
          <span className="text-zinc-300 text-sm block ">
            {props.adsCount} ads
          </span>
        </div>
      </div>
  );
}
