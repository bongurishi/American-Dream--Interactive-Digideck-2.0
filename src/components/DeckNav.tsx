import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { playHoverSound, playClickSound } from "../lib/audio";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DeckNavProps {
  chapters: string[];
  currentChapter: number;
  setChapter: (index: number) => void;
}

export function DeckNav({ chapters, currentChapter, setChapter }: DeckNavProps) {
  const isFirst = currentChapter === 0;
  const isLast = currentChapter === chapters.length - 1;

  const navigatePrev = () => {
    if (!isFirst) {
      playClickSound();
      setChapter(currentChapter - 1);
    }
  };

  const navigateNext = () => {
    if (!isLast) {
      playClickSound();
      setChapter(currentChapter + 1);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
      <button 
        onClick={navigatePrev}
        onMouseEnter={playHoverSound}
        disabled={isFirst}
        className={cn(
          "p-2 rounded-full transition-colors",
          isFirst ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10 text-white/70 hover:text-white"
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1 border-l border-r border-white/10 px-2">
        {chapters.map((chapterName, idx) => {
          const isActive = idx === currentChapter;
          return (
            <button
              key={idx}
              onClick={() => {
                setChapter(idx);
                playClickSound();
              }}
              onMouseEnter={playHoverSound}
              className={cn(
                "relative px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-500 rounded-full",
                isActive ? "text-black" : "text-white/60 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{chapterName}</span>
            </button>
          );
        })}
      </div>

      <button 
        onClick={navigateNext}
        onMouseEnter={playHoverSound}
        disabled={isLast}
        className={cn(
          "p-2 rounded-full transition-colors",
          isLast ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10 text-white/70 hover:text-white"
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Keyboard hint */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-widest text-white/30 font-mono hidden md:block">
        Use Arrow Keys mapping to navigate
      </div>
    </div>
  );
}
