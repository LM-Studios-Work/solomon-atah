import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'


export const metadata: Metadata = {
  title: 'Research & Publishing, Solomon Atah Pty Ltd',
  description:
    'NinTA Research and Ninta Publishing: building narrative intelligence, institutional critique, and publishing intellectual infrastructure.',
}

/* ─── Detailed SVG Icons ────────────────────────────────────────────────── */

function IconNarrativeAnalysis() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="na-bg" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#f5ece3" />
          <stop offset="60%" stopColor="#e8d5b7" />
          <stop offset="100%" stopColor="#c9a04a" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id="na-orb" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#f5e6c8" />
          <stop offset="55%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#7a5c1e" />
        </radialGradient>
        <radialGradient id="na-node" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#ede0c4" />
          <stop offset="100%" stopColor="#9a6e28" />
        </radialGradient>
        <filter id="na-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#7a5c1e" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* Background circle */}
      <circle cx="48" cy="48" r="46" fill="url(#na-bg)" />
      {/* Outer ring */}
      <circle cx="48" cy="48" r="34" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5" />
      {/* Middle ring */}
      <circle cx="48" cy="48" r="22" fill="none" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.35" />
      {/* Center orb */}
      <circle cx="48" cy="48" r="12" fill="url(#na-orb)" filter="url(#na-shadow)" />
      <circle cx="44" cy="44" r="3" fill="white" fillOpacity="0.4" />
      {/* Orbit nodes */}
      <circle cx="48" cy="14" r="5" fill="url(#na-node)" />
      <circle cx="82" cy="48" r="5" fill="url(#na-node)" />
      <circle cx="48" cy="82" r="5" fill="url(#na-node)" />
      <circle cx="14" cy="48" r="5" fill="url(#na-node)" />
      {/* Diagonal nodes */}
      <circle cx="71" cy="25" r="3.5" fill="url(#na-node)" fillOpacity="0.7" />
      <circle cx="71" cy="71" r="3.5" fill="url(#na-node)" fillOpacity="0.7" />
      <circle cx="25" cy="71" r="3.5" fill="url(#na-node)" fillOpacity="0.7" />
      <circle cx="25" cy="25" r="3.5" fill="url(#na-node)" fillOpacity="0.7" />
      {/* Connecting lines from center to orbit nodes */}
      <line x1="48" y1="36" x2="48" y2="19" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.6" />
      <line x1="60" y1="48" x2="77" y2="48" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.6" />
      <line x1="48" y1="60" x2="48" y2="77" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.6" />
      <line x1="36" y1="48" x2="19" y2="48" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.6" />
    </svg>
  )
}

function IconInstitutionalCulture() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="ic-bg" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#f5ece3" />
          <stop offset="60%" stopColor="#e8d5b7" />
          <stop offset="100%" stopColor="#c9a04a" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id="ic-body" cx="45%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#f0ddb8" />
          <stop offset="55%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#6b4a14" />
        </radialGradient>
        <filter id="ic-shadow">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#7a5c1e" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="48" cy="48" r="46" fill="url(#ic-bg)" />
      {/* Bin body */}
      <rect x="30" y="38" width="36" height="32" rx="3" fill="url(#ic-body)" filter="url(#ic-shadow)" />
      {/* Lid */}
      <rect x="26" y="32" width="44" height="8" rx="3" fill="url(#ic-body)" />
      {/* Handle */}
      <rect x="40" y="26" width="16" height="8" rx="2" fill="none" stroke="#c9a84c" strokeWidth="2.5" />
      {/* Vertical lines on body */}
      <line x1="40" y1="44" x2="40" y2="64" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="48" y1="44" x2="48" y2="64" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="56" y1="44" x2="56" y2="64" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Sheen */}
      <ellipse cx="40" cy="44" rx="5" ry="2.5" fill="white" fillOpacity="0.2" transform="rotate(-20 40 44)" />
    </svg>
  )
}

