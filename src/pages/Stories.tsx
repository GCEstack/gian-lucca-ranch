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
    id: "sleepy-bear",
    title: "The Sleepy Little Bear",
    desc: "A little bear named Benny learns about bedtime on the ranch. A gentle, loving story.",
    image: "/sleepy-bear-story.png",
    time: "3 min",
    tag: "🌙 Bedtime",
    featured: true,
  },
  {
    id: "rainy-day",
    title: "The Rainy Day Parade",
    desc: "When rain ruins Benny's picnic, his friends show him that rainy days can be the most fun of all!",
    image: "/story-rainy-day-parade.png",
    time: "3 min",
    tag: "🌧️ Adventure",
    featured: true,
  },
  {
    id: "honey-harvest",
    title: "The Great Honey Harvest",
    desc: "It's the most special day of the year! Benny and friends work together to collect golden honey.",
    image: "/story-great-honey-harvest.png",
    time: "3 min",
    tag: "🍯 Celebration",
    featured: true,
  },
  {
    id: "night-stars",
    title: "Benny's Night Under the Stars",
    desc: "Daddy takes Benny camping for the very first time. A story about wonder, fireflies, and feeling safe.",
    image: "/story-night-under-stars.png",
    time: "3 min",
    tag: "⭐ Bedtime",
    featured: true,
  },
  {
    id: "benny-adventure",
    title: "Benny's Big Adventure",
    desc: "Benny explores the ranch and makes new friends! What will he discover?",
    image: "/bear-friend.png",
    time: "3 min",
    tag: "🐻 Adventure",
    featured: true,
  },
  {
    id: "chicken-dreams",
    title: "The Chicken Who Dreamed of Flying",
    desc: "A little chicken has big dreams! A story about believing in yourself.",
    image: "/chickens-friends.png",
    time: "3 min",
    tag: "🌟 Dreams",
    featured: true,
  },
];

