import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Play, Pause } from "lucide-react";
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

const stories = [
  {
    id: "sleepy-bear",
    title: "The Sleepy Little Bear",
    description: "A heartwarming bedtime story about a little bear who can't fall asleep.",
    emoji: "🐻",
    category: "Bedtime",
    src: "/audio/story_sleepy_bear.m4a",
    duration: 58,
    soon: true,
  },
  {
    id: "benny-adventure",
    title: "Benny Bear's Adventure",
    description: "Join Benny Bear on an exciting journey through the ranch!",
    emoji: "🐻",
    category: "Adventure",
    src: "/audio/story_benny_adventure.m4a",
    duration: 50,
    soon: false,
  },
  {
    id: "chicken-dance",
    title: "Chicken Dance Party",
    description: "Get ready to dance with the chickens in this fun-filled story!",
    emoji: "🐔",
    category: "Fun",
    src: "/audio/story_chicken_dance.m4a",
    duration: 46,
    soon: true,
  },
  {
    id: "tommy-turkey",
    title: "Tommy Turkey's Day",
    description: "Spend a day with Tommy Turkey and learn about gratitude.",
    emoji: "🦃",
    category: "Gratitude",
    src: "/audio/story_tommy_turkey.m4a",
    duration: 44,
    soon: true,
  },
  {
    id: "ranch-morning",
    title: "Ranch Morning Routine",
    description: "See what mornings are like on Gian Lucca's Ranch!",
    emoji: "🌅",
    category: "Routine",
    src: "/audio/story_ranch_morning.m4a",
    duration: 46,
    soon: true,
  },
  {
    id: "starlight-lullaby",
    title: "Starlight Lullaby",
    description: "A soothing journey among the stars.",
    emoji: "🌙",
    category: "Bedtime",
    src: "/audio/story_starlight_lullaby.m4a",
    duration: 47,
    soon: true,
  },
  {
    id: "rainy-day-parade",
    title: "The Rainy Day Parade",
    description: "When rain ruins the picnic, the friends make their own parade!",
    emoji: "🌧️",
    category: "Fun",
    src: "/audio/story_rainy_day_parade.m4a",
    duration: 225,
    soon: false,
  },
  {
    id: "great-honey-harvest",
    title: "The Great Honey Harvest",
    description: "Benny and friends work together to collect the sweetest honey of the year.",
    emoji: "🍯",
    category: "Celebration",
    src: "/audio/story_great_honey_harvest.m4a",
    duration: 229,
    soon: true,
  },
  {
    id: "night-under-stars",
    title: "Benny's Night Under the Stars",
    description: "A cozy camping story about stars, fireflies, and Daddy's love.",
    emoji: "⭐",
    category: "Bedtime",
    src: "/audio/story_night_under_stars.m4a",
    duration: 230,
    soon: true,
  },
];

