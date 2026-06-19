import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

interface MediaContextValue {
  activeId: string | null;
  playMedia: (id: string, element: HTMLAudioElement | HTMLVideoElement) => void;
  stopAll: () => void;
}

const MediaContext = createContext<MediaContextValue | null>(null);

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeElementRef = useRef<HTMLAudioElement | HTMLVideoElement | null>(null);

  const stopAll = useCallback(() => {
    // Pause all audio and video elements on the page
    document.querySelectorAll<HTMLAudioElement | HTMLVideoElement>("audio, video").forEach((el) => {
      if (!el.paused) {
        el.pause();
      }
    });
    setActiveId(null);
    activeElementRef.current = null;
  }, []);

  const playMedia = useCallback((id: string, element: HTMLAudioElement | HTMLVideoElement) => {
    if (activeElementRef.current && activeElementRef.current !== element) {
      activeElementRef.current.pause();
    }
    // Also pause any other stray media
    document.querySelectorAll<HTMLAudioElement | HTMLVideoElement>("audio, video").forEach((el) => {
      if (el !== element && !el.paused) {
        el.pause();
      }
    });
    setActiveId(id);
    activeElementRef.current = element;
    element.play().catch(() => {});
  }, []);

  // Pause active media when user leaves the page/tab (optional polish)
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden && activeElementRef.current) {
        activeElementRef.current.pause();
        setActiveId(null);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <MediaContext.Provider value={{ activeId, playMedia, stopAll }}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  const ctx = useContext(MediaContext);
  if (!ctx) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return ctx;
}
