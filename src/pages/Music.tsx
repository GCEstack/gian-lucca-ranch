import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Music2, BookOpen, Home, Heart } from "lucide-react";

const songs = [
  {
    title: "Ba Ba Ab",
    subtitle: "Daddy's Favorite Lullaby",
    duration: "0:10",
    image: "/music-banner.png",
    featured: true,
  },
  {
    title: "Twinkle Twinkle Little Star",
    subtitle: "Bedtime Classic",
    duration: "2:08",
    image: "/sleepy-bear-story.png",
    featured: false,
  },
  {
    title: "The Bear Went Over the Mountain",
    subtitle: "Fun & Playful",
    duration: "1:45",
    image: "/bear-friend.png",
    featured: false,
  },
  {
    title: "Old MacDonald Had a Farm",
    subtitle: "Ranch Classic",
    duration: "2:22",
    image: "/ranch-house.png",
    featured: false,
  },
  {
    title: "You Are My Sunshine",
    subtitle: "Daddy's Pick",
    duration: "2:04",
    image: "/chickens-friends.png",
    featured: false,
  },
];

const lyrics = [
  "Ba ba ab, ba ba ab,",
  "Daddy loves you, little one.",
  "Ba ba ab, ba ba ab,",
  "You are my moon, my stars, my sun.",
  "Close your eyes, drift away,",
  "Dream of bears and sunny days.",
  "Ba ba ab, ba ba ab,",
  "Daddy's here, now sleep, my love.",
];

