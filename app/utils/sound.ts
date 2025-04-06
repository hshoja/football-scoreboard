import { useState, useEffect } from "react";

// Sound file mappings
const SoundEffects = {
  CLICK: "/sounds/click.mp3",
  GOAL: "/sounds/goal.mp3",
  EDIT: "/sounds/edit.mp3",
  GAME_START: "/sounds/game-start.mp3",
};

// Pre-load audio elements for better performance
const audioElements: Record<string, HTMLAudioElement> = {};

// Initialize audio elements when in browser environment
const initAudioElements = () => {
  if (typeof window !== "undefined") {
    Object.entries(SoundEffects).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.volume = 0.5; // Default volume at 50%
      audioElements[key] = audio;
    });
  }
};

// Sound settings stored in localStorage
const SOUND_SETTINGS_KEY = "football-scoreboard-sound-settings";

export interface SoundSettings {
  muted: boolean;
  volume: number; // 0 to 1
}

const defaultSettings: SoundSettings = {
  muted: false,
  volume: 0.5,
};

// Get stored settings or default
const getStoredSettings = (): SoundSettings => {
  if (typeof window === "undefined") return defaultSettings;

  try {
    const stored = localStorage.getItem(SOUND_SETTINGS_KEY);
    return stored ? JSON.parse(stored) : defaultSettings;
  } catch (error) {
    console.error("Error reading sound settings:", error);
    return defaultSettings;
  }
};

// Save settings to localStorage
const saveSettings = (settings: SoundSettings) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(SOUND_SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving sound settings:", error);
  }
};

// Play a sound effect
export const playSound = (sound: keyof typeof SoundEffects) => {
  if (typeof window === "undefined") return;

  const settings = getStoredSettings();
  if (settings.muted) return;

  // Initialize audio elements if they haven't been initialized yet
  if (Object.keys(audioElements).length === 0) {
    initAudioElements();
  }

  const audio = audioElements[sound];
  if (audio) {
    // Clone the audio to allow overlapping sounds
    const clone = audio.cloneNode() as HTMLAudioElement;
    clone.volume = settings.volume;
    clone.play().catch((error) => {
      // Common error in browsers requiring user interaction before playing audio
      console.warn("Failed to play sound:", error);
    });
  }
};

// React hook for sound settings
export const useSoundSettings = () => {
  const [settings, setSettings] = useState<SoundSettings>(defaultSettings);

  // Initialize from localStorage on component mount
  useEffect(() => {
    setSettings(getStoredSettings());
    initAudioElements();
  }, []);

  // Update settings and save to localStorage
  const updateSettings = (newSettings: Partial<SoundSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveSettings(updated);

    // Update volume for all audio elements
    Object.values(audioElements).forEach((audio) => {
      audio.volume = updated.volume;
    });
  };

  return {
    ...settings,
    setMuted: (muted: boolean) => updateSettings({ muted }),
    setVolume: (volume: number) => updateSettings({ volume }),
    toggleMuted: () => updateSettings({ muted: !settings.muted }),
    playSound,
  };
};
