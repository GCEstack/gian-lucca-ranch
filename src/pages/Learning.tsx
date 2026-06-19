import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Music, Home, Play } from "lucide-react";

function generatePositions(count: number) {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  }));
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const numbers = [
  { n: 1, emojis: ["🐻"] },
  { n: 2, emojis: ["🐻", "🐔"] },
  { n: 3, emojis: ["🐻", "🐔", "🦃"] },
  { n: 4, emojis: ["🐻", "🐔", "🦃", "🐄"] },
  { n: 5, emojis: ["🐻", "🐔", "🦃", "🐄", "🐑"] },
  { n: 6, emojis: ["🐻", "🐔", "🦃", "🐄", "🐑", "🐴"] },
  { n: 7, emojis: ["🐻", "🐔", "🦃", "🐄", "🐑", "🐴", "🐷"] },
  { n: 8, emojis: ["🐻", "🐔", "🦃", "🐄", "🐑", "🐴", "🐷", "🐶"] },
  { n: 9, emojis: ["🐻", "🐔", "🦃", "🐄", "🐑", "🐴", "🐷", "🐶", "🐱"] },
  { n: 10, emojis: ["🐻", "🐔", "🦃", "🐄", "🐑", "🐴", "🐷", "🐶", "🐱", "🦆"] },
];

const colors = [
  { name: "Barn Red", class: "bg-red-500", hex: "#ef4444" },
  { name: "Carrot Orange", class: "bg-orange-500", hex: "#f97316" },
  { name: "Sunshine Yellow", class: "bg-yellow-400", hex: "#facc15" },
  { name: "Grass Green", class: "bg-green-500", hex: "#22c55e" },
  { name: "Sky Blue", class: "bg-sky-400", hex: "#38bdf8" },
  { name: "Flower Purple", class: "bg-purple-500", hex: "#a855f7" },
  { name: "Piggy Pink", class: "bg-pink-400", hex: "#f472b6" },
  { name: "Bear Brown", class: "bg-amber-700", hex: "#b45309" },
];

const shapes = [
  { emoji: "⭕", name: "Circle", match: "☀️ Sun" },
  { emoji: "🟦", name: "Square", match: "🚪 Barn Door" },
  { emoji: "🔺", name: "Triangle", match: "🏠 Roof" },
  { emoji: "⭐", name: "Star", match: "✨ Sparkle" },
  { emoji: "❤️", name: "Heart", match: "💕 Love" },
  { emoji: "🔷", name: "Diamond", match: "🪁 Kite" },
];