function IconLetters() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="lt-bg" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#f5ece3" />
          <stop offset="60%" stopColor="#e8d5b7" />
          <stop offset="100%" stopColor="#c9a04a" stopOpacity="0.35" />
        </radialGradient>
        <linearGradient id="lt-env" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0ddb8" />
          <stop offset="50%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#7a5414" />
        </linearGradient>
        <linearGradient id="lt-flap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8c96a" />
          <stop offset="100%" stopColor="#a07828" />
        </linearGradient>
        <filter id="lt-shadow">
          <feDropShadow dx="1" dy="3" stdDeviation="4" floodColor="#7a5c1e" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="48" cy="48" r="46" fill="url(#lt-bg)" />
      {/* Envelope body */}
      <rect x="16" y="34" width="64" height="44" rx="4" fill="url(#lt-env)" filter="url(#lt-shadow)" />
      {/* Flap open */}
      <path d="M16 34 L48 58 L80 34" fill="url(#lt-flap)" stroke="#c9a84c" strokeWidth="0.5" />
      {/* V crease */}
      <path d="M16 78 L44 56" stroke="#a07828" strokeWidth="0.8" strokeOpacity="0.5" />
      <path d="M80 78 L52 56" stroke="#a07828" strokeWidth="0.8" strokeOpacity="0.5" />
      {/* Letter lines inside (visible at top before flap) */}
      <rect x="30" y="42" width="24" height="2.5" rx="1" fill="white" fillOpacity="0.55" />
      <rect x="30" y="47" width="18" height="2" rx="1" fill="white" fillOpacity="0.35" />
      {/* Sheen on flap */}
      <ellipse cx="46" cy="46" rx="12" ry="3" fill="white" fillOpacity="0.15" transform="rotate(-20 46 46)" />
    </svg>
  )
}

function IconAccentological() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="ac-bg" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#f5ece3" />
          <stop offset="60%" stopColor="#e8d5b7" />
          <stop offset="100%" stopColor="#c9a04a" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id="ac-lens" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f5e6c8" />
          <stop offset="55%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#7a5c1e" />
        </radialGradient>
      </defs>
      <circle cx="48" cy="48" r="46" fill="url(#ac-bg)" />
      {/* Magnifier circle */}
      <circle cx="43" cy="42" r="20" fill="none" stroke="url(#ac-lens)" strokeWidth="7" />
      <circle cx="43" cy="42" r="13" fill="url(#ac-bg)" fillOpacity="0.6" />
      {/* Sheen */}
      <circle cx="37" cy="36" r="4" fill="white" fillOpacity="0.3" />
      {/* Handle */}
      <line x1="58" y1="57" x2="74" y2="73" stroke="#c9a84c" strokeWidth="7" strokeLinecap="round" />
      <line x1="58" y1="57" x2="74" y2="73" stroke="#7a5c1e" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.5" />
      {/* Inner crosshair detail */}
      <line x1="43" y1="34" x2="43" y2="50" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="35" y1="42" x2="51" y2="42" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.6" />
    </svg>
  )
}

