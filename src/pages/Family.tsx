import { Heart } from "lucide-react";

const photos = [
  {
    src: "/daddy-gian-photo.jpg",
    caption: "Daddy & Gian Lucca",
    date: "Ranch Memories",
  },
  {
    src: "/hero-ranch-scene.png",
    caption: "Life on the Ranch",
    date: "Everyday Magic",
  },
  {
    src: "/bear-friend.png",
    caption: "Benny the Bear",
    date: "Story Friends",
  },
  {
    src: "/chickens-friends.png",
    caption: "The Chicken Crew",
    date: "Story Friends",
  },
  {
    src: "/turkey-friends.png",
    caption: "Tommy Turkey",
    date: "Story Friends",
  },
  {
    src: "/ranch-house.png",
    caption: "Home Sweet Ranch",
    date: "Ranch Memories",
  },
];

export default function Family() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-24 sm:py-32"
        style={{
          background: "linear-gradient(180deg, #e8f2f6 0%, #fbf7f0 100%)",
        }}
      >
        <span className="absolute text-5xl sm:text-6xl left-[10%] top-[20%] opacity-20 pointer-events-none">
          📸
        </span>
        <span className="absolute text-5xl sm:text-6xl right-[12%] top-[18%] opacity-20 pointer-events-none">
          🖼️
        </span>
        <span className="absolute text-4xl sm:text-5xl left-[15%] bottom-[20%] opacity-20 pointer-events-none">
          ❤️
        </span>

        <h1 className="font-fredoka text-4xl sm:text-5xl lg:text-[56px] font-semibold leading-tight mb-4 text-dark-brown text-center relative z-10">
          🖼️ Family Pictures
        </h1>
        <p className="font-quicksand text-base sm:text-xl max-w-[500px] text-center text-soft-brown relative z-10">
          Special moments with the people we love most
        </p>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="group bg-white rounded-[20px] overflow-hidden shadow-soft hover:shadow-hover transition-shadow duration-200"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <Heart className="w-5 h-5 text-white/80 fill-white/40" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-fredoka text-lg text-dark-brown">
                    {photo.caption}
                  </h3>
                  <p className="font-quicksand text-sm text-soft-brown">
                    {photo.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add more photos prompt */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <div
            className="text-center px-6 sm:px-10 py-8 sm:py-10 rounded-[20px]"
            style={{ backgroundColor: "var(--color-light-sand)" }}
          >
            <span className="block text-5xl sm:text-[56px] mb-4">📸</span>
            <h3 className="font-fredoka text-xl sm:text-[28px] mb-3 text-dark-brown">
              More Memories Coming Soon
            </h3>
            <p className="font-quicksand text-base sm:text-lg max-w-[500px] mx-auto text-soft-brown">
              Drop family photos into the <code>public/family/</code> folder and
              they&apos;ll appear here. Every picture tells a story!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
