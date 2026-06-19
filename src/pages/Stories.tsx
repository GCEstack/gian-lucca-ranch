import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Music, Home, ChevronLeft, ChevronRight } from "lucide-react";

function generateStarPositions(count: number) {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  }));
}

const storybooks = [
  {
    title: "The Sleepy Little Bear",
    desc: "A little bear named Benny learns about bedtime on the ranch. A gentle, loving story.",
    image: "/sleepy-bear-story.png",
    time: "10 min",
    tag: "🌙 Bedtime",
    featured: true,
  },
  {
    title: "Benny's Big Adventure",
    desc: "Benny explores the ranch and makes new friends! What will he discover?",
    image: "/bear-friend.png",
    time: "8 min",
    tag: "🐻 Adventure",
    featured: false,
  },
  {
    title: "The Chicken Who Dreamed of Flying",
    desc: "A little chicken has big dreams! A story about believing in yourself.",
    image: "/chickens-friends.png",
    time: "6 min",
    tag: "🌟 Dreams",
    featured: false,
  },
];

const pages = [
  {
    text: "Once upon a time, in a cozy little corner of Gian Lucca's Ranch, there lived a small bear named Benny.",
    emoji: "🐻",
  },
  {
    text: "Benny had played all day — climbing trees, splashing in the creek, and chasing butterflies with his chicken friends.",
    emoji: "🌳",
  },
  {
    text: "As the sun began to set and paint the sky in soft orange and pink, Benny's eyelids felt heavy, but his mind was still dancing with adventures.",
    emoji: "🌅",
  },
  {
    text: "He tried counting sheep, then turkeys, then stars, but nothing seemed to help the little bear fall asleep.",
    emoji: "⭐",
  },
  {
    text: "So Benny tiptoed outside and asked the wise old owl for advice. The owl smiled and whispered, 'Think of all the friends who love you.'",
    emoji: "🦉",
  },
  {
    text: "Benny closed his eyes and thought of the chickens clucking softly in their coop, Tommy Turkey fluffing his colorful feathers, and the warm ranch house waiting with open arms.",
    emoji: "🏡",
  },
  {
    text: "A gentle breeze hummed a lullaby through the trees, and Benny felt safe, cozy, and very, very sleepy.",
    emoji: "🍃",
  },
  {
    text: "With one last yawn and a happy smile, Benny drifted into the sweetest dreams — because love is the best blanket of all. The end.",
    emoji: "🌙",
  },
];