/* ─── World Map SVG (continents, Africa highlighted) ────────────────────── */
function WorldMapSVG() {
  return (
    <svg
      viewBox="0 0 800 420"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="World map with Africa highlighted"
    >
      <defs>
        <radialGradient id="wm-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#f5ece3" />
          <stop offset="100%" stopColor="#e8d5b7" />
        </radialGradient>
      </defs>
      <rect width="800" height="420" fill="url(#wm-bg)" rx="6" />

      {/* ── North America ── */}
      <path
        d="M 60 60 L 90 55 L 130 50 L 175 58 L 200 75 L 210 100 L 205 130 L 190 155 L 175 175 L 155 185 L 130 190 L 105 185 L 90 170 L 75 150 L 65 120 L 55 90 Z"
        fill="#c9a84c"
        fillOpacity="0.55"
        stroke="#c9a84c"
        strokeWidth="0.5"
      />
      {/* Greenland */}
      <ellipse cx="185" cy="38" rx="30" ry="18" fill="#c9a84c" fillOpacity="0.3" />
      {/* Central America */}
      <path d="M 150 190 L 165 205 L 160 220 L 145 215 L 135 200 Z" fill="#c9a84c" fillOpacity="0.45" />

      {/* ── South America ── */}
      <path
        d="M 155 230 L 185 225 L 210 240 L 225 270 L 230 310 L 215 350 L 190 370 L 165 365 L 145 345 L 130 310 L 130 270 L 140 245 Z"
        fill="#c9a84c"
        fillOpacity="0.55"
        stroke="#c9a84c"
        strokeWidth="0.5"
      />

      {/* ── Europe ── */}
      <path
        d="M 310 40 L 355 38 L 395 48 L 415 65 L 405 88 L 385 100 L 360 105 L 335 100 L 315 85 L 305 65 Z"
        fill="#c9a84c"
        fillOpacity="0.5"
        stroke="#c9a84c"
        strokeWidth="0.5"
      />
      {/* Scandinavia */}
      <path d="M 355 38 L 370 20 L 385 15 L 400 25 L 410 42 L 395 48 Z" fill="#c9a84c" fillOpacity="0.4" />
      {/* UK */}
      <ellipse cx="300" cy="58" rx="10" ry="13" fill="#c9a84c" fillOpacity="0.4" />

      {/* ── Africa ── HIGHLIGHTED in purple */}
      <path
        d="M 330 115 L 375 110 L 415 120 L 440 145 L 450 180 L 445 220 L 430 260 L 400 300 L 370 325 L 345 320 L 320 295 L 305 260 L 300 220 L 305 180 L 315 148 Z"
        fill="#4A1942"
        fillOpacity="0.85"
        stroke="#c9a84c"
        strokeWidth="0.8"
      />
      {/* Madagascar */}
      <ellipse cx="465" cy="280" rx="8" ry="18" fill="#4A1942" fillOpacity="0.6" />

      {/* ── Middle East / Arabian Peninsula ── */}
      <path
        d="M 430 120 L 470 118 L 490 140 L 480 170 L 455 175 L 435 160 L 428 140 Z"
        fill="#c9a84c"
        fillOpacity="0.45"
      />

      {/* ── Asia (simplified) ── */}
      <path
        d="M 470 40 L 560 35 L 640 45 L 700 60 L 730 85 L 720 120 L 690 145 L 650 160 L 600 165 L 550 155 L 505 140 L 480 120 L 470 90 Z"
        fill="#c9a84c"
        fillOpacity="0.5"
        stroke="#c9a84c"
        strokeWidth="0.5"
      />
      {/* Indian subcontinent */}
      <path d="M 560 155 L 590 165 L 600 200 L 575 215 L 555 195 L 548 170 Z" fill="#c9a84c" fillOpacity="0.5" />
      {/* SE Asia */}
      <path d="M 640 155 L 680 160 L 700 185 L 685 200 L 655 190 L 635 170 Z" fill="#c9a84c" fillOpacity="0.45" />
      {/* Japan */}
      <ellipse cx="735" cy="95" rx="10" ry="18" fill="#c9a84c" fillOpacity="0.4" />

      {/* ── Australia ── */}
      <path
        d="M 620 280 L 680 270 L 730 285 L 745 315 L 735 345 L 700 360 L 660 355 L 630 335 L 618 305 Z"
        fill="#c9a84c"
        fillOpacity="0.5"
        stroke="#c9a84c"
        strokeWidth="0.5"
      />
      {/* New Zealand */}
      <ellipse cx="765" cy="355" rx="8" ry="18" fill="#c9a84c" fillOpacity="0.35" />

      {/* ── Russia / Northern Asia ── */}
      <path
        d="M 420 38 L 480 32 L 570 28 L 660 30 L 720 42 L 720 60 L 650 55 L 560 48 L 470 50 L 420 55 Z"
        fill="#c9a84c"
        fillOpacity="0.35"
      />
    </svg>
  )
}

/* ─── Publishing Services Icons ─────────────────────────────────────────── */

function PubIconCircle({ children }: { children: React.ReactNode }) {
  return (
    <div className="shrink-0 w-11 h-11 rounded-full bg-[#2d1229] flex items-center justify-center shadow-sm">
      {children}
    </div>
  )
}

/* ─── Data ──────────────────────────────────────────────────────────────── */