export default function Learning() {
  const dotPositions = useMemo(() => generatePositions(15), []);
  const [learnedLetters, setLearnedLetters] = useState<string[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [mixedColor, setMixedColor] = useState<string | null>(null);
  const [matchedShapes, setMatchedShapes] = useState<string[]>([]);
  const [activeShape, setActiveShape] = useState<string | null>(null);

  const toggleLetter = (letter: string) => {
    setLearnedLetters((prev) =>
      prev.includes(letter) ? prev.filter((l) => l !== letter) : [...prev, letter]
    );
  };

  const handleShapeClick = (name: string) => {
    if (activeShape === name) {
      setMatchedShapes((prev) => (prev.includes(name) ? prev : [...prev, name]));
      setActiveShape(null);
    } else {
      setActiveShape(name);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-16"
        style={{
          background: "linear-gradient(180deg, #e8f2f6 0%, #fbf7f0 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {dotPositions.map((pos, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-sage-green/20"
              style={{ left: pos.left, top: pos.top }}
            />
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-3xl opacity-20" style={{ left: "10%", top: "20%" }}>
            🎨
          </span>
          <span className="absolute text-3xl opacity-20" style={{ right: "15%", top: "25%" }}>
            ✏️
          </span>
          <span className="absolute text-3xl opacity-20" style={{ left: "18%", bottom: "20%" }}>
            📚
          </span>
          <span className="absolute text-3xl opacity-20" style={{ right: "12%", bottom: "22%" }}>
            ⭐
          </span>
        </div>

        <h1 className="font-fredoka text-4xl sm:text-5xl md:text-[56px] font-semibold text-dark-brown text-center mb-4 relative z-10">
          🎨 Learning Ranch
        </h1>
        <p className="font-quicksand text-lg sm:text-[22px] text-soft-brown text-center mb-6 relative z-10">
          Let's learn and play together!
        </p>
        <div className="relative z-10 px-6 py-3 rounded-button font-fredoka text-base text-dark-brown bg-white shadow-soft">
          You're so smart! ⭐
        </div>
      </section>

      {/* Alphabet */}
      <section className="bg-cream py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-quicksand text-sm font-semibold uppercase tracking-widest text-sage-green mb-2">
              🔤 ALPHABET
            </p>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-medium text-dark-brown mb-3">
              Learn Your ABCs
            </h2>
            <div
              className="w-[60px] h-[3px] bg-golden-honey mx-auto rounded-full"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-1 mb-2 flex-wrap justify-center">
              {alphabet.map((letter) => (
                <div
                  key={letter}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center text-[10px] sm:text-xs font-quicksand font-semibold transition-colors ${
                    learnedLetters.includes(letter)
                      ? "bg-sage-green text-white"
                      : "bg-sage-green/10 text-sage-green"
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="font-quicksand text-sm text-soft-brown text-center">
              You've learned {learnedLetters.length} of 26 letters!
            </p>
          </div>

          <div className="relative max-w-xs mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-brown/50" />
            <input
              type="text"
              placeholder="Find a letter..."
              className="w-full pl-10 pr-4 py-2.5 rounded-button border-2 border-sage-green/20 font-quicksand text-dark-brown focus:outline-none focus:border-sage-green bg-white"
              maxLength={1}
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                if (alphabet.includes(val)) toggleLetter(val);
              }}
            />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5 sm:gap-3">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => toggleLetter(letter)}
                className={`aspect-square rounded-xl border-2 flex items-center justify-center font-fredoka text-xl sm:text-2xl transition-all duration-200 ${
                  learnedLetters.includes(letter)
                    ? "bg-sage-green text-white border-sage-green scale-105"
                    : "bg-white text-dark-brown border-sage-green/20 hover:border-sage-green/50"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-light-sand py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-quicksand text-sm font-semibold uppercase tracking-widest text-sage-green mb-2">
              🔢 NUMBERS
            </p>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-medium text-dark-brown mb-3">
              Count With Me!
            </h2>
            <div
              className="w-[60px] h-[3px] mx-auto rounded-full"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {numbers.map((item) => (
              <button
                key={item.n}
                onClick={() => setSelectedNumber(item.n)}
                className={`w-[72px] sm:w-20 h-[90px] sm:h-[100px] rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-200 ${
                  selectedNumber === item.n
                    ? "bg-sage-green text-white border-sage-green scale-105"
                    : "bg-white text-dark-brown border-sage-green/20 hover:border-sage-green/50"
                }`}
              >
                <span className="font-fredoka text-2xl sm:text-[28px] font-semibold">{item.n}</span>
                <span className="text-sm tracking-tight">{item.emojis.join("")}</span>
              </button>
            ))}
          </div>

          {selectedNumber !== null && (
            <div className="bg-white rounded-card shadow-soft p-6 max-w-md mx-auto text-center">
              <p className="font-fredoka text-2xl text-dark-brown mb-2">{selectedNumber}</p>
              <p className="text-3xl mb-2">
                {numbers.find((n) => n.n === selectedNumber)?.emojis.join(" ")}
              </p>
              <p className="font-quicksand text-soft-brown">Count with me!</p>
            </div>
          )}
        </div>
      </section>

      {/* Colors */}
      <section className="bg-cream py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-quicksand text-sm font-semibold uppercase tracking-widest text-sage-green mb-2">
              🌈 COLORS
            </p>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-medium text-dark-brown mb-3">
              Color Garden
            </h2>
            <div
              className="w-[60px] h-[3px] mx-auto rounded-full"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setMixedColor(color.hex)}
                className="bg-white rounded-card shadow-soft p-4 text-center transition-transform hover:scale-105"
              >
                <div
                  className={`w-12 h-12 rounded-full mx-auto mb-2 ${color.class}`}
                  style={{ backgroundColor: color.hex }}
                />
                <p className="font-fredoka text-sm text-dark-brown">{color.name}</p>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-card shadow-soft p-6 max-w-md mx-auto text-center">
            <p className="font-fredoka text-lg text-dark-brown mb-3">🧪 Mix Colors!</p>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full border-2 border-dashed border-sage-green/30"
                style={{ backgroundColor: mixedColor || "transparent" }}
              />
              <span className="text-xl">+</span>
              <button
                onClick={() => setMixedColor(null)}
                className="px-4 py-2 rounded-button bg-sage-green text-white font-fredoka text-sm"
              >
                Mix!
              </button>
            </div>
            <p className="font-quicksand text-sm text-soft-brown">
              {mixedColor ? "What a beautiful color!" : "Pick a color to mix."}
            </p>
          </div>
        </div>
      </section>

      {/* Shapes */}
      <section className="bg-light-sand py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-quicksand text-sm font-semibold uppercase tracking-widest text-sage-green mb-2">
              ⭐ SHAPES
            </p>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-medium text-dark-brown mb-3">
              Shape Ranch
            </h2>
            <div
              className="w-[60px] h-[3px] mx-auto rounded-full"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>

          <p className="font-quicksand text-sm text-soft-brown text-center mb-6">
            {matchedShapes.length} of {shapes.length} matched
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {shapes.map((shape) => (
              <button
                key={shape.name}
                onClick={() => handleShapeClick(shape.name)}
                className={`bg-white rounded-card shadow-soft p-4 text-center transition-all duration-200 ${
                  matchedShapes.includes(shape.name)
                    ? "ring-2 ring-sage-green scale-105"
                    : activeShape === shape.name
                    ? "ring-2 ring-golden-honey"
                    : "hover:shadow-hover"
                }`}
              >
                <span className="text-4xl block mb-2">{shape.emoji}</span>
                <p className="font-fredoka text-lg text-dark-brown">{shape.name}</p>
                {matchedShapes.includes(shape.name) && (
                  <p className="font-quicksand text-xs text-sage-green mt-1">{shape.match} ✅</p>
                )}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-card shadow-soft p-6 max-w-md mx-auto text-center">
            <p className="font-quicksand text-sm text-soft-brown">
              {activeShape
                ? `Tap ${activeShape} again to match it with something on the ranch!`
                : "Tap a shape, then tap it again to make a match."}
            </p>
          </div>
        </div>
      </section>

      {/* Super learner */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-sage-green">
        <div className="max-w-[800px] mx-auto text-center">
          <span className="text-5xl sm:text-6xl mb-4 block">🏆</span>
          <h2 className="font-fredoka text-3xl sm:text-4xl font-medium text-white mb-3">
            You're a Super Learner!
          </h2>
          <p className="font-quicksand text-lg text-white/80 mb-8">
            🎉 You've explored so much today! Daddy is so proud of you!
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            <div className="bg-white/10 rounded-card p-4 text-center">
              <p className="font-fredoka text-2xl text-white">🔤</p>
              <p className="font-quicksand text-sm text-white/80">26 Letters</p>
            </div>
            <div className="bg-white/10 rounded-card p-4 text-center">
              <p className="font-fredoka text-2xl text-white">🔢</p>
              <p className="font-quicksand text-sm text-white/80">10 Numbers</p>
            </div>
            <div className="bg-white/10 rounded-card p-4 text-center">
              <p className="font-fredoka text-2xl text-white">🌈</p>
              <p className="font-quicksand text-sm text-white/80">8 Colors</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/videos"
              className="inline-flex items-center gap-2 font-fredoka text-base px-6 py-3 rounded-button transition-all duration-200 hover:scale-105 bg-white text-sage-green"
            >
              <Play className="w-5 h-5" />
              Keep Learning!
            </Link>
            <Link
              to="/music"
              className="inline-flex items-center gap-2 font-fredoka text-base px-6 py-3 rounded-button transition-all duration-200 hover:scale-105 bg-white/10 text-white hover:bg-white/20"
            >
              <Music className="w-5 h-5" />
              Take a Break
            </Link>
          </div>
        </div>
      </section>

      {/* Back to ranch */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-fredoka text-base px-7 py-3.5 rounded-button transition-all duration-200 hover:scale-105 bg-sage-green text-white hover:bg-hover-green"
          >
            <Home className="w-5 h-5" />
            Back to Ranch
          </Link>
        </div>
      </section>
    </div>
  );
}
