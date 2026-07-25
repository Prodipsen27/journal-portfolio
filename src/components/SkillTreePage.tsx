import React from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   SkillTreePage — Fully Expanded SVG Skill Tree map for Desktop.
   Fills the entire journal page edge-to-edge without scrollbars.
───────────────────────────────────────────────────────────────────────────── */
export const SkillTreePage: React.FC = () => {
  return (
    <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-between select-none overflow-hidden z-20">

      {/* Washi-tape decoration at top */}
      <div
        className="absolute top-2 right-20 w-24 h-7 z-20 opacity-90 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(45deg, #6E8B84, #6E8B84 6px, #587169 6px, #587169 12px)',
          transform: 'rotate(-4deg)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
        }}
      />

      {/* Ribbon badge at top right */}
      <div
        className="absolute top-0 right-6 w-8 h-12 bg-[#9C3B3B] z-20 pointer-events-none flex items-start justify-center pt-1.5 text-[#EAD9B6] text-xs shadow-md"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)',
        }}
      >
        ★
      </div>

      {/* Compact Header */}
      <div className="relative z-10 mb-0 pt-0 shrink-0">
        <div className="flex items-center gap-2 font-typewriter text-[10px] tracking-widest uppercase text-[#6B6459] dark:text-[#A69F90] font-bold">
          <span className="text-[#9C3B3B] dark:text-[#E56B6B]">#skills</span>
          <span>·</span>
          <span>sketched Oct 2026</span>
        </div>
        <h1
          className="font-handwriting font-bold leading-none text-[#20242B] dark:text-[#FBF7EE]"
          style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', marginTop: 1, marginBottom: 0 }}
        >
          What I've grown so far
        </h1>
        <p className="font-handwriting text-[#4B5566] dark:text-[#D1C7BD]" style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)', marginTop: 1 }}>
          a rough map, not a résumé —
        </p>
      </div>

      {/* SVG Tree Map — fully expanded to fill whole available page space */}
      <div className="flex-1 min-h-0 relative z-10 w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 1200 900"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', width: '100%', height: '100%' }}
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="st-pencil" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.035" numOctaves="2" seed="7" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
            <filter id="st-pencilSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="3" result="n2"/>
              <feDisplacementMap in="SourceGraphic" in2="n2" scale="3.4" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
            <filter id="st-blobWobble" x="-15%" y="-15%" width="130%" height="130%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.014" numOctaves="2" seed="11" result="n3"/>
              <feDisplacementMap in="SourceGraphic" in2="n3" scale="9" xChannelSelector="R" yChannelSelector="G"/>
            </filter>

            {/* Reusable lumpy cloud/blob path */}
            <path id="cloudBlob" d="
              M120,8 C60,-4 6,40 6,108
              C4,150 26,182 14,222
              C0,262 18,312 56,336
              C36,376 76,412 128,406
              C168,418 212,392 222,350
              C246,330 236,278 216,252
              C242,214 230,164 198,146
              C214,96 178,44 128,36
              C150,10 138,2 120,8 Z"/>
          </defs>

          {/* ══════════ CENTRAL "GENERATIVE AI" CLUSTER CONNECTORS ══════════ */}
          <g filter="url(#st-pencilSoft)" fill="none" className="stroke-[#20242B] dark:stroke-[#E6DFCF]" strokeWidth="3.5" opacity="0.75">
            <path d="M450,130 C360,120 280,110 200,98"/>
            <path d="M750,130 C850,130 950,115 1020,98"/>
            <path d="M530,190 C450,225 350,245 270,235"/>
            <path d="M600,210 C580,245 560,265 555,280"/>
            <path d="M670,190 C730,225 800,245 860,240"/>
            <path d="M700,160 C830,155 930,130 1010,100"/>
          </g>

          {/* Core starburst blob */}
          <g filter="url(#st-blobWobble)">
            <ellipse cx="600" cy="130" rx="175" ry="78" fill="#9C3B3B"/>
          </g>
          <text x="600" y="125" textAnchor="middle" fontFamily="'Caveat', cursive" fontWeight="700" fontSize="56" fill="#FFF8EB">Generative AI</text>
          <text x="600" y="156" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="15" fill="#FAD6C3" letterSpacing="1" fontWeight="700">#the specialty</text>

          {/* Surrounding skill words — EXPANDED BOLD TEXT */}
          <g fontFamily="'Caveat', cursive" fontWeight="700" className="fill-[#20242B] dark:fill-[#FBF7EE]" fontSize="36">
            <text x="230" y="48"  transform="rotate(-3 230,48)">Gemini</text>
            <text x="420" y="36"  transform="rotate(2 420,36)">OpenAI</text>
            <text x="620" y="32"  transform="rotate(-2 620,32)">Claude</text>
            <text x="810" y="40"  transform="rotate(3 810,40)">AI Agents</text>
            <text x="1000" y="50" transform="rotate(-2 1000,50)">Vector Search</text>

            <text x="110" y="115" transform="rotate(-4 110,115)">LangChain</text>
            <text x="1010" y="110" transform="rotate(3 1010,110)">Tool Calling</text>

            <text x="200" y="240" transform="rotate(3 200,240)">LangGraph</text>
            <text x="400" y="255" transform="rotate(-3 400,255)">RAG Pipelines</text>
            <text x="560" y="280" transform="rotate(2 560,280)">Embeddings</text>
            <text x="790" y="255" transform="rotate(-3 790,255)">Prompt Engineering</text>
          </g>

          {/* Brain doodle near Prompt Engineering */}
          <g transform="translate(910,215)" filter="url(#st-pencilSoft)" fill="none" stroke="#9C3B3B" strokeWidth="2.5" opacity="0.9">
            <path d="M0,10 C-7,0 5,-9 11,-2 C18,-9 29,0 22,11 C29,18 18,29 11,22 C5,29 -7,18 0,10 Z"/>
            <path d="M6,4 C9,10 13,10 16,4 M4,15 C9,13 13,13 18,15"/>
          </g>

          {/* ══════════ TRUNK LINE DOWN TO CATEGORIES ══════════ */}
          <g filter="url(#st-pencil)" fill="none" className="stroke-[#20242B] dark:stroke-[#E6DFCF]" strokeWidth="7" opacity="0.85">
            <path d="M600,208 C600,260 600,285 600,310"/>
          </g>

          {/* Connectors fanning out cleanly to category headings */}
          <g filter="url(#st-pencilSoft)" fill="none" className="stroke-[#20242B] dark:stroke-[#E6DFCF]" strokeWidth="4.5" opacity="0.8">
            <path d="M600,310 C420,320 300,325 152,335"/>
            <path d="M600,310 C500,320 440,325 376,335"/>
            <path d="M600,310 C600,320 600,325 600,335"/>
            <path d="M600,310 C700,320 760,325 824,335"/>
            <path d="M600,310 C780,320 900,325 1048,335"/>
          </g>

          {/* ══════════ CATEGORY HEADINGS & HASHTAGS (EXPANDED) ══════════ */}

          {/* 1. Testing & Eval */}
          <text x="152" y="358" textAnchor="middle" fontFamily="'Caveat', cursive" fontWeight="700" fontSize="34" className="fill-[#20242B] dark:fill-[#FBF7EE]">Testing &amp; Eval</text>
          <text x="152" y="380" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="13" fontWeight="700" className="fill-[#6B6459] dark:fill-[#D1C7BD]">#qualitybar</text>
          <use href="#cloudBlob" x="32" y="395" width="240" height="480" filter="url(#st-blobWobble)" fill="#5C7C74" opacity="0.95"/>
          <g fontFamily="'Caveat', cursive" fontWeight="700" fontSize="32" fill="#FFF8EB" textAnchor="middle">
            <text x="152" y="475">JEST</text>
            <text x="152" y="530">Postman</text>
            <text x="152" y="585" fontSize="26">React Testing Lib</text>
            <text x="152" y="640">LangSmith</text>
            <text x="152" y="695">RAGAS</text>
          </g>

          {/* 2. Tools & Infra */}
          <text x="376" y="358" textAnchor="middle" fontFamily="'Caveat', cursive" fontWeight="700" fontSize="34" className="fill-[#20242B] dark:fill-[#FBF7EE]">Tools &amp; Infra</text>
          <text x="376" y="380" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="13" fontWeight="700" className="fill-[#6B6459] dark:fill-[#D1C7BD]">#shipping</text>
          <use href="#cloudBlob" x="256" y="395" width="240" height="480" filter="url(#st-blobWobble)" fill="#B08D3F" opacity="0.95"/>
          <g fontFamily="'Caveat', cursive" fontWeight="700" fontSize="30" fill="#FFF8EB" textAnchor="middle">
            <text x="376" y="468">Docker</text>
            <text x="376" y="518">Git · GitHub</text>
            <text x="376" y="568">Vercel</text>
            <text x="376" y="618">Render</text>
            <text x="376" y="668">Cloudinary</text>
            <text x="376" y="718">Stripe API</text>
          </g>

          {/* 3. Frameworks */}
          <text x="600" y="358" textAnchor="middle" fontFamily="'Caveat', cursive" fontWeight="700" fontSize="34" className="fill-[#20242B] dark:fill-[#FBF7EE]">Frameworks</text>
          <text x="600" y="380" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="13" fontWeight="700" className="fill-[#6B6459] dark:fill-[#D1C7BD]">#buildtools</text>
          <use href="#cloudBlob" x="480" y="395" width="240" height="480" filter="url(#st-blobWobble)" fill="#4B5566" opacity="0.95"/>
          <g fontFamily="'Caveat', cursive" fontWeight="700" fontSize="29" fill="#FFF8EB" textAnchor="middle">
            <text x="600" y="462">React.js</text>
            <text x="600" y="508">Next.js</text>
            <text x="600" y="554">Node.js</text>
            <text x="600" y="600">Express.js</text>
            <text x="600" y="646">Tailwind CSS</text>
            <text x="600" y="692">Redux</text>
            <text x="600" y="738" fontSize="24">Framer Motion</text>
          </g>

          {/* 4. Databases */}
          <text x="824" y="358" textAnchor="middle" fontFamily="'Caveat', cursive" fontWeight="700" fontSize="34" className="fill-[#20242B] dark:fill-[#FBF7EE]">Databases</text>
          <text x="824" y="380" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="13" fontWeight="700" className="fill-[#6B6459] dark:fill-[#D1C7BD]">#storage</text>
          <use href="#cloudBlob" x="704" y="395" width="240" height="480" filter="url(#st-blobWobble)" fill="#3F6459" opacity="0.95"/>
          <g fontFamily="'Caveat', cursive" fontWeight="700" fontSize="32" fill="#FFF8EB" textAnchor="middle">
            <text x="824" y="475">PostgreSQL</text>
            <text x="824" y="530">MongoDB</text>
            <text x="824" y="585">Supabase</text>
            <text x="824" y="640">Pinecone</text>
            <text x="824" y="695">pgvector</text>
          </g>

          {/* 5. Languages */}
          <text x="1048" y="358" textAnchor="middle" fontFamily="'Caveat', cursive" fontWeight="700" fontSize="34" className="fill-[#20242B] dark:fill-[#FBF7EE]">Languages</text>
          <text x="1048" y="380" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="13" fontWeight="700" className="fill-[#6B6459] dark:fill-[#D1C7BD]">#foundations</text>
          <use href="#cloudBlob" x="928" y="395" width="240" height="480" filter="url(#st-blobWobble)" fill="#8C5A3B" opacity="0.95"/>
          <g fontFamily="'Caveat', cursive" fontWeight="700" fontSize="30" fill="#FFF8EB" textAnchor="middle">
            <text x="1048" y="468">JavaScript</text>
            <text x="1048" y="518">Python</text>
            <text x="1048" y="568">Java</text>
            <text x="1048" y="618">TypeScript</text>
            <text x="1048" y="668">HTML5</text>
            <text x="1048" y="718">CSS3</text>
          </g>

        </svg>
      </div>

      {/* Compact Footer note */}
      <div
        className="relative z-10 flex justify-between items-center shrink-0 pt-0.5 text-[#6B6459] dark:text-[#A69F90] font-bold"
        style={{ fontSize: '0.75rem', letterSpacing: '0.04em', fontFamily: "'Space Mono', monospace" }}
      >
        <span>margin note: still adding leaves —</span>
        <span>page 03</span>
      </div>
    </div>
  );
};

export default SkillTreePage;