const RESEARCH_SERVICES = [
  {
    id: 'narrative',
    Icon: IconNarrativeAnalysis,
    name: 'Narrative Analysis',
    description:
      'Systematic examination of the stories institutions, governments, and media use to frame reality, identifying structure, intent, and consequence.',
  },
  {
    id: 'culture',
    Icon: IconInstitutionalCulture,
    name: 'Institutional Culture',
    description:
      'Rigorous evaluation of how institutions construct and maintain power through narrative, and where those narratives fracture under scrutiny.',
  },
  {
    id: 'letters',
    Icon: IconLetters,
    name: 'Letters: Despatches',
    description:
      'Curated editorial dispatches from across the African intellectual landscape, delivered to scholars, institutions, and decision-makers.',
  },
  {
    id: 'accentological',
    Icon: IconAccentological,
    name: 'Accentological Signacs',
    description:
      'Diagnostic readings of cultural and linguistic signalling systems that shape public perception and institutional credibility.',
  },
  {
    id: 'network',
    Icon: null, // world map card
    name: 'Network: Sigmatic',
    description:
      'Mapping the connective tissue of idea-networks, tracing how narratives travel, mutate, and accrue authority across institutions.',
  },
]

const PUBLISHING_SERVICES = [
  {
    name: 'Narrative Analysis',
    description:
      'As narrative analysis works assess, communicate language and expressions framing consciousness across domains, relation, socialisation, and key communities.',
    iconPath: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="3" y="4" width="18" height="3" rx="1" fill="#c9a84c" />
        <rect x="3" y="10" width="12" height="2.5" rx="1" fill="#c9a84c" fillOpacity="0.7" />
        <rect x="3" y="15" width="15" height="2.5" rx="1" fill="#c9a84c" fillOpacity="0.7" />
        <rect x="3" y="20" width="9" height="2.5" rx="1" fill="#c9a84c" fillOpacity="0.5" />
      </svg>
    ),
  },
  {
    name: 'Institutional Culture',
    description:
      'Topics emissary concerns data sources and connexions collaborative works on old commissions and policies of assertions.',
    iconPath: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="4" y="12" width="3.5" height="8" rx="0.5" fill="#c9a84c" />
        <rect x="10" y="8" width="3.5" height="12" rx="0.5" fill="#c9a84c" />
        <rect x="16" y="5" width="3.5" height="15" rx="0.5" fill="#c9a84c" />
        <line x1="2" y1="21" x2="22" y2="21" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'Letters, Donations',
    description:
      'Assessment of alliances advisors interpreting professional, its lines and aggregating and compose to so perennial constructions.',
    iconPath: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="2" y="6" width="20" height="14" rx="2" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
        <path d="M2 8 L12 14 L22 8" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Accreditation Urgents',
    description:
      "Registering early underlying instruction's system and solid government process, and more management succinct resources.",
    iconPath: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 2 L14.5 8.5 L21.5 9 L16.5 14 L18.2 21 L12 17.5 L5.8 21 L7.5 14 L2.5 9 L9.5 8.5 Z" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Accord Liveriwork',
    description:
      'Analyses construct and evaluations high resolution balance in/document systems, objectives, transformations, diversity, and priorities.',
    iconPath: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="5" cy="6" r="2.5" fill="#c9a84c" />
        <circle cx="12" cy="12" r="2.5" fill="#c9a84c" />
        <circle cx="19" cy="6" r="2.5" fill="#c9a84c" />
        <circle cx="19" cy="18" r="2.5" fill="#c9a84c" />
        <line x1="5" y1="6" x2="12" y2="12" stroke="#c9a84c" strokeWidth="1.2" />
        <line x1="19" y1="6" x2="12" y2="12" stroke="#c9a84c" strokeWidth="1.2" />
        <line x1="19" y1="6" x2="19" y2="18" stroke="#c9a84c" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    name: 'Network Services',
    description:
      'Assessment of solutions locutions intelligence, technology advancement collections, cohesive skills and organised assess.',
    iconPath: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="5" r="2.5" fill="#c9a84c" />
        <circle cx="5" cy="19" r="2.5" fill="#c9a84c" />
        <circle cx="19" cy="19" r="2.5" fill="#c9a84c" />
        <line x1="12" y1="7.5" x2="5" y2="16.5" stroke="#c9a84c" strokeWidth="1.2" />
        <line x1="12" y1="7.5" x2="19" y2="16.5" stroke="#c9a84c" strokeWidth="1.2" />
        <line x1="5" y1="19" x2="19" y2="19" stroke="#c9a84c" strokeWidth="1.2" />
      </svg>
    ),
  },
]

