import GiftCard from "@/components/giftCard/GiftCard";
import InstagramFeed from "@/components/instagram/InstagramFeed";
import MainPage from "@/components/mainpage/MainPage";
import Welcome from "@/components/welcomePage/welcome";
import WhatWeOffer from "@/components/whatWeOffer/WhatWeOffer";

export default function Home() {
  return (
    <>
      <div>
        <MainPage />
        <Welcome />
        <WhatWeOffer />
        <GiftCard/>
        <InstagramFeed/>
      </div>
    </>
  );
}