const storyPages: Record<string, { text: string; emoji: string }[]> = {
  "sleepy-bear": [
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
  ],
  "rainy-day": [
    {
      text: "Plip, plop, plip, plop. Rain was falling on the roof of the old oak tree! Benny peeked out his window and frowned. He had planned a big picnic, but the sun was hiding and the sky was gray.",
      emoji: "🌧️",
    },
    {
      text: "Just then, Clucky knocked at the door. She was wearing the silliest hat Benny had ever seen — an old flower pot turned upside down! 'Rain is just the sky giving the ranch a drink,' she said.",
      emoji: "🐔",
    },
    {
      text: "Tommy Turkey appeared, shaking water from his colorful feathers. 'A little rain never hurt anyone! Besides, I have an idea. Follow me!' he gobbled.",
      emoji: "🦃",
    },
    {
      text: "Inside the big red barn, they found umbrellas, scarves, and a big drum. Tommy Turkey spread his wings wide. 'We are having the very first... Rainy Day Parade!'",
      emoji: "🥁",
    },
    {
      text: "Clucky twirled a bright yellow umbrella. Tommy tapped the drum. Boom-boom, tap-tap! Benny wore a red raincoat much too big for him, and stomped in every puddle. Splash! Splash!",
      emoji: "☂️",
    },
    {
      text: "The friends marched outside through the meadow. The Chicken Crew held tiny leaf umbrellas. Tommy played his drum. Benny splashed in every puddle he could find!",
      emoji: "💦",
    },
    {
      text: "Then something wonderful happened — the rain began to slow down. The clouds opened up, and a beautiful rainbow appeared across the sky. Red, orange, yellow, green, blue, and purple!",
      emoji: "🌈",
    },
    {
      text: "'This was even better than a picnic,' Benny smiled. 'Sometimes the best adventures happen when our plans change.' And rainy days became his favorite days of all. The end.",
      emoji: "🐻",
    },
  ],
  "honey-harvest": [
    {
      text: "Autumn had arrived at Gian Lucca's Ranch! The air smelled like warm apples and golden leaves. It was the most special time of the year — the Great Honey Harvest!",
      emoji: "🍂",
    },
    {
      text: "Benny woke up before the rooster even crowed. He put on his favorite vest — the one with honey-colored buttons — and ran outside. This year, he was old enough to help!",
      emoji: "🐻",
    },
    {
      text: "The Chicken Crew was already pecking for berries. Clucky clucked, 'Good morning! Are you ready to be a honey helper?' Benny puffed out his little chest. 'I am ready!'",
      emoji: "🐔",
    },
    {
      text: "Tommy Turkey strutted over, his feathers extra shiny. 'I will be the official honey taster!' he announced proudly. Daddy Bear smiled. 'Everyone has a job. When we work together, we can do anything.'",
      emoji: "🦃",
    },
    {
      text: "At the wildflower meadow, the bees buzzed happily. Benny carried a bucket. The chickens carried berries. Tommy carried his big spoon. Together, they collected golden honey that sparkled like sunshine!",
      emoji: "🍯",
    },
    {
      text: "Daddy set up a long table under the old oak tree. There was fresh bread, bowls of berries, and pitchers of cold milk. In the center sat the big honey pot, glowing like a golden treasure.",
      emoji: "🍞",
    },
    {
      text: "'Before we eat, remember why this day is special,' Daddy said. 'It's not just the honey. It's that we did this together. When friends help friends, everything tastes sweeter.'",
      emoji: "❤️",
    },
    {
      text: "Benny felt something warm in his heart — warmer than honey, warmer than sunshine. It was love. He sat on the porch with a full tummy and whispered, 'This is the best day ever.' The end.",
      emoji: "🌟",
    },
  ],
  "night-stars": [
    {
      text: "Benny the Bear had never slept outside before. But tonight was special! Daddy had promised him a camping night under the stars — just the two of them, right in the middle of the meadow.",
      emoji: "⛺",
    },
    {
      text: "Benny packed his tiny backpack: a soft blanket, a honey snack, and his little flashlight. He was so excited that his paws were wiggling. 'Ready!' he shouted.",
      emoji: "🎒",
    },
    {
      text: "In the middle of the meadow, where the grass was soft as a pillow, Daddy set up the tent. Benny helped by handing over the pegs. One, two, three! The tent was up — a little house in the middle of nowhere!",
      emoji: "🔨",
    },
    {
      text: "Inside, Benny unrolled his sleeping bag. It was blue with little stars printed on it. 'Just like the sky,' Benny said. Daddy smiled. 'The sky is even better. Come see.'",
      emoji: "🛏️",
    },
    {
      text: "They laid on a big blanket and looked up. Benny's mouth made a perfect little 'O'. The sky was FULL of stars! Hundreds and thousands of them! The moon was big and round, like a silver coin.",
      emoji: "🌙",
    },
    {
      text: "'How many stars are there?' Benny whispered. Daddy chuckled. 'More than all the grains of sand in the creek. And every single one is a little light, just for you.'",
      emoji: "⭐",
    },
    {
      text: "Fireflies danced around like little lanterns. One landed on Benny's paw and glowed bright green. 'They are like tiny stars that came down to visit,' Benny said, wonder in his eyes.",
      emoji: "✨",
    },
    {
      text: "'You are my little star,' Daddy said. 'Bright, special, and one of a kind.' Benny snuggled closer, closed his eyes, and dreamed of dancing with fireflies in a sky made of honey and love. The end.",
      emoji: "💤",
    },
  ],
  "benny-adventure": [
    {
      text: "Benny the Bear woke up early one sunny morning on Gian Lucca's Ranch. Today was the day he would find the legendary Golden Honey Tree!",
      emoji: "🐻",
    },
    {
      text: "He packed a tiny backpack with berries and set off past the chicken coop, where the hens cheered him on with happy clucks!",
      emoji: "🐔",
    },
    {
      text: "Through the tall grass he went, over the babbling brook, and under the low branches of the whispering willows. The ranch was full of wonder!",
      emoji: "🌳",
    },
    {
      text: "Along the way, Tommy the Turkey taught him how to be brave, and the Chicken Crew showed him how to dance when he felt tired. Friends make everything easier!",
      emoji: "🦃",
    },
    {
      text: "At last, Benny reached the old tree, glowing in the afternoon light. But the real treasure wasn't the honey. It was the friends who helped him get there. The end.",
      emoji: "🍯",
    },
  ],
  "chicken-dreams": [
    {
      text: "In the cozy corner of Gian Lucca's Ranch, there lived a little chicken named Pip. Pip was not like the other chickens. Pip had a big, big dream.",
      emoji: "🐔",
    },
    {
      text: "Every night, Pip looked up at the birds flying high in the sky and wondered, 'What would it feel like to touch the clouds?'",
      emoji: "☁️",
    },
    {
      text: "The other chickens said, 'Chickens can't fly high, Pip. That's just the way things are.' But Pip didn't believe that. Not one bit.",
      emoji: "💭",
    },
    {
      text: "Pip practiced every day. Flap, flap, jump! Flap, flap, hop! Some days were hard. But Pip never gave up. Benny the Bear cheered, 'You can do it, Pip!'",
      emoji: "🏋️",
    },
    {
      text: "One breezy morning, Pip ran to the top of the haystack, closed her eyes, and flapped with all her might. The wind caught her feathers and... she flew! She soared over the meadow, higher than the fence, higher than the barn roof!",
      emoji: "🌟",
    },
    {
      text: "When Pip landed, all the friends cheered. Tommy Turkey gobbled with pride. Benny clapped his paws. And Pip learned that believing in yourself is the first step to touching the clouds. The end.",
      emoji: "🏆",
    },
  ],
};