const BOOKS = [
  {
    title: 'The Narrative Manifesto',
    subtitle: 'How Stories Harm, And What You Can Do About It',
    image: '/company%20resources/book.jpeg',
  },
  {
    title: 'The Marriage Stock Exchange',
    subtitle: 'Why Marriage Was Never About Love',
    image: '/company%20resources/book_2_cover.jpeg',
  },
  {
    title: 'The 48 Laws of Personal Sovereignty',
    subtitle: 'Self Preservation Intelligence',
    image: '/company%20resources/book_3.jpeg',
  },
  {
    title: 'University Dynamics',
    subtitle: null,
    image: '/company%20resources/books_museum.jpeg',
  },
  {
    title: 'The University of Money',
    subtitle: 'Reforming Education From the Inside Out',
    image: '/company%20resources/book_2.jpeg',
  },
]

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function ResearchPage() {
  return (
    <div className="bg-background text-foreground">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#2d1229] border-b border-gold/20">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/company%20resources/africa.jpeg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d1229]/95 via-[#2d1229]/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[68vh]">
            <div className="flex flex-col justify-end pb-16 pt-36">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-5">
                Ninta Publishing
              </p>
              <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-white mb-6 text-pretty">
                Research &amp; Publishing
              </h1>
              <p className="text-lg text-white/75 leading-relaxed max-w-xl">
                Books and research positioned as intellectual infrastructure. We produce knowledge designed not for momentary visibility but for generational continuity.
              </p>
            </div>
            <div className="hidden lg:flex flex-col justify-end pb-16 pt-36 gap-4 items-end">
              <div className="relative w-full max-w-xs rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/company%20resources/ninta.jpeg"
                  alt="NinTA – Narrative Intelligence Africa"
                  width={480}
                  height={260}
                  className="w-full h-52 object-cover"
                  sizes="480px"
                />
              </div>
              <div className="relative w-full max-w-xs rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/company%20resources/africa.jpeg"
                  alt="Minority Views from Africa"
                  width={480}
                  height={200}
                  className="w-full h-44 object-cover"
                  sizes="480px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NINTA RESEARCH ────────────────────────────────────────────────── */}
      <section id="ninta-research" className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

          {/* Intro two-col */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-14">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-4">
                Ninta Research
              </p>
              <h2 className="font-fraunces text-4xl font-light mb-6">NinTA Research</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NinTA, Narrative Intelligence Africa, is the analytical engine of Solomon Atah Pty Ltd. We conduct narrative-focused research for institutions, governments, and organisations seeking to understand and reshape the stories that govern them. Our work bridges academic rigour and strategic application.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Enquire about research collaboration
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
              >
                Enquire about research collaboration →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 relative w-full rounded-sm overflow-hidden shadow-md">
                <Image
                  src="/company%20resources/ninta.jpeg"
                  alt="NinTA – Narrative Intelligence Africa"
                  width={640}
                  height={280}
                  className="w-full h-56 object-cover"
                  sizes="640px"
                />
              </div>
              <div className="relative w-full rounded-sm overflow-hidden shadow-md">
                <Image
                  src="/company%20resources/africa.jpeg"
                  alt="Narrative Intelligence Africa"
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                  sizes="300px"
                />
              </div>
              <div className="relative w-full rounded-sm overflow-hidden shadow-md bg-[#2d1229] flex items-center justify-center p-4">
                <Image
                  src="/company%20resources/logo%20solomon%20atah%20main%20company.jpeg"
                  alt="Solomon Atah"
                  width={160}
                  height={100}
                  className="w-full h-40 object-contain"
                  sizes="160px"
                />
              </div>
            </div>
          </div>

          {/* ── Service cards 3-col grid ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESEARCH_SERVICES.map((service) => {
              /* World-map card */
              if (service.id === 'network') {
                return (
                  <div
                    key={service.id}
                    className="border border-border rounded-sm p-6 hover:border-gold/40 hover:shadow-sm transition-all"
                  >
                    <div className="mb-4 w-full h-32 rounded-sm overflow-hidden">
                      <WorldMapSVG />
                    </div>
                    <h3 className="font-fraunces text-lg mb-3">{service.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                )
              }

              const Icon = service.Icon!
              return (
                <div
                  key={service.id}
                  className="border border-border rounded-sm p-6 hover:border-gold/40 hover:shadow-sm transition-all group"
                >
                  {/* Large detailed icon */}
                  <div className="mb-5 w-20 h-20">
                    <Icon />
                  </div>
                  <h3 className="font-fraunces text-lg mb-3">{service.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED WORKS / NINTA PUBLISHING ────────────────────────────── */}
      <section id="ninta-publishing" className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-4">
              Featured Works
            </p>
            <h2 className="font-fraunces text-4xl font-light mb-4">Ninta Publishing</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Ninta Publishing produces books that function as intellectual infrastructure - ideas built to last, arguments designed to be returned to, frameworks intended for institutional use. We also offer publishing services to academics.
            </p>
          </div>

          {/* Books horizontal scroll */}
          <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="flex gap-5 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory scrollbar-hide">
              {BOOKS.map((book) => (
                <div key={book.title} className="snap-start shrink-0 w-56 md:w-64 group">
                  <div className="relative w-full aspect-[2/3] rounded-sm overflow-hidden shadow-lg mb-3 group-hover:shadow-xl transition-shadow">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="256px"
                    />
                  </div>
                  <h3 className="font-fraunces text-sm leading-snug mb-1">{book.title}</h3>
                  {book.subtitle && (
                    <p className="text-xs text-gold leading-snug">{book.subtitle}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {[0, 1].map((i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-purple' : 'bg-border'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE BOOKS PAIR ────────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            {BOOKS.slice(3).map((book) => (
              <div
                key={book.title}
                className="group relative rounded-sm overflow-hidden shadow-lg aspect-[3/4] hover:shadow-xl transition-shadow cursor-pointer"
              >
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-fraunces text-xl text-white font-semibold leading-tight mb-1">
                    {book.title.toUpperCase()}
                  </p>
                  <p className="text-xs text-white/75 font-medium tracking-wide uppercase">
                    Solomon Attah
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground tracking-widest uppercase">
            Learn More
          </p>
        </div>
      </section>

      {/* ── PUBLISHING SERVICES ───────────────────────────────────────────── */}
      <section id="publishing-services" className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h2 className="font-fraunces text-4xl font-light mb-3">Publishing Services</h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-12">
            We work with academics and scholars to develop, edit, design, and publish works that translate complex scholarship into durable public documents. Enquiries welcome.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Services 3x2 grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-x-8 gap-y-8">
              {PUBLISHING_SERVICES.map((service) => (
                <div key={service.name} className="flex gap-4">
                  <PubIconCircle>{service.iconPath}</PubIconCircle>
                  <div>
                    <h3 className="font-fraunces text-base mb-1.5">{service.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA box */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-sm p-8 sticky top-24">
                <h3 className="font-fraunces text-xl mb-4">Publishing Services</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  We work with academics and scholars to develop, edit, design, and publish works that translate complex scholarship into durable public documents.
                </p>
                <Link href="/contact" className="text-sm text-purple hover:underline block mb-6">
                  Publishing enquiries →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-5 py-3 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
                >
                  Publishing with us...
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION STRIP ─────────────────────────────────────────────────── */}
      <section className="bg-[#2d1229] text-white border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-8">
              Our Approach
            </p>
            <p className="font-fraunces text-3xl md:text-4xl font-light leading-relaxed text-white/90 text-pretty">
              We build ideas that endure, translate complex scholarship into public intelligence, and construct narrative systems that shape institutions rather than merely respond to them.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
