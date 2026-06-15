import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-sage-green">
      <div className="max-w-[1280px] mx-auto px-6 py-12 flex flex-col items-center justify-center text-center gap-2">
        <p className="font-caveat text-2xl sm:text-3xl text-white">
          Made with love for Gian Lucca
        </p>
        <div className="flex items-center gap-2 text-2xl sm:text-3xl text-white/90">
          <span>🐻</span>
          <span>🐔</span>
          <span>🦃</span>
          <span>🏠</span>
        </div>
        <p className="font-fredoka text-base text-white flex items-center gap-1">
          From Daddy with Love <Heart className="w-4 h-4 fill-red-400 text-red-400" />
        </p>
      </div>
    </footer>
  );
}
