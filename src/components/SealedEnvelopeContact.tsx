import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ExternalLink, Download, Copy, Check, Lock, Unlock, Sparkles, Send, FileText } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

// Custom SVG Icons styled as hand-drawn/embossed stamps
const GitHubStampIcon = () => (
  <svg className="w-5 h-5 text-[#181717] inline-block" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInStampIcon = () => (
  <svg className="w-5 h-5 text-[#0A66C2] inline-block" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

export const SealedEnvelopeContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Prodip_Sengupta_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 select-none mt-16 mr-4">
      {/* SECTION HEADER */}
      <div>
        <span className="font-typewriter text-[10px] text-[#8C8577] uppercase tracking-widest font-bold">
          FIELD LOG ENTRY · #04
        </span>
        <h1 className="font-handwriting text-3xl sm:text-4xl text-[#9C3B3B] font-bold leading-tight mt-0.5">
          Contact & Correspondence
        </h1>
        <p className="font-typewriter text-[10px] sm:text-[11px] text-[#8C8577] tracking-wider mt-1">
          {isOpen ? "Envelope unsealed · Inspection of contact stamps enabled" : "Sealed parchment envelope · Tap wax stamp to unseal"}
        </p>
      </div>

      {/* ENVELOPE CARD WRAPPER */}
      <div className="relative mt-2">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* SEALED ENVELOPE VIEW */
            <motion.div
              key="sealed"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ rotateX: -90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 rounded-xl bg-[#EFE6D2] border-2 border-[#BCAE8E] shadow-xl relative overflow-hidden text-center cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              {/* WASHI TAPE ON TOP */}
              <div className="wasi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-4 washi-tape rotate-[-1deg] z-10" />

              {/* ENVELOPE TRIANGULAR FLAP SHADOW */}
              <div 
                className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#E2D6BB] to-transparent pointer-events-none opacity-80"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                }}
              />

              {/* ENVELOPE AIRMAIL BORDER ACCENT */}
              <div className="p-4 border-2 border-dashed border-[#8C8577]/40 rounded-lg bg-[#FBF7EE]/60 space-y-4 relative z-10">
                {/* PARCHMENT AIR MAIL STAMP */}
                <div className="flex justify-between items-start">
                  <div className="text-left font-typewriter text-[9px] text-[#8C8577] leading-snug">
                    <span className="font-bold text-[#9C3B3B] block">CONFIDENTIAL FIELD NOTE</span>
                    <span>ATTN: PRODIP SENGUPTA</span>
                  </div>
                  <div className="px-2 py-1 bg-[#EFE6D2] border border-[#9C3B3B] rounded font-typewriter text-[9px] text-[#9C3B3B] font-bold uppercase tracking-wider shadow-2xs">
                    AIR MAIL · VIA 2026
                  </div>
                </div>

                <div className="py-2">
                  <h3 className="font-handwriting text-3xl sm:text-4xl text-[#20242B] font-bold">
                    "Official Dispatch & Contact Channels"
                  </h3>
                  <p className="font-journal text-xs text-[#4B5566] italic mt-1">
                    Direct access links for GitHub, LinkedIn, Email, and Resume
                  </p>
                </div>

                {/* PROMINENT WAX SEAL BUTTON */}
                <div className="pt-2 flex flex-col items-center justify-center space-y-2">
                  <motion.div 
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full wax-seal flex flex-col items-center justify-center text-[#FBF7EE] shadow-2xl border-4 border-[#d27575]/80 cursor-pointer relative group/seal"
                  >
                    <Sparkles className="w-4 h-4 text-[#FFD700] absolute top-2 right-2 animate-pulse" />
                    <span className="font-handwriting text-2xl font-bold tracking-widest leading-none drop-shadow">
                      PS
                    </span>
                    <span className="font-typewriter text-[8px] uppercase tracking-wider opacity-90 mt-0.5">
                      SEAL
                    </span>
                  </motion.div>

                  <div className="inline-flex items-center space-x-1.5 font-typewriter text-[10px] font-bold text-[#9C3B3B] bg-[#EFE6D2] px-3 py-1 rounded-full border border-[#BCAE8E] shadow-2xs group-hover:bg-[#9C3B3B] group-hover:text-[#FBF7EE] transition-colors">
                    <Unlock className="w-3 h-3" />
                    <span>PRESS WAX SEAL TO UNSEAL ENVELOPE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* UNSEALED ENVELOPE & CONTACT STAMPS */
            <motion.div
              key="unsealed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="p-4 sm:p-5 rounded-xl bg-[#FBF7EE] border-2 border-[#9C3B3B] shadow-lg relative space-y-3"
            >
              {/* HEADER WITH RE-SEAL ACTION */}
              <div className="flex items-center justify-between pb-2 border-b border-[#DCCFAF]">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full wax-seal flex items-center justify-center text-[#FBF7EE] font-handwriting font-bold text-xs shadow-2xs">
                    PS
                  </div>
                  <div>
                    <span className="font-typewriter text-[9px] text-[#9C3B3B] font-bold uppercase block">
                      ENVELOPE UNSEALED
                    </span>
                    <span className="font-handwriting text-xl font-bold text-[#20242B]">
                      Direct Contact Stamps
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 py-1 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-[#8C8577] hover:text-[#9C3B3B] font-typewriter text-[9px] font-bold flex items-center space-x-1 shadow-2xs"
                >
                  <Lock className="w-3 h-3 text-[#9C3B3B]" />
                  <span>Re-Seal</span>
                </button>
              </div>

              {/* STAMPS GRID */}
              <div className="space-y-2 font-typewriter text-xs">
                {/* 1. DIRECT EMAIL STAMP */}
                <div className="p-2.5 rounded-lg bg-[#EFE6D2]/80 border border-[#BCAE8E] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-[#9C3B3B] transition-colors">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="p-2 rounded bg-[#FBF7EE] border border-[#BCAE8E] text-[#9C3B3B] shrink-0 shadow-2xs">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] text-[#8C8577] font-bold uppercase block">
                        Direct Email Address
                      </span>
                      <span className="font-typewriter text-xs sm:text-sm font-bold text-[#20242B] truncate block">
                        {PROFILE_DATA.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0 self-end sm:self-center">
                    <button
                      onClick={handleCopyEmail}
                      className="px-2 py-1 rounded bg-[#FBF7EE] hover:bg-[#DCCFAF] text-[#20242B] border border-[#BCAE8E] text-[10px] font-bold flex items-center space-x-1 transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#3B6B58]" /> : <Copy className="w-3 h-3 text-[#9C3B3B]" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                    <a
                      href={`mailto:${PROFILE_DATA.email}`}
                      className="px-2 py-1 rounded bg-[#9C3B3B] text-[#FBF7EE] hover:bg-[#b84343] text-[10px] font-bold flex items-center space-x-1 shadow-2xs"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send Mail</span>
                    </a>
                  </div>
                </div>

                {/* 2. GITHUB STAMP */}
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#EFE6D2]/80 border border-[#BCAE8E] shadow-2xs flex items-center justify-between gap-2 hover:border-[#9C3B3B] hover:bg-[#EFE6D2] transition-colors group"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="p-2 rounded bg-[#FBF7EE] border border-[#BCAE8E] shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <GitHubStampIcon />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] text-[#8C8577] font-bold uppercase block">
                        GitHub Repositories
                      </span>
                      <span className="font-typewriter text-xs sm:text-sm font-bold text-[#20242B] truncate block">
                        github.com/prodipsen27
                      </span>
                    </div>
                  </div>

                  <div className="px-2.5 py-1 rounded bg-[#FBF7EE] text-[#9C3B3B] border border-[#BCAE8E] text-[10px] font-bold flex items-center space-x-1 shrink-0 group-hover:bg-[#9C3B3B] group-hover:text-[#FBF7EE] transition-colors">
                    <span>Visit Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </a>

                {/* 3. LINKEDIN STAMP */}
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#EFE6D2]/80 border border-[#BCAE8E] shadow-2xs flex items-center justify-between gap-2 hover:border-[#9C3B3B] hover:bg-[#EFE6D2] transition-colors group"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="p-2 rounded bg-[#FBF7EE] border border-[#BCAE8E] shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <LinkedInStampIcon />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] text-[#8C8577] font-bold uppercase block">
                        LinkedIn Network
                      </span>
                      <span className="font-typewriter text-xs sm:text-sm font-bold text-[#20242B] truncate block">
                        linkedin.com/in/prodipsen27
                      </span>
                    </div>
                  </div>

                  <div className="px-2.5 py-1 rounded bg-[#FBF7EE] text-[#0A66C2] border border-[#BCAE8E] text-[10px] font-bold flex items-center space-x-1 shrink-0 group-hover:bg-[#0A66C2] group-hover:text-[#FBF7EE] transition-colors">
                    <span>Connect</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </a>

                {/* 4. RESUME DOWNLOAD STAMP */}
                <div 
                  onClick={handleDownloadResume}
                  className="p-2.5 rounded-lg bg-[#F5EFE4] border-2 border-dashed border-[#9C3B3B] shadow-2xs flex items-center justify-between gap-2 hover:bg-[#EFE6D2] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="p-2 rounded bg-[#9C3B3B] text-[#FBF7EE] shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] text-[#9C3B3B] font-bold uppercase block">
                        Official Document Stamp
                      </span>
                      <span className="font-handwriting text-xl font-bold text-[#20242B] block leading-none">
                        Prodip Sengupta Resume (PDF)
                      </span>
                    </div>
                  </div>

                  <button className="px-3 py-1.5 rounded bg-[#9C3B3B] text-[#FBF7EE] font-typewriter text-[10px] font-bold flex items-center space-x-1.5 shrink-0 shadow group-hover:bg-[#b84343] transition-colors">
                    <Download className="w-3.5 h-3.5 text-[#FBF7EE]" />
                    <span>Download CV</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