export default function Stories() {
  const starPositions = useMemo(() => generateStarPositions(20), []);
  const [page, setPage] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [dream, setDream] = useState("");

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-16"
        style={{
          background: "linear-gradient(180deg, #8b9a7c 0%, #a8b89a 100%)",
        }}
      >
        <span className="absolute text-5xl sm:text-6xl text-white/20 left-[15%] top-[20%]">🌙</span>
        <span className="absolute text-6xl text-white/15 right-[12%] top-[25%]">☁️</span>
        <span className="absolute text-5xl text-white/15 left-[20%] bottom-[22%]">☁️</span>

        <h1 className="font-fredoka text-4xl sm:text-5xl md:text-[56px] font-semibold text-white text-center mb-4 relative z-10">
          📖 Story Time
        </h1>
        <p className="font-quicksand text-base sm:text-xl text-white/90 text-center mb-6 relative z-10">
          Cozy stories before bedtime
        </p>
        <div className="relative z-10 px-5 py-2.5 rounded-button font-fredoka text-base text-dark-brown bg-white shadow-soft">
          🌙 Perfect for bedtime
        </div>
      </section>

      {/* Storybooks */}
      <section className="bg-cream py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-quicksand text-sm font-semibold uppercase tracking-widest text-sage-green mb-2">
              📚 CHOOSE A STORY
            </p>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-medium text-dark-brown mb-3">
              Your Storybooks
            </h2>
            <div
              className="w-[60px] h-[3px] mx-auto rounded-full"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {storybooks.map((book) => (
              <div key={book.title} className="group relative bg-warm-white rounded-card shadow-soft overflow-hidden hover:shadow-hover transition-shadow">
                <div className="relative h-[200px] sm:h-[220px] overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {book.featured && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-golden-honey text-dark-brown font-quicksand text-xs font-semibold">
                      Featured
                    </div>
                  )}
                  {!book.featured && (
                    <div className="absolute inset-0 bg-dark-brown/50 flex items-center justify-center">
                      <div className="px-4 py-2 rounded-button font-fredoka text-sm text-white bg-white/20 backdrop-blur-sm">
                        Coming soon! 🌟
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-fredoka text-lg sm:text-xl text-dark-brown mb-1">{book.title}</h3>
                  <p className="font-quicksand text-sm text-soft-brown leading-relaxed mb-2">{book.desc}</p>
                  <p className="font-quicksand text-xs text-soft-brown/70 mb-3">
                    ⏱️ {book.time} · {book.tag}
                  </p>
                  {book.featured ? (
                    <button
                      onClick={() => setPage(0)}
                      className="flex items-center gap-1 font-quicksand text-sm font-semibold text-sage-green hover:text-hover-green transition-colors"
                    >
                      Read Story <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="font-quicksand text-sm text-soft-brown/50">Coming soon...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story reader */}
      <section className="bg-dark-brown py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <span className="font-quicksand text-sm text-white/60">The Sleepy Little Bear</span>
            <span className="font-quicksand text-sm text-white/60">
              Page {page + 1} of {pages.length}
            </span>
          </div>

          <div className="bg-warm-white/95 rounded-card p-6 sm:p-10">
            <div className="flex flex-col items-center text-center">
              {page === 0 ? (
                <>
                  <img
                    src="/sleepy-bear-story.png"
                    alt="The Sleepy Little Bear"
                    className="w-48 h-32 sm:w-64 sm:h-44 object-cover rounded-xl mb-5 shadow-soft"
                  />
                  <h3 className="font-fredoka text-2xl sm:text-3xl text-dark-brown mb-2">
                    The Sleepy Little Bear
                  </h3>
                  <p className="font-quicksand text-base text-soft-brown mb-1">A Bedtime Story</p>
                  <p className="font-caveat text-lg text-warm-terracotta">
                    Written with love for Gian Lucca
                  </p>
                </>
              ) : (
                <>
                  <span className="text-5xl sm:text-6xl mb-4">{pages[page].emoji}</span>
                  <p className="font-quicksand text-lg sm:text-xl text-dark-brown leading-relaxed max-w-[600px]">
                    {pages[page].text}
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex items-center gap-1 px-4 py-2 rounded-button font-fredoka text-sm bg-sage-green text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-hover-green transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
                disabled={page === pages.length - 1}
                className="flex items-center gap-1 px-4 py-2 rounded-button font-fredoka text-sm bg-sage-green text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-hover-green transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Activity time */}
      <section className="bg-cream py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-quicksand text-sm font-semibold uppercase tracking-widest text-sage-green mb-2">
              🎨 ACTIVITY TIME
            </p>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-medium text-dark-brown mb-3">
              What Did You Learn?
            </h2>
            <div
              className="w-[60px] h-[3px] mx-auto rounded-full"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-8">
            <div className="bg-warm-white rounded-card shadow-soft p-5">
              <span className="text-4xl inline-block mb-3">🎨</span>
              <h3 className="font-fredoka text-lg sm:text-xl text-dark-brown mb-2">
                Draw Your Favorite Part
              </h3>
              <p className="font-quicksand text-sm sm:text-base text-soft-brown mb-3">
                What was your favorite part of the story? Close your eyes and draw it on a piece of
                paper!
              </p>
              <div className="flex items-center gap-2 text-2xl sm:text-3xl">
                <span>🐻</span>
                <span>🌙</span>
                <span>⭐</span>
                <span>🌸</span>
                <span>🦃</span>
              </div>
            </div>

            <div className="bg-warm-white rounded-card shadow-soft p-5">
              <span className="text-4xl inline-block mb-3">🗣️</span>
              <h3 className="font-fredoka text-lg sm:text-xl text-dark-brown mb-2">
                Tell Someone the Story
              </h3>
              <p className="font-quicksand text-sm sm:text-base text-soft-brown mb-3">
                Can you tell Mommy or Daddy what happened to Benny? Try remembering the story in
                your own words!
              </p>
              <div className="flex items-center gap-2 text-2xl sm:text-3xl">
                <span>👨‍👩‍👦</span>
                <span>❤️</span>
                <span>🐻</span>
              </div>
            </div>
          </div>

          <div className="bg-warm-white rounded-card shadow-soft p-5 sm:p-6 mb-8">
            <h3 className="font-fredoka text-lg sm:text-xl text-dark-brown mb-2">
              What did Benny do before bed?
            </h3>
            <p className="font-quicksand text-sm text-soft-brown mb-4">
              All of these are right! Pick any one! 🌟
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { emoji: "🏃", label: "Played all day" },
                { emoji: "🐔", label: "Thought of friends" },
                { emoji: "😴", label: "Fell asleep" },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setAnswer(opt.label)}
                  className={`flex flex-col items-center gap-2 px-5 py-3 rounded-2xl border-2 transition-all duration-200 ${
                    answer === opt.label
                      ? "bg-sage-green text-white border-sage-green"
                      : "bg-white text-soft-brown border-sage-green/20 hover:border-sage-green/50"
                  }`}
                >
                  <span className="text-3xl">{opt.emoji}</span>
                  <span className="font-quicksand text-sm">{opt.label}</span>
                </button>
              ))}
            </div>
            {answer && (
              <p className="text-center font-quicksand text-sage-green font-semibold mt-4">
                Great answer! 🌟
              </p>
            )}
          </div>

          <div className="bg-light-sand rounded-card p-6 sm:p-8 text-center">
            <h3 className="font-fredoka text-lg sm:text-xl text-dark-brown mb-3">
              Your turn! What do you dream about?
            </h3>
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                placeholder="I dream about..."
                className="w-full px-5 py-3 rounded-button border-2 border-sage-green/20 font-quicksand text-dark-brown focus:outline-none focus:border-sage-green bg-white"
              />
            </div>
            {dream && (
              <p className="font-caveat text-xl text-warm-terracotta mt-3">
                What a wonderful dream, Gian Lucca! 🌙
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Bedtime CTA */}
      <section
        className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden"
        style={{ backgroundColor: "var(--color-dark-brown)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {starPositions.map((pos, i) => (
            <span
              key={i}
              className="absolute text-lg text-white/20"
              style={{ left: pos.left, top: pos.top }}
            >
              ⭐
            </span>
          ))}
        </div>
        <div className="max-w-[600px] mx-auto text-center relative z-10">
          <span className="text-5xl sm:text-6xl inline-block mb-4">🌙</span>
          <h2 className="font-fredoka text-2xl sm:text-3xl text-white mb-3">Time for Bed?</h2>
          <p className="font-caveat text-xl sm:text-2xl text-white/80 mb-6">
            Sweet dreams, Gian Lucca. Daddy loves you to the moon and back. 🌙❤️
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/music"
              className="inline-flex items-center gap-2 font-fredoka text-base px-6 py-3 rounded-button transition-all duration-200 hover:scale-105 bg-sage-green text-white hover:bg-hover-green"
            >
              <Music className="w-5 h-5" />
              🎵 Listen to Ba Ba Ab
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-fredoka text-base px-6 py-3 rounded-button transition-all duration-200 hover:scale-105 bg-white text-dark-brown"
            >
              <Home className="w-5 h-5" />
              🏠 Back to Ranch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
