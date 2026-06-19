let currentAudio: HTMLAudioElement | null = null;

const soundMap: Record<string, string> = {
  bear: "/audio/bear-growl.mp3",
  chicken: "/audio/chicken-cluck.mp3",
  turkey: "/audio/turkey-gobble.mp3",
};

export function playAnimalSound(name: string) {
  const key = name.toLowerCase();
  let src: string | null = null;

  if (key.includes("bear")) src = soundMap.bear;
  else if (key.includes("chicken")) src = soundMap.chicken;
  else if (key.includes("turkey")) src = soundMap.turkey;

  if (!src) return;

  // Stop any currently playing animal sound
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audio = new Audio(src);
  currentAudio = audio;

  audio.play().catch(() => {
    // Ignore autoplay/user-gesture errors
  });

  audio.addEventListener("ended", () => {
    if (currentAudio === audio) {
      currentAudio = null;
    }
  });
}
