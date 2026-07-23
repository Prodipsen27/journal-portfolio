import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bookmark, Sparkles, Music, Code, Palette, Zap, Play, Pause } from 'lucide-react';
import { JournalAILine } from './JournalAILine';

export const FunSection: React.FC = () => {
  const [isPlayingVibe, setIsPlayingVibe] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* SECTION HEADER */}
      <div className="pb-4 border-b border-[#8C8577]/30">
        <div className="flex items-center space-x-2">
          <Bookmark className="w-6 h-6 text-[#9C3B3B]" />
          <h2 className="font-journal text-3xl font-bold text-[#20242B]">
            Doodles & Margin Sketchbook
          </h2>
        </div>
        <p className="font-journal text-xs text-[#4B5566] mt-1">
          Side experiments, audio visualizers, vibe-code studies, and creative margin notes.
        </p>
      </div>

      {/* SKETCHBOOK SPREAD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DOODLE CARD 1: Aurality Music Visualizer */}
        <div className="polaroid-card p-5 rounded-lg transform rotate-[-1.5deg] space-y-4 relative">
          <div className="wasi-tape absolute -top-3 left-6 w-16 h-4 washi-tape" />

          <div className="flex items-center justify-between text-xs font-typewriter text-[#8C8577]">
            <span className="text-[#9C3B3B] font-bold">#vibe-code</span>
            <span>Dec 2023</span>
          </div>

          <h3 className="font-journal text-xl font-bold text-[#20242B] flex items-center space-x-2">
            <Music className="w-5 h-5 text-[#9C3B3B]" />
            <span>Aurality Audio Waveform Vibe</span>
          </h3>

          <p className="font-journal text-xs text-[#4B5566] leading-relaxed">
            An experimental music streaming UI inspired by luxury tactile audio hardware, featuring Framer Motion transitions and Web Audio frequency synthesis.
          </p>

          {/* Interactive Audio Waveform Simulation */}
          <div className="p-4 rounded bg-[#20242B] text-[#EFE6D2] space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="font-typewriter text-xs text-[#B08D3F]">
                {isPlayingVibe ? "Synthesizing Ambient Synth…" : "Waveform Ready"}
              </span>
              <button
                onClick={() => setIsPlayingVibe(!isPlayingVibe)}
                className="p-2 rounded-full bg-[#9C3B3B] hover:bg-[#b84343] text-[#fbf7ee] transition-colors"
              >
                {isPlayingVibe ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Simulated Frequency Bars */}
            <div className="flex items-end justify-between h-12 gap-1 px-2 pt-2 border-t border-[#4B5566]/40">
              {[40, 70, 25, 90, 55, 80, 30, 95, 60, 45, 75, 20, 85, 50, 65, 35, 90, 40].map((h, i) => (
                <div
                  key={i}
                  style={{
                    height: isPlayingVibe ? `${Math.min(100, h * (0.6 + Math.random() * 0.8))}%` : `${h * 0.4}%`
                  }}
                  className={`w-1.5 rounded-t transition-all duration-300 ${
                    isPlayingVibe ? 'bg-[#B08D3F]' : 'bg-[#4B5566]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* DOODLE CARD 2: Hand-drawn Particle Physics */}
        <div className="polaroid-card p-5 rounded-lg transform rotate-[1.5deg] space-y-4 relative">
          <div className="wasi-tape absolute -top-3 right-6 w-16 h-4 washi-tape-yellow" />

          <div className="flex items-center justify-between text-xs font-typewriter text-[#8C8577]">
            <span className="text-[#5C7C74] font-bold">#creative-canvas</span>
            <span>Jul 2025</span>
          </div>

          <h3 className="font-journal text-xl font-bold text-[#20242B] flex items-center space-x-2">
            <Palette className="w-5 h-5 text-[#5C7C74]" />
            <span>TaraEffects Gold Dust Particle Physics</span>
          </h3>

          <p className="font-journal text-xs text-[#4B5566] leading-relaxed">
            Custom HTML5 Canvas particle system simulating ambient gold dust light floating across luxury wedding booking interfaces at 60 FPS.
          </p>

          {/* Doodled sketch box */}
          <div className="p-4 rounded bg-[#EFE6D2] border border-[#BCAE8E] font-handwriting text-lg text-[#20242B] space-y-1">
            <p>• Particle velocity vectors: v_x = sin(t), v_y = -0.5</p>
            <p>• Gold leaf shimmer opacity: alpha = 0.3 + 0.7 * cos(f)</p>
            <p className="text-sm font-typewriter text-[#9C3B3B] pt-2">
              Result: Double conversion rate for luxury clients.
            </p>
          </div>
        </div>
      </div>

      {/* MARGIN NOTES TRIVIA & EASTER EGGS */}
      <div className="p-6 rounded-lg bg-[#FBF7EE] border border-[#DCCFAF] shadow-sm space-y-3">
        <h3 className="font-handwriting text-2xl font-bold text-[#20242B]">
          "Doodles in the margins of my field logs…"
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-journal text-xs text-[#4B5566]">
          <div className="p-3 rounded bg-[#EFE6D2] border border-[#BCAE8E]">
            <p className="font-handwriting text-lg text-[#9C3B3B] font-bold">Coffee Consumption</p>
            <p>Over 1,200 cups brewed while compiling 27+ systems and tuning LangGraph agent state graphs.</p>
          </div>
          <div className="p-3 rounded bg-[#EFE6D2] border border-[#BCAE8E]">
            <p className="font-handwriting text-lg text-[#5C7C74] font-bold">Favorite Stack</p>
            <p>React + Next.js App Router on the client, Express + Gemini API on the server, pgvector for memory.</p>
          </div>
          <div className="p-3 rounded bg-[#EFE6D2] border border-[#BCAE8E]">
            <p className="font-handwriting text-lg text-[#B08D3F] font-bold">Design Philosophy</p>
            <p>Craft comes purely from typography, mathematical scales, and genuine human texture.</p>
          </div>
        </div>
      </div>

      {/* BOTTOM AI QUESTION LINE */}
      <JournalAILine />
    </motion.div>
  );
};
