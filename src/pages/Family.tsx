import { useState, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, Play, Heart } from "lucide-react";

interface Album {
  id: string;
  title: string;
  emoji: string;
  items: string[];
}

const albums: Album[] = [
  {
    id: "videos",
    title: "Family Videos",
    emoji: "🎥",
    items: [
      "/family/XPBY8280.MP4",
      "/family/JMEA3948.MOV",
      "/family/IMG_6825.MOV",
      "/family/AGNS0458.MOV",
    ],
  },
  {
    id: "spring-2025",
    title: "Spring 2025",
    emoji: "🌸",
    items: [
      "/family/IMG_0677.PNG",
      "/family/VTXX2567.PNG",
      "/family/IMG_6825.JPEG",
      "/family/XZBL4440.JPG",
      "/family/KISD7870.JPG",
      "/family/IMG_E2353.JPG",
      "/family/IMG_9968.JPG",
      "/family/IMG_9763.JPG",
      "/family/IMG_9735.JPG",
      "/family/IMG_7014.JPG",
      "/family/IMG_6789.JPG",
      "/family/IMG_5235.JPG",
      "/family/IMG_5228.JPG",
    ],
  },
  {
    id: "memories",
    title: "Memories 2022-2024",
    emoji: "📸",
    items: [
      "/family/IMG_5179.JPG",
      "/family/IMG_5078.JPG",
      "/family/IMG_5066.JPG",
      "/family/IMG_5045.JPG",
      "/family/IMG_2639.JPG",
      "/family/IMG_2579.JPG",
      "/family/IMG_2576.JPG",
      "/family/IMG_2553.JPG",
      "/family/IMG_2502.JPG",
      "/family/IMG_2441.JPG",
      "/family/IMG_2345.JPG",
      "/family/IMG_2054.JPG",
      "/family/IMG_1933.JPG",
    ],
  },
  {
    id: "rancher",
    title: "Little Rancher",
    emoji: "🐻",
    items: [
      "/family/IMG_1805.JPG",
      "/family/IMG_1389.JPG",
      "/family/IMG_1205.JPG",
      "/family/IMG_1202.JPG",
      "/family/IMG_1138.JPG",
      "/family/IMG_0893.JPG",
      "/family/IMG_0681.JPG",
      "/family/IMG_0679.JPG",
      "/family/GTLD0765.JPG",
      "/family/FEEI0047.JPG",
      "/family/417248032.jpg",
      "/family/386388194_1.jpg",
      "/family/364761592.jpg",
    ],
  },
];

function isVideo(src: string) {
  return /\.(mp4|mov|avi|webm)$/i.test(src);
}

function getFileName(src: string) {
  return src.split("/").pop() || "";
}

export default function Family() {
  const [openAlbum, setOpenAlbum] = useState<Album | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const bubbleStyles = useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      width: `${Math.random() * 10 + 4}px`,
      height: `${Math.random() * 10 + 4}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
  }, []);

  const openLightbox = (album: Album) => {
    setOpenAlbum(album);
    setCurrentIndex(0);
  };

  const closeLightbox = () => {
    setOpenAlbum(null);
  };

  const goNext = () => {
    if (!openAlbum) return;
    setCurrentIndex((i) => (i + 1) % openAlbum.items.length);
  };

  const goPrev = () => {
    if (!openAlbum) return;
    setCurrentIndex((i) => (i - 1 + openAlbum.items.length) % openAlbum.items.length);
  };

  const currentItem = openAlbum ? openAlbum.items[currentIndex] : null;

  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-24 sm:py-32"
        style={{
          background: "linear-gradient(180deg, #e8f2f6 0%, #fbf7f0 100%)",
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

      {/* Albums */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <span className="font-quicksand text-sm font-semibold uppercase tracking-[0.05em] text-sage-green block mb-2">
              📚 ALBUMS
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-medium mb-3 text-dark-brown">
              Click to Explore
            </h2>
            <div
              className="w-[60px] h-[3px] mx-auto rounded-full"
              style={{ backgroundColor: "var(--color-golden-honey)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {albums.map((album) => {
              const cover = album.items[0];
              const videoCount = album.items.filter(isVideo).length;
              const photoCount = album.items.length - videoCount;

              return (
                <button
                  key={album.id}
                  onClick={() => openLightbox(album)}
                  className="group text-left"
                >
                  <div className="bg-white rounded-[20px] overflow-hidden h-full shadow-soft hover:shadow-hover transition-shadow duration-200">
                    <div className="relative overflow-hidden aspect-square">
                      {isVideo(cover) ? (
                        <div className="w-full h-full bg-dark-brown flex items-center justify-center">
                          <Play className="w-12 h-12 text-white/80" fill="currentColor" />
                        </div>
                      ) : (
                        <img
                          src={cover}
                          alt={album.title}
                          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute top-3 right-3">
                        <Heart className="w-5 h-5 text-white/80 fill-white/40" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/50 to-transparent">
                        <span className="font-quicksand text-xs text-white">
                          {photoCount > 0 && `${photoCount} photos`}
                          {photoCount > 0 && videoCount > 0 && " · "}
                          {videoCount > 0 && `${videoCount} videos`}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-fredoka text-lg text-dark-brown">
                        {album.emoji} {album.title}
                      </h3>
                      <p className="font-quicksand text-sm text-soft-brown">
                        Tap to view
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
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

      {/* Lightbox */}
      {openAlbum && currentItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="max-w-[90vw] max-h-[80vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo(currentItem) ? (
              <video
                src={currentItem}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-[70vh] rounded-[16px]"
              />
            ) : (
              <img
                src={currentItem}
                alt={getFileName(currentItem)}
                className="max-w-full max-h-[70vh] object-contain rounded-[16px]"
              />
            )}
            <p className="mt-4 font-quicksand text-white text-sm">
              {openAlbum.title} — {currentIndex + 1} / {openAlbum.items.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
