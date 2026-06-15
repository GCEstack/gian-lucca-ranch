import { useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/videos", label: "Videos", icon: "🎬" },
  { to: "/learning", label: "Learning", icon: "🎨" },
  { to: "/stories", label: "Stories", icon: "📖" },
  { to: "/music", label: "Music", icon: "🎵" },
];

function DesktopNavItem({ to, label, icon }: { to: string; label: string; icon: string }) {
  const match = useMatch(to === "/" ? { path: "/", end: true } : `${to}/*`);
  const isActive = !!match;

  return (
    <NavLink
      to={to}
      className={`relative px-3 py-2 font-fredoka text-base font-medium transition-colors duration-200 rounded-lg ${
        isActive ? "text-sage-green" : "text-soft-brown hover:text-dark-brown"
      }`}
    >
      <span className="flex items-center gap-1">
        <span>{icon}</span>
        <span>{label}</span>
      </span>
      {isActive && (
        <div className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-sage-green" />
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center border-b-2 transition-all duration-300"
      style={{
        backgroundColor: "rgba(251, 247, 240, 0.92)",
        backdropFilter: "blur(12px)",
        borderColor: "rgba(139, 154, 124, 0.12)",
      }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        <NavLink
          to="/"
          className="font-fredoka text-lg sm:text-xl font-medium text-dark-brown tracking-wide whitespace-nowrap"
        >
          🐻🐔 Gian Lucca&apos;s Ranch 🦃🏠
        </NavLink>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <DesktopNavItem key={item.to} {...item} />
          ))}
        </div>

        <button
          className="md:hidden p-2 rounded-lg transition-colors text-soft-brown hover:text-dark-brown"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="absolute top-[72px] left-0 right-0 bg-cream border-b-2 border-sage-green/12 md:hidden">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-fredoka text-base font-medium flex items-center gap-2 ${
                    isActive
                      ? "bg-sage-green/10 text-sage-green"
                      : "text-soft-brown hover:bg-sage-green/5"
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
