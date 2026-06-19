export default function Companion() {
  return (
    <div className="flex flex-col h-[calc(100dvh-72px)] bg-cream">
      <div className="flex-1 relative">
        <iframe
          src="https://web-mobile-peter.vercel.app/"
          title="Gian Lucca's Companion"
          className="absolute inset-0 w-full h-full border-0"
          allow="microphone; camera; fullscreen"
          loading="lazy"
        />
      </div>
    </div>
  );
}