export default function Music() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    const a = audioRef.current;
    if (!a) return;
    setProgress((a.currentTime / a.duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a.currentTime = pct * a.duration;
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-16"
        style={{
          background: "linear-gradient(180deg, #f3ede4 0%, #fbf7f0 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="absolute text-5xl sm:text-6xl opacity-15" style={{ left: "10%", top: "20%" }}>
            🎵
          </span>
          <span className="absolute text-5xl sm:text-6xl opacity-15" style={{ right: "12%", top: "18%" }}>
            🎶
          </span>
          <span className="absolute text-4xl sm:text-5xl opacity-15" style={{ left: "18%", bottom: "22%" }}>
            🎵
          </span>
          <span className="absolute text-4xl sm:text-5xl opacity-15" style={{ right: "15%", bottom: "20%" }}>
            🎶
          </span>
          <span className="absolute text-3xl opacity-15" style={{ left: "50%", top: "12%" }}>
            ♪
          </span>
        </div>

        <h1 className="font-fredoka text-4xl sm:text-5xl lg:text-[56px] font-semibold text-dark-brown text-center mb-4 relative z-10">
          🎵 Music & Lullabies
        </h1>
        <p className="font-quicksand text-base sm:text-xl max-w-[500px] text-center text-soft-brown relative z-10">
          Songs to make you smile and help you sleep
        </p>
      </section>

      {/* Daddy's favorite */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-cream">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-10">
            <span className="font-quicksand text-sm font-semibold uppercase tracking-[0.05em] text-warm-terracotta block mb-2">
              ❤️ Daddy's Favorite ❤️
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-medium text-dark-brown mb-3">
              Ba Ba Ab
            </h2>
            <div
              className="w-[60px] h-[3px] mx-auto rounded-full"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="relative aspect-square max-w-[360px] mx-auto w-full">
              <img
                src="/music-banner.png"
                alt="Ba Ba Ab album art"
                className="w-full h-full object-cover rounded-full shadow-elevated"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl sm:text-5xl text-white/90 drop-shadow-lg flex items-center gap-2">
                  <span>♪</span>
                  <span>♫</span>
                  <span>♬</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-fredoka text-2xl sm:text-3xl text-dark-brown">Ba Ba Ab</h3>
                <button
                  onClick={() => setLiked(!liked)}
                  className="p-2 rounded-full hover:bg-sage-green/10 transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      liked ? "fill-red-400 text-red-400" : "text-soft-brown"
                    }`}
                  />
                </button>
              </div>
              <p className="font-quicksand text-lg text-soft-brown mb-2">Daddy's favorite lullaby</p>
              <p className="font-quicksand text-base text-soft-brown/80 mb-6 leading-relaxed">
                This beautiful lullaby is a song about a father's love for his child. Every "Ba Ba"
                is a hug, every note is a kiss goodnight.
              </p>

              <audio
                ref={audioRef}
                src="/audio/bababa.m4a"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setPlaying(false)}
              />

              <div className="bg-white rounded-card shadow-soft p-4">
                <div className="flex items-center gap-3 mb-3">
                  <button
                    onClick={togglePlay}
                    className="flex items-center justify-center rounded-full w-12 h-12 bg-sage-green text-white hover:bg-hover-green transition-colors"
                  >
                    {playing ? (
                      <Pause className="w-5 h-5" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div
                      className="h-2 rounded-full cursor-pointer relative bg-sage-green/20"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-full rounded-full relative bg-sage-green"
                        style={{ width: `${progress}%` }}
                      >
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-sage-green w-3 h-3 shadow" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between font-quicksand text-xs text-soft-brown">
                  <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}</span>
                  <span>0:10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More songs */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-10">
            <span className="font-quicksand text-sm font-semibold uppercase tracking-[0.05em] text-sage-green block mb-2">
              🎶 MORE SONGS
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-medium text-dark-brown mb-3">
              Song Collection
            </h2>
            <div
              className="w-[60px] h-[3px] mx-auto rounded-full"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>

          <div className="space-y-4">
            {songs.map((song) => (
              <div
                key={song.title}
                className="flex items-center gap-4 bg-cream rounded-2xl p-3 sm:p-4 hover:shadow-soft transition-shadow"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-fredoka text-base sm:text-lg text-dark-brown truncate">
                    {song.title}
                  </h4>
                  <p className="font-quicksand text-sm text-soft-brown">{song.subtitle}</p>
                </div>
                <span className="font-quicksand text-xs text-soft-brown/70 flex-shrink-0">
                  {song.duration}
                </span>
                <button className="flex-shrink-0 w-10 h-10 rounded-full bg-sage-green/10 text-sage-green hover:bg-sage-green hover:text-white transition-colors flex items-center justify-center">
                  <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lyrics */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-cream">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <span className="font-quicksand text-sm font-semibold uppercase tracking-[0.05em] text-sage-green block mb-2">
              🎤 SING ALONG
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-medium text-dark-brown mb-3">
              Ba Ba Ab Lyrics
            </h2>
            <div
              className="w-[60px] h-[3px] mx-auto rounded-full"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>

          <div className="bg-warm-white rounded-card shadow-soft p-6 sm:p-10 text-center">
            <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl text-sage-green mb-6">
              <Music2 className="w-6 h-6" />
              <span>🎶</span>
              <span>♪</span>
              <span>♫</span>
            </div>
            <div className="space-y-3 mb-6">
              {lyrics.map((line, i) => (
                <p
                  key={i}
                  className={`font-quicksand text-lg sm:text-xl ${
                    i % 2 === 0 ? "text-dark-brown font-semibold" : "text-soft-brown"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
            <p className="font-caveat text-xl text-warm-terracotta">
              "Ba Ba Ab" is a loving lullaby Daddy made just for you. ❤️
            </p>
          </div>
        </div>
      </section>

      {/* Sleep tight */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-sage-green">
        <div className="max-w-[700px] mx-auto text-center">
          <span className="text-5xl sm:text-6xl mb-4 block">🌙</span>
          <h2 className="font-fredoka text-2xl sm:text-3xl text-white mb-3">Sleep Tight, Little One</h2>
          <p className="font-quicksand text-base sm:text-lg text-white/80 mb-6">
            May your dreams be filled with bears, chickens, and all the love in the world.
          </p>
          <p className="text-2xl sm:text-3xl mb-6">🐻🐔🦃❤️</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 font-fredoka text-base px-6 py-3 rounded-button transition-all duration-200 hover:scale-105 bg-white text-sage-green"
            >
              <BookOpen className="w-5 h-5" />
              📖 Read a Story
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-fredoka text-base px-6 py-3 rounded-button transition-all duration-200 hover:scale-105 bg-white/10 text-white hover:bg-white/20"
            >
              <Home className="w-5 h-5" />
              🏡 Back to Ranch
            </Link>
          </div>
          <p className="font-caveat text-xl text-white/90 mt-6">Love, Daddy</p>
        </div>
      </section>
    </div>
  );
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
