/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Globe, 
  Users, 
  Cpu, 
  ShieldCheck, 
  Network, 
  Megaphone, 
  Lightbulb,
  ArrowRight,
  Award,
  BookOpen,
  Heart,
  ExternalLink,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

type Section = 'aia' | 'public' | 'service';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('aia');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  const ZoomableImage = ({ src, alt, className, aspect }: { src: string; alt: string; className?: string; aspect?: string }) => (
    <div 
      className={`cursor-zoom-in overflow-hidden group relative ${aspect || ''} ${className || ''}`}
      onClick={() => setSelectedImage(src)}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        referrerPolicy="no-referrer" 
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
  );

  const navItems: { id: Section; label: string }[] = [
    { id: 'aia', label: 'AIA' },
    { id: 'public', label: 'Public' },
    { id: 'service', label: 'Service' },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F2ED] font-['Raleway'] selection:bg-[#C0141A] selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 h-16 border-b border-[#1e1e1e] bg-[#080808]/98 backdrop-blur-sm px-6 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full border border-[#C0141A] bg-[#1e1e1e] flex items-center justify-center shrink-0">
            <span className="font-['Cormorant_Garamond'] text-[13px] font-semibold text-[#C0141A] tracking-wider">RA</span>
          </div>
          <div className="font-['Cormorant_Garamond'] text-lg font-light tracking-[0.2em] uppercase">
            Raya <span className="text-[#C0141A] font-semibold">Ani</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex border border-[#1e1e1e]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`text-[10px] font-semibold tracking-[0.22em] uppercase px-6 py-2.5 transition-all border-r border-[#1e1e1e] last:border-r-0 hover:bg-[#1e1e1e] ${
                activeSection === item.id ? 'bg-[#C0141A] text-white' : 'text-[#666] hover:text-[#F5F2ED]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-[#666]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#080808] pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-2xl font-['Cormorant_Garamond'] tracking-widest uppercase text-left pb-2 border-b border-[#1e1e1e] ${
                    activeSection === item.id ? 'text-[#C0141A]' : 'text-[#666]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Lightbox Overlay */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[100] bg-[#080808]/98 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-7xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Zoomed view"
                  className="w-full h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                  referrerPolicy="no-referrer"
                />
                <button 
                  className="absolute -top-12 right-0 md:-right-12 text-[#666] hover:text-white transition-colors p-2"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={32} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ticker */}
        <div className="bg-[#C0141A] py-2 overflow-hidden whitespace-nowrap border-b border-[#8B0000]">
          <div className="inline-block animate-ticker text-[10px] font-semibold tracking-[0.2em] uppercase text-white/90">
            FAIA Fellow &nbsp;·&nbsp; Forbes 50 Over 50: EMEA 2022 &nbsp;·&nbsp; UNESCO Jury President &nbsp;·&nbsp; Takreem Award 2021 &nbsp;·&nbsp; Middle East Architect Power List 2015–2025 &nbsp;·&nbsp; TEDx Baghdad 2022 &nbsp;·&nbsp; AIA International Conference &nbsp;·&nbsp; 100,000+ Global Followers &nbsp;·&nbsp; Liberland Design Winner &nbsp;·&nbsp; MIT Aga Khan Scholar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            FAIA Fellow &nbsp;·&nbsp; Forbes 50 Over 50: EMEA 2022 &nbsp;·&nbsp; UNESCO Jury President &nbsp;·&nbsp; Takreem Award 2021 &nbsp;·&nbsp; Middle East Architect Power List 2015–2025 &nbsp;·&nbsp; TEDx Baghdad 2022 &nbsp;·&nbsp; AIA International Conference &nbsp;·&nbsp; 100,000+ Global Followers &nbsp;·&nbsp; Liberland Design Winner &nbsp;·&nbsp; MIT Aga Khan Scholar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>

        {/* AIA Section */}
        {activeSection === 'aia' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
            {/* Hero */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between p-10 md:p-12 border-b border-[#1e1e1e] gap-8">
              <div className="max-w-2xl">
                <div className="text-[9px] font-semibold tracking-[0.35em] uppercase text-[#C0141A] mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-px bg-[#C0141A]"></span>
                  American Institute of Architects
                </div>
                <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl font-light leading-[1.08] text-[#F5F2ED]">
                  The Architecture of <br /><span className="italic text-[#C8C2B8]">Empowerment</span>
                </h1>
              </div>
              <div className="text-right shrink-0">
                <div className="font-['Cormorant_Garamond'] text-6xl font-light text-[#1c1c1c] leading-none tracking-tighter">AIA</div>
                <div className="text-[9px] tracking-[0.2em] text-[#666] uppercase mt-0.5">Presidential Candidate</div>
              </div>
            </div>

            {/* The Why */}
            <div className="p-10 md:p-12 border-b border-[#1e1e1e] grid md:grid-cols-[1fr_1px_2fr] gap-0">
              <div className="pr-0 md:pr-10 pb-8 md:pb-0">
                <div className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#C0141A] mb-4">The Why</div>
                <h2 className="font-['Cormorant_Garamond'] text-3xl font-light leading-tight">Architects at the Center of <span className="italic">Public Service</span></h2>
              </div>
              <div className="hidden md:block bg-[#1e1e1e]"></div>
              <div className="pl-0 md:pl-10">
                <div className="text-[13px] leading-[1.9] text-[#C8C2B8] space-y-4">
                  <p>
                    "There is a story behind my accent—one shaped by resilience and defined by leadership. I was born in Washington, D.C., but my perspective was forged growing up in Baghdad during the Gulf War. Living through war changes you on a cellular level. It teaches you what it means to feel powerless—and why <strong className="text-[#F5F2ED]">invisibility is dangerous for Architects</strong>."
                  </p>
                  <p>
                    Today I see our profession facing its own challenge of invisibility. Architects carry immense responsibility, yet too often we are absent from the decisions shaping the built environment. I am running for AIA National President because this moment calls for leaders who understand resilience and know how to turn challenges into progress.
                  </p>
                </div>
              </div>
            </div>

            {/* 4-Track System */}
            <div className="p-10 md:p-12">
              <div className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#C0141A] mb-8 flex items-center gap-2.5">
                The 4-Track Architectural Leadership System
                <span className="flex-1 h-px bg-[#1e1e1e]"></span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1e1e1e] border border-[#1e1e1e]">
                {/* Track 1 */}
                <div className="bg-[#080808] p-8">
                  <div className="w-10 h-10 rounded-full bg-[#C0141A]/10 flex items-center justify-center mb-6">
                    <ShieldCheck className="text-[#C0141A]" size={20} />
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-[#C0141A] uppercase mb-2">Track 1</div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-4">Foundation</h3>
                  <div className="text-[11px] text-[#666] uppercase tracking-wider mb-4">Pillar: Trust</div>
                  <ul className="text-[12px] text-[#C8C2B8] leading-relaxed space-y-3">
                    <li>• Ground the profession in clear standards and ethical conduct.</li>
                    <li>• Govern through transparent leadership and accountability.</li>
                    <li>• Enable equitable access to participation and opportunity.</li>
                    <li>• Protect the profession's responsibility to the public.</li>
                  </ul>
                </div>

                {/* Track 2 */}
                <div className="bg-[#080808] p-8">
                  <div className="w-10 h-10 rounded-full bg-[#C0141A]/10 flex items-center justify-center mb-6">
                    <Network className="text-[#C0141A]" size={20} />
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-[#C0141A] uppercase mb-2">Track 2</div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-4">Structure</h3>
                  <div className="text-[11px] text-[#666] uppercase tracking-wider mb-4">Pillar: Practice</div>
                  <ul className="text-[12px] text-[#C8C2B8] leading-relaxed space-y-3">
                    <li>• Connect AIA National, state, and local components.</li>
                    <li>• Coordinate communication to reduce fragmentation.</li>
                    <li>• Support small and mid-sized practices.</li>
                    <li>• Advance shared capability through knowledge systems.</li>
                  </ul>
                </div>

                {/* Track 3 */}
                <div className="bg-[#080808] p-8">
                  <div className="w-10 h-10 rounded-full bg-[#C0141A]/10 flex items-center justify-center mb-6">
                    <Megaphone className="text-[#C0141A]" size={20} />
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-[#C0141A] uppercase mb-2">Track 3</div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-4">Envelope</h3>
                  <div className="text-[11px] text-[#666] uppercase tracking-wider mb-4">Pillar: Voice</div>
                  <ul className="text-[12px] text-[#C8C2B8] leading-relaxed space-y-3">
                    <li>• Lead on public policy and legislative priorities.</li>
                    <li>• Represent the value of architects in housing and climate.</li>
                    <li>• Partner with government and AEC industry stakeholders.</li>
                    <li>• Advance policy frameworks that expand access to work.</li>
                  </ul>
                </div>

                {/* Track 4 */}
                <div className="bg-[#080808] p-8">
                  <div className="w-10 h-10 rounded-full bg-[#C0141A]/10 flex items-center justify-center mb-6">
                    <Cpu className="text-[#C0141A]" size={20} />
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-[#C0141A] uppercase mb-2">Track 4</div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-4">Future Systems</h3>
                  <div className="text-[11px] text-[#666] uppercase tracking-wider mb-4">Pillar: Intelligence</div>
                  <ul className="text-[12px] text-[#C8C2B8] leading-relaxed space-y-3">
                    <li>• Advance digital fluency across the profession.</li>
                    <li>• Integrate AI and emerging technologies into practice.</li>
                    <li>• Apply regenerative and high-performance standards.</li>
                    <li>• Evolve practice and delivery models for the new era.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Leadership Dimensions */}
            <div className="bg-[#141414] p-10 md:p-12 border-y border-[#1e1e1e]">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <div className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#C0141A] mb-6">Visionary Leadership</div>
                  <h4 className="font-['Cormorant_Garamond'] text-2xl font-light mb-4 text-white">Systems of the Future</h4>
                  <p className="text-[13px] leading-relaxed text-[#C8C2B8]">
                    Integrating innovation with regenerative urban models. This includes delivering NYC's first public green school (P.S. 59) and the Liberland master plan, proposing a regenerative urban model for a 7 km² territory.
                  </p>
                </div>
                <div>
                  <div className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#C0141A] mb-6">Institutional Leadership</div>
                  <h4 className="font-['Cormorant_Garamond'] text-2xl font-light mb-4 text-white">A Global AIA Member</h4>
                  <p className="text-[13px] leading-relaxed text-[#C8C2B8]">
                    First woman elected to the AIA Middle East Presidency (2016–2018). Established country representation in Jordan and Iraq. Served as Curator of the AIA International Conference "10,958 Days."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PUBLIC Section */}
        {activeSection === 'public' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between p-10 md:p-12 border-b border-[#1e1e1e] gap-8">
              <div>
                <div className="text-[9px] font-semibold tracking-[0.35em] uppercase text-[#C0141A] mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-px bg-[#C0141A]"></span>
                  A Voice for the Profession
                </div>
                <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl font-light leading-[1.08] text-[#F5F2ED]">
                  Architecture carries<br /><span className="italic text-[#C8C2B8]">responsibilities</span><br />beyond buildings
                </h1>
              </div>
              <div className="text-right shrink-0">
                <div className="font-['Cormorant_Garamond'] text-6xl font-light text-[#1c1c1c] leading-none tracking-tighter">PUB</div>
                <div className="text-[9px] tracking-[0.2em] text-[#666] uppercase mt-0.5">Public Impact & Recognition</div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#1e1e1e]">
              {[
                { num: '128K+', label: 'Global Followers' },
                { num: '2019', label: 'Elevated to FAIA' },
                { num: '10+', label: 'Power List Years' },
                { num: '30+', label: 'Global Speaking' },
              ].map((stat, i) => (
                <div key={i} className="p-6 md:p-8 border-r border-[#1e1e1e] last:border-r-0 text-center">
                  <div className="font-['Cormorant_Garamond'] text-4xl font-light text-[#C0141A] leading-none">{stat.num}</div>
                  <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#666] mt-2">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Journey */}
            <div className="grid md:grid-cols-[1fr_1px_1.6fr] p-10 md:p-12 border-b border-[#1e1e1e]">
              <div className="pr-0 md:pr-10 pb-8 md:pb-0">
                <div className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#C0141A] mb-4">Background</div>
                <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-light leading-tight text-white">A Trajectory of<br /><span className="italic text-[#C8C2B8]">Grit and Excellence</span></h2>
                <div className="aspect-square bg-[#1e1e1e] border border-dashed border-[#2e2e2e] flex flex-col items-center justify-center gap-2 mt-8">
                  <Users className="opacity-20" size={28} />
                  <span className="text-[9px] tracking-widest uppercase text-[#444] font-medium">Portrait Photo</span>
                </div>
              </div>
              <div className="hidden md:block bg-[#1e1e1e]"></div>
              <div className="pl-0 md:pl-10">
                <div className="text-[13px] leading-[1.9] text-[#C8C2B8] space-y-4">
                  <p>
                    While her perspective was forged in the dualities of <strong className="text-white">Washington, D.C. and Baghdad</strong>, Raya Ani's professional life has been defined by the pursuit of excellence across borders. She studied Architectural Engineering at the University of Baghdad, graduating with top honors.
                  </p>
                  <p>
                    Driven by hope larger than fear, she left Iraq alone — working in Germany for $100 a month while painting and selling artwork to sustain her journey. This persistence led to a scholarship through the <strong className="text-white">Aga Khan Program at MIT and Harvard</strong>, where she completed her Master of Science in Architectural Studies.
                  </p>
                  <p>
                    In 2004, she became a licensed architect in the State of New York and a LEED Accredited Professional. Her journey is a testament to the power of resilience in the face of systemic barriers.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-10 md:p-12 border-b border-[#1e1e1e]">
              <div className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#C0141A] mb-8 flex items-center gap-2.5">
                Credentials & Milestones
                <span className="flex-1 h-px bg-[#1e1e1e]"></span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-[#1e1e1e]">
                {[
                  { year: '1984', event: 'University of Baghdad', detail: 'Bachelor of Architectural Engineering — Graduated with honors' },
                  { year: '1992', event: 'MIT — Aga Khan Scholar', detail: 'SMArchS, Master of Science in Architectural Studies — Thesis Graded A' },
                  { year: '2003', event: 'NY State Registration', detail: 'Licensed Architect, State of New York — License # 029503' },
                  { year: '2004', event: 'AIA Affiliation', detail: 'American Institute of Architects — Member, AIA New York' },
                  { year: '2004', event: 'LEED Accreditation', detail: 'LEED Accredited Professional, Member of the USGBC' },
                  { year: '2019', event: 'Elevated to FAIA', detail: 'AIA College of Fellows — Highest membership honor' },
                ].map((item, i) => (
                  <div key={i} className="p-6 border-r border-b border-[#1e1e1e] last:border-r-0 lg:nth-3n:border-r-0">
                    <div className="font-['Cormorant_Garamond'] text-3xl font-light text-[#C0141A] leading-none mb-2">{item.year}</div>
                    <div className="text-[12.5px] font-semibold text-white mb-1.5 tracking-tight">{item.event}</div>
                    <div className="text-[11.5px] text-[#C8C2B8] leading-relaxed">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* SERVICE Section */}
        {activeSection === 'service' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
            {/* Hero */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between p-10 md:p-12 border-b border-[#1e1e1e] gap-8">
              <div className="max-w-2xl">
                <div className="text-[9px] font-semibold tracking-[0.35em] uppercase text-[#C0141A] mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-px bg-[#C0141A]"></span>
                  Leadership Through Practice
                </div>
                <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl font-light leading-[1.08] text-[#F5F2ED]">
                  Three decades of <span className="italic text-[#C8C2B8]">global</span><br />architectural practice
                </h1>
              </div>
              <div className="text-right shrink-0">
                <div className="font-['Cormorant_Garamond'] text-6xl font-light text-[#1c1c1c] leading-none tracking-tighter">SVC</div>
                <div className="text-[9px] tracking-[0.2em] text-[#666] uppercase mt-0.5">30 Years of Service</div>
              </div>
            </div>

            {/* Practice Intro */}
            <div className="p-10 md:p-12 border-b border-[#1e1e1e]">
              <div className="max-w-4xl">
                <p className="text-[14px] md:text-[16px] leading-[1.8] text-[#C8C2B8] mb-8">
                  My work operates across regions, shaped through projects, collaborations, and leadership developed over <strong className="text-white">three decades of practice</strong>. With a physical presence and strategic engagement in <strong className="text-white">New York, Dubai, and India</strong>, I work within a global network connecting <strong className="text-white">North America, the Middle East, Europe, and Asia</strong>.
                </p>
                <div className="aspect-[16/9] bg-[#1e1e1e] border border-[#1e1e1e] overflow-hidden relative group cursor-zoom-in" onClick={() => setSelectedImage('/images/image1.png')}>
                  <img 
                    src="/images/image1.png" 
                    alt="Multiple Spheres of Influence Map" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-[9px] tracking-[0.3em] uppercase text-white/20 font-semibold">Multiple Spheres of Influence</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advancing the Profession */}
            <div className="p-10 md:p-12 border-b border-[#1e1e1e]">
              <div className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#C0141A] mb-12 flex items-center gap-2.5">
                Advancing the Profession
                <span className="flex-1 h-px bg-[#1e1e1e]"></span>
              </div>

              <div className="space-y-20">
                {/* Design Innovation */}
                <div className="grid md:grid-cols-[1fr_2fr] gap-12">
                  <div>
                    <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-4 flex items-center gap-3">
                      <span className="w-2 h-2 bg-[#C0141A]"></span>
                      Design Innovation
                    </h3>
                    <ul className="text-[12.5px] text-[#C8C2B8] space-y-4 leading-relaxed">
                      <li><strong className="text-white">Built Work:</strong> Cultural, institutional, and civic projects grounded in design excellence.</li>
                      <li><strong className="text-white">Competition Work:</strong> International competitions addressing complex cultural and urban questions.</li>
                      <li><strong className="text-white">Selected Work:</strong> NYC Green School (P.S. 59), Seton Hall University, Tsinghua School of Fine Arts, Iraq Pavilion (Expo 2020), Guggenheim Helsinki.</li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <ZoomableImage src="/images/image3.png" alt="PS 59 NYC" aspect="aspect-[4/3]" />
                    <ZoomableImage src="/images/image2.png" alt="Seton Hall University" aspect="aspect-[4/3]" />
                  </div>
                </div>

                {/* Technology & Emerging Systems */}
                <div className="grid md:grid-cols-[1fr_2fr] gap-12">
                  <div>
                    <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-4 flex items-center gap-3">
                      <span className="w-2 h-2 bg-[#C0141A]"></span>
                      Technology & Systems
                    </h3>
                    <ul className="text-[12.5px] text-[#C8C2B8] space-y-4 leading-relaxed">
                      <li><strong className="text-white">AI & Digital Integration:</strong> Application of AI to inform urban density and environmental performance.</li>
                      <li><strong className="text-white">Advanced Fabrication:</strong> Integrating parametric design with large-scale 3D printing.</li>
                      <li><strong className="text-white">Selected Work:</strong> Liberland Master Plan (1st Place), Creek Mosque (3D-printed structural components), Sonic Union Bryant Park.</li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <ZoomableImage src="/images/image5.png" alt="Creek Mosque" aspect="aspect-[4/3]" />
                    <ZoomableImage src="/images/image4.png" alt="Aspire Sports Complex" aspect="aspect-[4/3]" />
                  </div>
                </div>

                {/* Sustainability & Environmental Thinking */}
                <div className="grid md:grid-cols-[1fr_2fr] gap-12">
                  <div>
                    <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-4 flex items-center gap-3">
                      <span className="w-2 h-2 bg-[#C0141A]"></span>
                      Sustainability
                    </h3>
                    <ul className="text-[12.5px] text-[#C8C2B8] space-y-4 leading-relaxed">
                      <li><strong className="text-white">Ecological Design:</strong> Integrated environmental systems responding to climate and context.</li>
                      <li><strong className="text-white">Strategic Resilience:</strong> Master planning focused on environmental and social sustainability.</li>
                      <li><strong className="text-white">Selected Work:</strong> Liberland Master Plan, The Canal Condition (Vietnam), Green Bridge of Baghdad, Al Khor Masterplan.</li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <ZoomableImage src="/images/image7.png" alt="Cultural Hub" aspect="aspect-[4/3]" />
                    <ZoomableImage src="/images/image6.png" alt="Sports Hub" aspect="aspect-[4/3]" />
                  </div>
                </div>

                {/* Global Practice & Strategic Initiatives */}
                <div className="grid md:grid-cols-[1fr_2fr] gap-12">
                  <div>
                    <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-4 flex items-center gap-3">
                      <span className="w-2 h-2 bg-[#C0141A]"></span>
                      Global Practice
                    </h3>
                    <ul className="text-[12.5px] text-[#C8C2B8] space-y-4 leading-relaxed">
                      <li><strong className="text-white">Strategic Leadership:</strong> Leading complex international projects and cultural initiatives.</li>
                      <li><strong className="text-white">Cultural Diplomacy:</strong> Architecture as a tool for international collaboration and representation.</li>
                      <li><strong className="text-white">Selected Work:</strong> Iraq Pavilion (Expo 2020), Bawadi Park, Marshes of Southern Iraq, BF Goodrich.</li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <ZoomableImage src="/images/image10.png" alt="Iraq Pavilion" aspect="aspect-[3/4]" />
                    <ZoomableImage src="/images/image12.png" alt="Bawadi Park" aspect="aspect-[3/4]" />
                    <ZoomableImage src="/images/image8.png" alt="Marshes of Iraq" aspect="aspect-[3/4]" />
                    <ZoomableImage src="/images/image9.png" alt="BF Goodrich" aspect="aspect-[3/4]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Project Spotlight: Iraq Pavilion */}
            <div className="p-10 md:p-12 border-b border-[#1e1e1e] bg-[#0c0c0c]">
              <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-center">
                <div className="space-y-6">
                  <div className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#C0141A]">Project Spotlight</div>
                  <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-5xl font-light text-white leading-tight">
                    Iraq Pavilion — <span className="italic text-[#C8C2B8]">Expo 2020 Dubai</span>
                  </h2>
                  <p className="text-[13px] leading-relaxed text-[#C8C2B8] max-w-xl">
                    A cultural landmark representing the resilience and future of Iraq. The design integrates traditional motifs with modern structural systems, creating a space for global dialogue and cultural exchange.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <ZoomableImage src="/images/image11.png" alt="Iraq Pavilion Timeline" aspect="aspect-video" />
                    <ZoomableImage src="/images/image13.png" alt="Iraq Pavilion Details" aspect="aspect-video" />
                  </div>
                </div>
                <ZoomableImage src="/images/image10.png" alt="Iraq Pavilion Main" aspect="aspect-[3/4]" className="border border-[#1e1e1e]" />
              </div>
            </div>

            {/* 30 Years Timeline */}
            <div className="p-10 md:p-12 border-b border-[#1e1e1e]">
              <div className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#C0141A] mb-12 flex items-center gap-2.5">
                30 Years of Service Timeline
                <span className="flex-1 h-px bg-[#1e1e1e]"></span>
              </div>

              <div className="space-y-12 max-w-5xl">
                <div className="grid md:grid-cols-[140px_1fr] gap-8">
                  <div className="font-['Cormorant_Garamond'] text-2xl text-[#C0141A]">1994–1998</div>
                  <div className="text-[13px] leading-relaxed text-[#C8C2B8]">
                    <strong className="text-white block mb-2 uppercase tracking-wider text-[11px]">Civic, Educational, & Urban Architecture — Boston, MA</strong>
                    Professional formation at Elkus Manfredi Architects, Wood & Zapata, and Ellenzweig Associates. Work included schools, universities, and healthcare facilities.
                  </div>
                </div>

                <div className="grid md:grid-cols-[140px_1fr] gap-8">
                  <div className="font-['Cormorant_Garamond'] text-2xl text-[#C0141A]">1999–2005</div>
                  <div className="text-[13px] leading-relaxed text-[#C8C2B8]">
                    <strong className="text-white block mb-2 uppercase tracking-wider text-[11px]">Institutional & Cultural Architecture — New York City</strong>
                    Perkins + Will — Associate / Senior Designer. University buildings, cultural institutions, and major cultural facilities in China.
                  </div>
                </div>

                <div className="grid md:grid-cols-[140px_1fr] gap-8">
                  <div className="font-['Cormorant_Garamond'] text-2xl text-[#C0141A]">2005–2009</div>
                  <div className="text-[13px] leading-relaxed text-[#C8C2B8]">
                    <strong className="text-white block mb-2 uppercase tracking-wider text-[11px]">Public Realm & Urban Design — New York City</strong>
                    Ehrenkrantz Eckstut & Kuhn Architects — Associate Principal / Design Director. Shaping city infrastructure, waterfronts, and major urban master plans.
                  </div>
                </div>

                <div className="grid md:grid-cols-[140px_1fr] gap-8">
                  <div className="font-['Cormorant_Garamond'] text-2xl text-[#C0141A]">2010–2012</div>
                  <div className="text-[13px] leading-relaxed text-[#C8C2B8]">
                    <strong className="text-white block mb-2 uppercase tracking-wider text-[11px]">International Studio Architecture — Dubai</strong>
                    Design Worldwide Partnership — Head of Architecture / Design Director. Leadership of multidisciplinary studio working on regional master plans across the Middle East.
                  </div>
                </div>

                <div className="grid md:grid-cols-[140px_1fr] gap-8 pt-8 border-t border-[#1e1e1e]">
                  <div className="font-['Cormorant_Garamond'] text-2xl text-[#C0141A]">2012–Present</div>
                  <div className="text-[13px] leading-relaxed text-[#C8C2B8]">
                    <strong className="text-white block mb-2 uppercase tracking-wider text-[11px]">RAW-NYC Architects — Founding Principal</strong>
                    Founded a woman-led practice with offices in New York, Dubai, and India. Advancing architecture and urbanism through hands-on design and practice leadership.
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                      <ZoomableImage src="/images/image14.png" alt="RAW WRAP" aspect="aspect-video" />
                      <ZoomableImage src="/images/image15.png" alt="AIZ Villa" aspect="aspect-video" />
                      <ZoomableImage src="/images/image16.png" alt="AMH Terraces" aspect="aspect-video" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Leadership Block */}
            <div className="p-10 md:p-12 bg-[#141414] border-t border-[#1e1e1e]">
              <div className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#C0141A] mb-12 flex items-center gap-2.5">
                Practice Leadership
                <span className="flex-1 h-px bg-[#1e1e1e]"></span>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-4">Offices: New York, Dubai, India</h3>
                  <p className="text-[13px] leading-relaxed text-[#C8C2B8]">
                    Founded in 2012, RAW-NYC Architects is a woman-led practice that operates as a global design studio. We work across scales, from interior architecture to urban master planning, with a focus on innovation and environmental resilience.
                  </p>
                </div>
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-4">Mentorship & Education</h3>
                  <p className="text-[13px] leading-relaxed text-[#C8C2B8]">
                    Committed to the future of the profession through active mentorship, academic engagement, and leadership development for the next generation of architects.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-12 border-t border-[#1e1e1e] bg-[#080808] text-center">
        <div className="font-['Cormorant_Garamond'] text-2xl font-light tracking-widest uppercase mb-6">
          Raya <span className="text-[#C0141A] font-semibold">Ani</span>
        </div>
        <div className="flex justify-center gap-8 mb-8">
          <a href="#" className="text-[#666] hover:text-white transition-colors"><Globe size={20} /></a>
          <a href="#" className="text-[#666] hover:text-white transition-colors"><Megaphone size={20} /></a>
          <a href="#" className="text-[#666] hover:text-white transition-colors"><Users size={20} /></a>
        </div>
        <p className="text-[10px] tracking-[0.2em] text-[#444] uppercase">
          © 2026 Raya Ani FAIA. All Rights Reserved.
        </p>
      </footer>

      {/* Custom Styles for Ticker Animation */}
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: inline-block;
          animation: ticker 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
