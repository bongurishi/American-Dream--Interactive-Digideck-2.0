/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Loader } from './components/Loader';
import { AudioToggle } from './components/AudioToggle';
import { DeckNav } from './components/DeckNav';

// Chapters
import { DigiHero } from './components/sections/DigiHero';
import { WowSection } from './components/sections/WowSection';
import { OpportunityMap } from './components/sections/OpportunityMap';
import { TakeoverModule } from './components/sections/TakeoverModule';
import { ScenarioSimulator } from './components/sections/ScenarioSimulator';
import { ChooseYourPath } from './components/sections/ChooseYourPath';

const CHAPTERS = [
  { id: 'intro', name: 'The Vision', Component: DigiHero },
  { id: 'scale', name: 'The Scale', Component: WowSection },
  { id: 'map', name: 'Architecture', Component: OpportunityMap },
  { id: 'takeover', name: 'Own It', Component: TakeoverModule },
  { id: 'roi', name: 'Simulation', Component: ScenarioSimulator },
  { id: 'next', name: 'Access', Component: ChooseYourPath },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const ChapterComponent = CHAPTERS[currentChapterIndex].Component;

  useEffect(() => {
    if (loading) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        setCurrentChapterIndex((prev) => Math.min(CHAPTERS.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentChapterIndex((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="bg-black w-screen h-screen overflow-hidden text-white selection:bg-white/30 font-sans relative">
          <AudioToggle />
          <Navigation />
          
          <DeckNav 
            chapters={CHAPTERS.map(c => c.name)} 
            currentChapter={currentChapterIndex} 
            setChapter={setCurrentChapterIndex} 
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentChapterIndex}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
            >
              <ChapterComponent 
                onNext={() => {
                  if (currentChapterIndex < CHAPTERS.length - 1) {
                    setCurrentChapterIndex(c => c + 1);
                  }
                }} 
              />
            </motion.div>
          </AnimatePresence>
        </main>
      )}
    </>
  );
}

