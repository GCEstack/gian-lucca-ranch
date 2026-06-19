import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Volume2, Heart, Home } from "lucide-react";

function generateBubbleStyles(count: number) {
  return Array.from({ length: count }, () => ({
    width: `${Math.random() * 10 + 4}px`,
    height: `${Math.random() * 10 + 4}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  }));
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const allVideos = [
  {
    id: "sleepy-little-bear",
    title: "The Sleepy Little Bear",
    emoji: "🐻",
    description:
      "A heartwarming bedtime story about a little bear who can't fall asleep. Join him on a gentle journey through the forest as he discovers the secrets of a peaceful night's rest. Perfect for bedtime!",
    image: "/sleepy-bear-story.png",
    poster: "/sleepy-bear-story.png",
    src: "/videos/sleepy_little_bear.mp4",
    tag: "Bedtime",
    durationSeconds: 206,
    tags: ["Bedtime 🌙", "Bears 🐻", "3:26 ⏱️"],
    soon: false,
  },
  {
    id: "rainy-day-parade",
    title: "The Rainy Day Parade",
    emoji: "🌧️",
    description:
      "When rain ruins the picnic, friends turn it into the best adventure ever! A story about finding joy when plans change.",
    image: "/story-rainy-day-parade.png",
    poster: "/story-rainy-day-parade.png",
    src: "/videos/story_rainy_day_parade.mp4",
    tag: "Adventure",
    durationSeconds: 272,
    tags: ["Adventure 🌧️", "Friends 🐻🐔🦃", "4:32 ⏱️"],
    soon: false,
  },
  {
    id: "great-honey-harvest",
    title: "The Great Honey Harvest",
    emoji: "🍯",
    description:
      "The most special day of the year — collecting golden honey with friends! A story about teamwork, gratitude, and sweet rewards.",
    image: "/story-great-honey-harvest.png",
    poster: "/story-great-honey-harvest.png",
    src: "/videos/story_great_honey_harvest.mp4",
    tag: "Celebration",
    durationSeconds: 225,
    tags: ["Celebration 🍯", "Teamwork 🤝", "3:45 ⏱️"],
    soon: true,
  },
  {
    id: "night-under-stars",
    title: "Benny's Night Under the Stars",
    emoji: "⭐",
    description:
      "Daddy takes Benny camping for the very first time. A magical night of stars, fireflies, and feeling safe.",
    image: "/story-night-under-stars.png",
    poster: "/story-night-under-stars.png",
    src: "/videos/story_night_under_stars.mp4",
    tag: "Bedtime",
    durationSeconds: 228,
    tags: ["Bedtime ⭐", "Camping 🏕️", "3:48 ⏱️"],
    soon: true,
  },
  {
    id: "benny-adventure",
    title: "Benny Bear's Adventure",
    emoji: "🐻",
    description:
      "Join Benny Bear on an exciting journey through the ranch! From morning discoveries to afternoon surprises, every day is an adventure.",
    image: "/bear-friend.png",
    poster: "/bear-friend.png",
    src: "/videos/story_benny_adventure.mp4",
    tag: "Adventure",
    durationSeconds: 67,
    tags: ["Adventure 🐻", "Ranch 🌾", "1:07 ⏱️"],
    soon: false,
  },
  {
    id: "chicken-dance",
    title: "Chicken Dance Party",
    emoji: "🐔",
    description:
      "Get ready to dance with the chickens in this fun-filled video! Clucky and the crew throw the best dance party on the ranch.",
    image: "/chickens-friends.png",
    poster: "/chickens-friends.png",
    src: "/videos/story_chicken_dance.mp4",
    tag: "Fun",
    durationSeconds: 45,
    tags: ["Fun 🐔", "Dance 💃", "0:45 ⏱️"],
    soon: true,
  },
  {
    id: "tommy-turkey",
    title: "Tommy Turkey's Day",
    emoji: "🦃",
    description:
      "Spend a day with Tommy Turkey and learn about gratitude. A colorful story about appreciating the little things on the ranch.",
    image: "/turkey-friends.png",
    poster: "/turkey-friends.png",
    src: "/videos/story_tommy_turkey.mp4",
    tag: "Holiday",
    durationSeconds: 44,
    tags: ["Holiday 🦃", "Gratitude 💝", "0:44 ⏱️"],
    soon: true,
  },
  {
    id: "ranch-morning",
    title: "Ranch Morning Routine",
    emoji: "🌅",
    description:
      "See what mornings are like on Gian Lucca's Ranch! From sunrise to breakfast, the ranch wakes up with joy and wonder.",
    image: "/ranch-house.png",
    poster: "/ranch-house.png",
    src: "/videos/story_ranch_morning.mp4",
    tag: "Daily Life",
    durationSeconds: 44,
    tags: ["Daily Life 🌅", "Ranch 🌾", "0:44 ⏱️"],
    soon: true,
  },
  {
    id: "starlight-lullaby",
    title: "Starlight Lullaby",
    emoji: "🌙",
    description:
      "A soothing visual journey among the stars. The ranch friends drift off to sleep under a sky full of twinkling dreams.",
    image: "/sleepy-bear-story.png",
    poster: "/sleepy-bear-story.png",
    src: "/videos/story_starlight_lullaby.mp4",
    tag: "Bedtime",
    durationSeconds: 50,
    tags: ["Bedtime 🌙", "Stars ⭐", "0:50 ⏱️"],
    soon: true,
  },
];

export default function Videos() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playableVideos = useMemo(() => allVideos.filter((v) => !v.soon), []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [liked, setLiked] = useState(false);
  const bubbleStyles = useMemo(() => generateBubbleStyles(20), []);

  const featured = playableVideos[selectedIndex] || playableVideos[0];

  const selectVideo = (index: number) => {
    setSelectedIndex(index);
    setPlaying(true);
    setProgress(0);
    setCurrentTime(0);
    setLiked(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  };

  const isPlayableSelected = (videoId: string) => {
    return playableVideos[selectedIndex]?.id === videoId;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Auto-play when the featured video changes and playing is requested
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !playing) return;
    const playPromise = v.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay blocked by browser; show play overlay
        setPlaying(false);
      });
    }
  }, [featured.src, playing]);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-24 sm:py-32"
        style={{
          background: "linear-gradient(180deg, #c5e0ec 0%, #e8f2f6 50%, #fbf7f0 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {bubbleStyles.map((style, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white/30"
              style={style}
            />
          ))}
        </div>
        <span className="absolute text-5xl sm:text-6xl left-[10%] top-[20%] opacity-20 pointer-events-none">
          🎬
        </span>
        <span className="absolute text-5xl sm:text-6xl right-[12%] top-[18%] opacity-20 pointer-events-none">
          🎥
        </span>
        <span className="absolute text-4xl sm:text-5xl left-[15%] bottom-[20%] opacity-20 pointer-events-none">
          🎞️
        </span>

        <h1 className="font-fredoka text-4xl sm:text-5xl lg:text-[56px] font-semibold leading-tight mb-4 text-dark-brown text-center relative z-10">
          🎬 Story Time Videos
        </h1>
        <p className="font-quicksand text-base sm:text-xl max-w-[500px] text-center text-soft-brown relative z-10">
          Curl up and watch wonderful stories unfold
        </p>
      </section>

      {/* Featured video */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-cream">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-10">
            <span className="font-quicksand text-sm font-semibold uppercase tracking-[0.05em] text-sage-green block mb-2">
              ⭐ FEATURED STORY
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-medium mb-3 text-dark-brown">
              {featured.emoji} {featured.title}
            </h2>
            <div
              className="w-[60px] h-[3px] mx-auto rounded-full"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>

          <div className="mx-auto">
            <div className="relative w-full rounded-[20px] overflow-hidden bg-dark-brown aspect-video">
              <video
                ref={videoRef}
                key={featured.src}
                src={featured.src}
                poster={featured.poster}
                className="absolute inset-0 w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setPlaying(false)}
                onClick={togglePlay}
                playsInline
              />

              {!playing && (
                <button
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10"
                  onClick={togglePlay}
                  aria-label="Play video"
                >
                  <span className="flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors w-16 h-16 sm:w-20 sm:h-20 shadow-elevated">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 text-dark-brown ml-1" fill="currentColor" />
                  </span>
                </button>
              )}

              <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3 bg-gradient-to-t from-black/60 to-transparent">
                <button
                  onClick={togglePlay}
                  className="flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors w-8 h-8"
                >
                  {playing ? (
                    <Pause className="w-4 h-4 text-white" fill="currentColor" />
                  ) : (
                    <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                  )}
                </button>
                <span className="font-quicksand text-xs text-white flex-shrink-0 hidden sm:inline">
                  {formatTime(currentTime)}
                </span>
                <div
                  className="flex-1 h-1.5 rounded-full cursor-pointer relative bg-white/30"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full rounded-full relative bg-white"
                    style={{ width: `${progress}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white w-2.5 h-2.5 shadow" />
                  </div>
                </div>
                <span className="font-quicksand text-xs text-white flex-shrink-0 hidden sm:inline">
                  {formatDuration(featured.durationSeconds)}
                </span>
                <button className="flex items-center justify-center cursor-pointer flex-shrink-0 text-white hover:text-golden-honey">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="max-w-[900px] mx-auto mt-6 sm:mt-8">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-fredoka text-xl sm:text-[28px] font-medium flex-1 text-dark-brown">
                  {featured.emoji} {featured.title}
                </h3>
                <button
                  onClick={() => setLiked(!liked)}
                  className="flex items-center justify-center rounded-full cursor-pointer w-11 h-11 hover:bg-sage-green/10 transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      liked ? "fill-red-400 text-red-400" : "text-soft-brown"
                    }`}
                  />
                </button>
              </div>
              <p className="font-quicksand text-base sm:text-lg max-w-[700px] mb-4 text-soft-brown">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full font-quicksand text-sm font-medium bg-sage-green/10 text-sage-green"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More stories */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <span className="font-quicksand text-sm font-semibold uppercase tracking-[0.05em] text-sage-green block mb-2">
              📚 MORE STORIES
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-medium mb-3 text-dark-brown">
              Story Time Collection
            </h2>
            <div
              className="w-[60px] h-[3px] mx-auto rounded-full"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {allVideos.map((video) => {
              if (video.soon) {
                return (
                  <div key={video.id} className="group">
                    <div className="bg-white rounded-[20px] overflow-hidden h-full shadow-soft transition-shadow duration-200">
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                          src={video.image}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-80 transition-opacity">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full font-quicksand text-xs font-semibold bg-white/90 text-dark-brown">
                            Coming Soon! ⭐
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-fredoka text-lg mb-1 line-clamp-2 text-dark-brown">
                          {video.emoji} {video.title}
                        </h4>
                        <p className="font-quicksand text-sm mb-2 text-soft-brown">{video.description}</p>
                        <span className="font-quicksand text-sm text-soft-brown/50">Coming soon...</span>
                      </div>
                    </div>
                  </div>
                );
              }

              const playableIndex = playableVideos.findIndex((v) => v.id === video.id);
              return (
                <button
                  key={video.id}
                  onClick={() => selectVideo(playableIndex)}
                  className={`group text-left ${
                    isPlayableSelected(video.id) ? "ring-2 ring-sage-green rounded-[20px]" : ""
                  }`}
                >
                  <div className="bg-white rounded-[20px] overflow-hidden h-full shadow-soft hover:shadow-hover transition-shadow duration-200">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={video.image}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-80 group-hover:opacity-100 transition-opacity">
                        <span className="flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white transition-colors w-12 h-12">
                          <Play className="w-5 h-5 text-dark-brown ml-0.5" fill="currentColor" />
                        </span>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md font-quicksand text-xs text-white bg-black/50">
                        {formatDuration(video.durationSeconds)}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-fredoka text-lg mb-1 line-clamp-2 text-dark-brown">
                        {video.title}
                      </h4>
                      <p className="font-quicksand text-sm mb-2 text-soft-brown">{video.description}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full font-quicksand text-xs font-medium bg-sage-green/10 text-sage-green">
                        {video.tag}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recording status */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-cream">
        <div className="max-w-[800px] mx-auto">
          <div
            className="text-center px-6 sm:px-10 py-8 sm:py-10 rounded-[20px]"
            style={{ backgroundColor: "var(--color-light-sand)" }}
          >
            <span className="block text-5xl sm:text-[56px] mb-4">🎬</span>
            <h3 className="font-fredoka text-xl sm:text-[28px] mb-3 text-dark-brown">
              More Stories Coming Soon!
            </h3>
            <p className="font-quicksand text-base sm:text-lg max-w-[500px] mx-auto text-soft-brown">
              {playableVideos.length} stories ready with Daddy's voice. More voice recordings coming soon!
            </p>
          </div>
        </div>
      </section>

      {/* Back to ranch */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-3xl sm:text-4xl mb-4">
            <span>🐻</span>
            <span>🐔</span>
            <span>🦃</span>
          </div>
          <p className="font-fredoka text-xl text-dark-brown mb-6">Ready for more adventures?</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-fredoka text-base px-7 py-3.5 rounded-button transition-all duration-200 hover:scale-105 bg-sage-green text-white hover:bg-hover-green"
          >
            <Home className="w-5 h-5" />
            Back to the Ranch
          </Link>
        </div>
      </section>
    </div>
  );
}
