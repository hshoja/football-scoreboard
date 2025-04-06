import { useState } from "react";
import { useSoundSettings } from "../utils/sound";
import { useLanguage } from "../context/LanguageContext";

export default function SoundControl() {
  const { t } = useLanguage();
  const { muted, volume, setMuted, setVolume, playSound } = useSoundSettings();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handleToggleMute = () => {
    setMuted(!muted);
    playSound("CLICK");
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    // Don't play sound while adjusting to avoid annoying rapid sounds
  };

  const handleVolumeChangeEnd = () => {
    playSound("CLICK");
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggleMute}
        onMouseEnter={() => setShowVolumeSlider(true)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label={muted ? t("unmute") : t("mute")}
        title={muted ? t("unmute") : t("mute")}
      >
        {muted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              clipRule="evenodd"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>

      {showVolumeSlider && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-40 z-10"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072"
              />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              onMouseUp={handleVolumeChangeEnd}
              onTouchEnd={handleVolumeChangeEnd}
              className="flex-1 accent-blue-600"
            />
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