export default function Home() {
  const [temp] = useState(() => Math.floor(Math.random() * (78 - 70 + 1)) + 70);
  const heroRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeStory, setActiveStory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, [activeStory]);

  const toggleStory = (id: string, src: string) => {
    if (activeStory === id) {
      const audio = audioRef.current;
      if (audio) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          audio.play().catch(() => {});
          setIsPlaying(true);
        }
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(src);
      audioRef.current = audio;
      setActiveStory(id);
      setProgress(0);
      setDuration(0);
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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

      {/* Welcome Video */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="font-quicksand text-sm font-semibold uppercase tracking-[0.05em] text-sage-green block mb-3">
              🎥 A SPECIAL HELLO
            </span>
            <h2 className="font-fredoka text-3xl sm:text-[40px] font-medium text-dark-brown">
              Welcome From Daddy
            </h2>
            <div
              className="w-[60px] h-[3px] rounded-full mx-auto mt-4"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>
          <div className="relative w-full max-w-[480px] mx-auto rounded-[20px] overflow-hidden bg-dark-brown aspect-[9/16] shadow-elevated">
            <video
              src="/videos/welcome.mp4"
              poster="/daddy-gian-photo.jpg"
              controls
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
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

      {/* Pick Your Lotso Italiano */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="font-quicksand text-sm font-semibold uppercase tracking-[0.05em] text-sage-green block mb-3">
              🍓 BA BA BA
            </span>
            <h2 className="font-fredoka text-3xl sm:text-[40px] font-medium text-dark-brown">
              Pick Your Lotso Italiano
            </h2>
            <div
              className="w-[60px] h-[3px] rounded-full mx-auto mt-4"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                src: "/lotso/lotso_baby.png",
                name: "Baby Lotso",
                desc: "The cutest strawberry in the crib 🍼",
              },
              {
                src: "/lotso/lotso_mobster.png",
                name: "Gentleman Lotso",
                desc: "Classy, cozy, and always polite 🎩",
              },
              {
                src: "/lotso/lotso.png",
                name: "Boss Lotso",
                desc: "The original strawberry don 🍓",
              },
            ].map((lotso) => (
              <div
                key={lotso.name}
                className="bg-white rounded-[20px] overflow-hidden shadow-soft hover:shadow-hover transition-shadow duration-200"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={lotso.src}
                    alt={lotso.name}
                    className="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-fredoka text-lg text-dark-brown">{lotso.name}</h3>
                  <p className="font-quicksand text-sm text-soft-brown">{lotso.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-[700px] mx-auto">
            <div className="relative w-full rounded-[20px] overflow-hidden bg-dark-brown aspect-video shadow-elevated">
              <video
                src="/videos/lotso_baby_speaking.mp4"
                poster="/lotso/lotso_baby.png"
                controls
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <p className="text-center font-quicksand text-sm text-soft-brown mt-3">
              🎥 Baby Lotso has something to say!
            </p>
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

      {/* Story Time Collection */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="📖 STORY TIME" title="Daddy's Story Collection" />
          <div className="mt-10 space-y-4">
            {stories.map((story) => {
              const playing = activeStory === story.id && isPlaying;
              const currentProgress = activeStory === story.id ? progress : 0;
              const currentDuration = activeStory === story.id ? duration : story.duration;
              const pct = currentDuration ? (currentProgress / currentDuration) * 100 : 0;

              return (
                <div
                  key={story.id}
                  className={`rounded-card shadow-soft p-4 sm:p-5 transition-all duration-200 ${
                    story.soon
                      ? "bg-soft-brown/5 opacity-70"
                      : "bg-white hover:shadow-md"
                  }`}
                  style={{ border: "2px solid rgba(139, 154, 124, 0.15)" }}
                >
                  <div className="flex items-center gap-4">
                    {story.soon ? (
                      <div
                        className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-soft-brown/20"
                        aria-label="Coming soon"
                      >
                        <span className="text-xl">🔒</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleStory(story.id, story.src)}
                        className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-transform duration-200 active:scale-95 hover:scale-105"
                        style={{ backgroundColor: "var(--color-warm-terracotta)" }}
                        aria-label={playing ? "Pause story" : "Play story"}
                      >
                        {playing ? (
                          <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
                        ) : (
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-0.5" />
                        )}
                      </button>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-0.5">
                        <span className="text-xl">{story.emoji}</span>
                        <h3 className={`font-fredoka text-lg sm:text-xl ${story.soon ? "text-soft-brown" : "text-dark-brown"}`}>
                          {story.title}
                        </h3>
                      </div>
                      <p className="font-quicksand text-sm text-soft-brown leading-snug">
                        {story.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      {story.soon ? (
                        <span className="inline-block font-quicksand text-xs font-semibold px-2.5 py-1 rounded-full bg-soft-brown/20 text-soft-brown">
                          Coming Soon
                        </span>
                      ) : (
                        <>
                          <span
                            className="inline-block font-quicksand text-xs font-semibold px-2.5 py-1 rounded-full mb-1"
                            style={{
                              backgroundColor: "rgba(139, 154, 124, 0.12)",
                              color: "var(--color-sage-green)",
                            }}
                          >
                            {story.category}
                          </span>
                          <p className="font-quicksand text-xs text-soft-brown/70">
                            {formatTime(currentDuration)}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {!story.soon && activeStory === story.id && (
                    <div className="mt-3">
                      <div
                        className="h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: "rgba(139, 154, 124, 0.15)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-100"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: "var(--color-warm-terracotta)",
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 font-quicksand text-xs text-soft-brown/70">
                        <span>{formatTime(currentProgress)}</span>
                        <span>{formatTime(currentDuration)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
