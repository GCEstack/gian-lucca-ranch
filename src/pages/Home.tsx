import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { playAnimalSound } from "../lib/sounds";

const friends = [
  {
    name: "Benny the Bear",
    description: "Your best friend! Loves honey and warm hugs 🍯",
    image: "/bear-friend.png",
  },
  {
    name: "The Chicken Crew",
    description: "Cluck cluck! They lay eggs and love to play 🥚",
    image: "/chickens-friends.png",
  },
  {
    name: "Tommy the Turkey",
    description: "Gobble gobble! His feathers are so colorful 🌈",
    image: "/turkey-friends.png",
  },
  {
    name: "The Ranch",
    description: "Home sweet home — where all the magic happens 🏡",
    image: "/ranch-house.png",
  },
];

const exploreCards = [
  { emoji: "🌾", title: "The Barn" },
  { emoji: "🌸", title: "The Meadow" },
  { emoji: "🐔", title: "The Chicken Coop" },
  { emoji: "🦃", title: "The Turkey Run" },
];

const nextLinks = [
  { to: "/videos", emoji: "🎬", title: "Videos", desc: "Watch The Sleepy Little Bear" },
  { to: "/learning", emoji: "🎨", title: "Learning", desc: "Learn ABCs, numbers & more!" },
  { to: "/stories", emoji: "📖", title: "Stories", desc: "Read along with Daddy" },
  { to: "/music", emoji: "🎵", title: "Music", desc: "Listen to Ba Ba Ab" },
];

