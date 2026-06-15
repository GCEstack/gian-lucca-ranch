import { Heart } from "lucide-react";

const socialLinks = [
  { id: "bluesky-icon", label: "Bluesky", href: "#" },
  { id: "x-icon", label: "X / Twitter", href: "#" },
  { id: "github-icon", label: "GitHub", href: "#" },
  { id: "discord-icon", label: "Discord", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-sage-green">
      <div className="max-w-[1280px] mx-auto px-6 py-12 flex flex-col items-center justify-center text-center gap-4">
        <p className="font-caveat text-2xl sm:text-3xl text-white">
          Made with love for Gian Lucca
        </p>

        <div className="flex items-center gap-2 text-2xl sm:text-3xl text-white/90">
          <span>🐻</span>
          <span>🐔</span>
          <span>🦃</span>
          <span>🏠</span>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-label={link.label}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" aria-hidden="true">
                <use href={`/icons.svg#${link.id}`} />
              </svg>
            </a>
          ))}
        </div>

        <p className="font-fredoka text-base text-white flex items-center gap-1">
          From Daddy with Love <Heart className="w-4 h-4 fill-red-400 text-red-400" />
        </p>
      </div>
    </footer>
  );
}
