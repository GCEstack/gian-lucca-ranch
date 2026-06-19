export default function Companion() {
  return (
    <div className="flex flex-col min-h-[calc(100dvh-72px)] bg-cream items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[420px] h-[calc(100dvh-120px)] max-h-[820px] rounded-[24px] overflow-hidden shadow-elevated bg-white">
        <iframe
          src="https://web-mobile-peter.vercel.app/"
          title="Gian Lucca's Companion"
          className="w-full h-full border-0"
          allow="microphone https://web-mobile-peter.vercel.app; camera https://web-mobile-peter.vercel.app; fullscreen https://web-mobile-peter.vercel.app"
          loading="lazy"
        />
      </div>
    </div>
  );
}
