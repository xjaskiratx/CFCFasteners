"use client";

import dynamic from "next/dynamic";

const HeroAnimatedBackground = dynamic(
  () => import("@/components/HeroAnimatedBackground"),
  { ssr: false }
);
const RippleBackground = dynamic(
  () => import("@/components/RippleBackground"),
  { ssr: false }
);

export default function ClientBackgrounds({
  showHero = true,
  showRipple = false,
}: {
  showHero?: boolean;
  showRipple?: boolean;
}) {
  return (
    <>
      {showHero ? <HeroAnimatedBackground /> : null}
      {showRipple ? <RippleBackground /> : null}
    </>
  );
}