function SectionTitle({
  eyebrow,
  title,
  light = false,
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div className="text-center">
      <span
        className={`font-quicksand text-sm font-semibold uppercase tracking-[0.05em] block mb-3 ${
          light ? "text-white/70" : "text-sage-green"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`font-fredoka text-3xl sm:text-[40px] font-medium leading-tight ${
          light ? "text-white" : "text-dark-brown"
        }`}
      >
        {title}
      </h2>
      <div
        className="w-[60px] h-[3px] rounded-full mx-auto mt-4"
        style={{ backgroundColor: "var(--color-golden-honey)" }}
      />
    </div>
  );
}

export default function Home() {
  const [temp, setTemp] = useState(75);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = Math.floor(Math.random() * (78 - 70 + 1)) + 70;
    setTemp(t);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(rgb(197, 224, 236) 0%, rgb(232, 242, 246) 50%, rgb(251, 247, 240) 100%)",
        }}
      >
        {/* Clouds */}
        <div className="absolute pointer-events-none">
          <span className="absolute text-white/60 text-6xl" style={{ left: "10vw", top: "12vh" }}>
            ☁️
          </span>
          <span className="absolute text-white/60 text-5xl" style={{ left: "45vw", top: "8vh" }}>
            ☁️
          </span>
          <span className="absolute text-white/60 text-6xl" style={{ left: "70vw", top: "18vh" }}>
            ☁️
          </span>
        </div>

        {/* Sun */}
        <div
          className="absolute top-[8%] right-[12%] w-20 h-20 sm:w-28 sm:h-28 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(245, 216, 154) 0%, rgb(232, 197, 71) 60%, transparent 70%)",
          }}
        />

        {/* Side emojis */}
        <button
          type="button"
          onClick={() => playAnimalSound("bear")}
          className="absolute hidden sm:inline-block text-[40px] left-[5%] top-[20%] hover:scale-110 transition-transform cursor-pointer"
          aria-label="Bear sound"
        >🐻</button>
        <button
          type="button"
          onClick={() => playAnimalSound("chicken")}
          className="absolute hidden sm:inline-block text-[40px] left-[5%] top-[50%] hover:scale-110 transition-transform cursor-pointer"
          aria-label="Chicken sound"
        >🐔</button>
        <button
          type="button"
          onClick={() => playAnimalSound("turkey")}
          className="absolute hidden sm:inline-block text-[40px] right-[5%] top-[25%] hover:scale-110 transition-transform cursor-pointer"
          aria-label="Turkey sound"
        >🦃</button>
        <span className="absolute hidden sm:inline-block text-[40px] right-[5%] top-[55%]">🏠</span>

        {/* Ranch scene + title */}
        <div className="absolute bottom-0 left-0 right-0 w-full max-w-[1000px] mx-auto">
          <img
            src="/hero-ranch-scene.png"
            alt="Ranch scene"
            className="w-full h-auto object-contain mx-auto"
            style={{ maxHeight: "35vh" }}
          />
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ marginTop: "-10vh" }}>
            <h1
              className="font-fredoka text-4xl sm:text-5xl lg:text-[64px] font-semibold leading-[1.1] tracking-tight"
              style={{
                color: "var(--color-dark-brown)",
                textShadow: "rgba(255, 255, 255, 0.8) 0px 2px 20px",
              }}
            >
              Welcome to Your Ranch, Gian Lucca!
            </h1>
            <p className="font-quicksand text-lg sm:text-[22px] text-soft-brown mt-4">
              A magical world made just for you
            </p>
            <p
              className="font-caveat text-xl sm:text-[28px] mt-6"
              style={{ color: "var(--color-warm-terracotta)" }}
            >
              From Daddy with Love ❤️
            </p>
          </div>

          {/* Weather card */}
          <div className="relative z-10 flex justify-center px-4" style={{ marginTop: "-40px" }}>
            <div
              className="bg-white rounded-card shadow-elevated p-6 max-w-[400px] w-full text-center"
              style={{ border: "2px solid rgba(139, 154, 124, 0.15)" }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <MapPin className="w-3.5 h-3.5 text-soft-brown" />
                <span className="font-quicksand text-sm font-semibold uppercase tracking-[0.05em] text-sage-green">
                  The Ranch
                </span>
                <span className="font-quicksand text-xs text-soft-brown/60 ml-2">Updated just now</span>
              </div>
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-5xl">☀️</span>
                <span className="font-fredoka text-4xl text-dark-brown">{temp}°F</span>
              </div>
              <p className="font-quicksand text-base text-soft-brown">Sunny and warm!</p>
              <p className="font-quicksand text-sm text-soft-brown/70 mt-1">Perfect day to play outside 🌈</p>
            </div>
          </div>
        </div>
      </section>

      {/* Friends */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="🌟 YOUR RANCH FRIENDS" title="Meet Your Animal Friends" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {friends.map((friend) => (
              <div
                key={friend.name}
                className="group cursor-pointer"
                onClick={() => playAnimalSound(friend.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && playAnimalSound(friend.name)}
                aria-label={`Play ${friend.name} sound`}
              >
                <div
                  className="rounded-card overflow-hidden shadow-soft group-hover:shadow-hover transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(251, 247, 240, 0.95) 100%)",
                    border: "2px solid rgba(139, 154, 124, 0.15)",
                  }}
                >
                  <div
                    className="h-[200px] overflow-hidden flex items-center justify-center p-4"
                    style={{ backgroundColor: "rgba(251, 247, 240, 0.5)" }}
                  >
                    <img
                      src={friend.image}
                      alt={friend.name}
                      className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105 group-active:scale-95"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-fredoka text-xl sm:text-[22px] font-medium text-dark-brown mb-2">
                      {friend.name}
                    </h3>
                    <p className="font-quicksand text-sm text-soft-brown leading-relaxed">
                      {friend.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore the Ranch */}
      <section className="py-16 sm:py-24" style={{ backgroundColor: "var(--color-light-sand)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="🌲 DISCOVER" title="Explore the Ranch" />
          <div className="mt-12">
            <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
              {exploreCards.map((card) => (
                <div
                  key={card.title}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] h-[200px] sm:h-[240px] rounded-2xl overflow-hidden relative snap-center cursor-pointer group"
                  style={{ scrollSnapAlign: "center" }}
                >
                  <img
                    src="/hero-ranch-scene.png"
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(transparent 40%, rgba(61, 50, 41, 0.7) 100%)",
                    }}
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="text-xl">{card.emoji}</span>
                    <span className="font-fredoka text-xl text-white">{card.title}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center font-quicksand text-sm text-soft-brown/70 mt-4">
              ← Slide to explore →
            </p>
          </div>
        </div>
      </section>

      {/* Daddy's note */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="💌 A SPECIAL MESSAGE" title="A Note From Daddy ❤️" />
          <div
            className="mt-10 bg-white rounded-card shadow-soft p-6 sm:p-10"
            style={{ border: "2px solid rgba(139, 154, 124, 0.15)" }}
          >
            <p className="font-quicksand text-base sm:text-lg text-soft-brown leading-relaxed">
              Dear Gian Lucca,
              <br />
              <br />
              I built this little ranch world for you because you are the most amazing person in my
              life. Every bear hug, every chicken cluck, every turkey gobble — it&apos;s all here
              because I love you more than words can say.
              <br />
              <br />
              I hope this place makes you smile, helps you learn, and fills your dreams with
              wonderful adventures.
              <br />
              <br />
              Remember: you are brave like the bear, cheerful like the chickens, and proud like the
              turkey. And no matter what, Daddy will always be right here, loving you with all my
              heart.
              <br />
              <br />
              <span className="font-caveat text-xl text-warm-terracotta">
                Love, Daddy ❤️
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Where to next */}
      <section className="py-16 sm:py-20 bg-sage-green">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="🚀 WHERE TO NEXT?" title="Let's Go Explore!" light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {nextLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group block bg-white/95 hover:bg-white rounded-2xl p-6 text-center transition-all duration-200 h-full"
                style={{
                  minHeight: "180px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span className="text-5xl mb-3 block">{link.emoji}</span>
                <h3 className="font-fredoka text-xl text-dark-brown mb-2">{link.title}</h3>
                <p className="font-quicksand text-sm text-soft-brown mb-3">{link.desc}</p>
                <span
                  className="inline-block font-quicksand text-lg transition-transform duration-200 group-hover:translate-x-2"
                  style={{ color: "var(--color-warm-terracotta)" }}
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