export default function Stories() {
  const starPositions = useMemo(() => generateStarPositions(20), []);
  const [activeStory, setActiveStory] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [dream, setDream] = useState("");

  const currentBook = storybooks.find((b) => b.id === activeStory);
  const currentPages = activeStory ? storyPages[activeStory] || [] : [];

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
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-golden-honey text-dark-brown font-quicksand text-xs font-semibold">
                    {book.tag}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-fredoka text-lg sm:text-xl text-dark-brown mb-1">{book.title}</h3>
                  <p className="font-quicksand text-sm text-soft-brown leading-relaxed mb-2">{book.desc}</p>
                  <p className="font-quicksand text-xs text-soft-brown/70 mb-3">
                    ⏱️ {book.time} · {book.tag}
                  </p>
                  <button
                    onClick={() => {
                      setActiveStory(book.id);
                      setPage(0);
                    }}
                    className="flex items-center gap-1 font-quicksand text-sm font-semibold text-sage-green hover:text-hover-green transition-colors"
                  >
                    Read Story <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story reader */}
      {currentBook && currentPages.length > 0 && (
        <section className="bg-dark-brown py-10 sm:py-12 px-4 sm:px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <span className="font-quicksand text-sm text-white/60">{currentBook.title}</span>
              <span className="font-quicksand text-sm text-white/60">
                Page {page + 1} of {currentPages.length}
              </span>
            </div>

            <div className="bg-warm-white/95 rounded-card p-6 sm:p-10">
              <div className="flex flex-col items-center text-center">
                {page === 0 ? (
                  <>
                    <img
                      src={currentBook.image}
                      alt={currentBook.title}
                      className="w-48 h-32 sm:w-64 sm:h-44 object-cover rounded-xl mb-5 shadow-soft"
                    />
                    <h3 className="font-fredoka text-2xl sm:text-3xl text-dark-brown mb-2">
                      {currentBook.title}
                    </h3>
                    <p className="font-quicksand text-base text-soft-brown mb-1">{currentBook.tag}</p>
                    <p className="font-caveat text-lg text-warm-terracotta">
                      Written with love for Gian Lucca
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-5xl sm:text-6xl mb-4">{currentPages[page].emoji}</span>
                    <p className="font-quicksand text-lg sm:text-xl text-dark-brown leading-relaxed max-w-[600px]">
                      {currentPages[page].text}
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
                  onClick={() => setPage((p) => Math.min(currentPages.length - 1, p + 1))}
                  disabled={page === currentPages.length - 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-button font-fredoka text-sm bg-sage-green text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-hover-green transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

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
