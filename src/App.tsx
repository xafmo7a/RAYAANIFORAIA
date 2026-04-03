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
          <div className="w-9 h-9 rounded-full border border-[#C0141A] bg-[#1e1e1e] overflow-hidden flex items-center justify-center shrink-0">
            <img src="/images/portrait.png" alt="Raya Ani" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
              className={`text-[11px] font-bold tracking-[0.24em] uppercase px-6 py-2.5 transition-all border-r border-[#1e1e1e] last:border-r-0 hover:bg-[#1e1e1e] ${
                activeSection === item.id ? 'bg-[#C0141A] text-white' : 'text-[#888] hover:text-[#F5F2ED]'
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
          <div className="inline-block animate-ticker text-[11px] font-bold tracking-[0.22em] uppercase text-white">
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
                <h2 className="font-['Cormorant_Garamond'] text-3xl font-light leading-tight mb-8">Architects at the Center of <span className="italic">Public Service</span></h2>
                <div className="w-32 h-32 rounded-full border border-[#C0141A] overflow-hidden">
                  <img src="/images/portrait.png" alt="Raya Ani" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="hidden md:block bg-[#1e1e1e]"></div>
              <div className="pl-0 md:pl-10">
                <div className="text-[15px] leading-[1.8] text-[#E5E1DA] font-medium space-y-5">
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
                  <ul className="text-[14px] text-[#E5E1DA] font-medium leading-relaxed space-y-3">
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
                  <ul className="text-[14px] text-[#E5E1DA] font-medium leading-relaxed space-y-3">
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
                  <ul className="text-[14px] text-[#E5E1DA] font-medium leading-relaxed space-y-3">
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
                  <ul className="text-[14px] text-[#E5E1DA] font-medium leading-relaxed space-y-3">
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
                  <p className="text-[15px] leading-relaxed text-[#E5E1DA] font-medium">
                    Integrating innovation with regenerative urban models. This includes delivering NYC's first public green school (P.S. 59) and the Liberland master plan, proposing a regenerative urban model for a 7 km² territory.
                  </p>
                </div>
                <div>
                  <div className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#C0141A] mb-6">Institutional Leadership</div>
                  <h4 className="font-['Cormorant_Garamond'] text-2xl font-light mb-4 text-white">A Global AIA Member</h4>
                  <p className="text-[15px] leading-relaxed text-[#E5E1DA] font-medium">
                    First woman elected to the AIA Middle East Presidency (2016–2018). Established country representation in Jordan and Iraq. Served as Curator of the AIA International Conference "10,958 Days."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PUBLIC Section */}
        {activeSection === 'public' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
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
                  <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#F5F2ED] mt-2">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Journey / Background */}
            <div className="grid md:grid-cols-[1fr_1px_2fr] p-10 md:p-12 border-b border-[#1e1e1e]">
              <div className="pr-0 md:pr-10 pb-8 md:pb-0">
                <div className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#C0141A] mb-4">Background</div>
                <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-light leading-tight text-white">A Trajectory of<br /><span className="italic text-[#C8C2B8]">Grit and Excellence</span></h2>
                <div className="mt-8 space-y-6">
                  <ZoomableImage src="/images/portrait.png" alt="Raya Ani Portrait" aspect="aspect-square" className="border border-[#1e1e1e]" />
                  <ZoomableImage src="/images/image1.png" alt="Credentials Logos" aspect="aspect-[4/1]" className="bg-[#141414] p-4 border border-[#1e1e1e]" />
                </div>
              </div>
              <div className="hidden md:block bg-[#1e1e1e]"></div>
              <div className="pl-0 md:pl-10">
                <div className="text-[15px] leading-[1.8] text-[#E5E1DA] font-medium space-y-5">
                  <p>
                    While my perspective was forged in the dualities of <strong className="text-white">Washington, D.C. and Baghdad</strong>, my professional life has been defined by the pursuit of excellence across borders. My connection to the U.S. capital began while my mother was completing her Master’s degree in Fine Arts at <strong className="text-white">Howard University</strong> and my father was working in the city; at only six months old, I was taken back to Iraq by my parents, where I was raised and eventually studied <strong className="text-white">Architectural Engineering</strong> at the <strong className="text-white">University of Baghdad (1984–1989)</strong>. Graduating with <strong className="text-white">top honors</strong> and gaining two years of early experience at <strong className="text-white">Al-Bayati Architects</strong>, I was prepared for a career in design—but the <strong className="text-white">1991 Gulf War</strong> changed everything on a cellular level, teaching me what it truly means to feel powerless.
                  </p>
                  <p>
                    Driven by a <strong className="text-white">hope larger than my fear</strong>, I left Iraq alone with no financial safety net. I first went to Germany, working at <strong className="text-white">George Kinsky Architect</strong> in Frankfurt for $100 a month while painting and selling my artwork to sustain my journey. Upon arriving in the United States during an economic downturn, I faced the dismissal of my initial degree. Determined to move forward, I accepted an <strong className="text-white">unpaid internship</strong>, approaching even the simplest tasks with seriousness and gratitude.
                  </p>
                  <p>
                    This persistence led to a scholarship through the <strong className="text-white">Aga Khan Program at MIT and Harvard</strong>. At the <strong className="text-white">Massachusetts Institute of Technology (1992–1994)</strong>, I completed my <strong className="text-white">Master of Science in Architectural Studies (SMArchS)</strong>, supporting myself as a teaching and research assistant and working in a café on the department floor. These years extended my focus beyond design into history, theory, and criticism—disciplines that sharpened the <strong className="text-white">strategic approach to architectural leadership</strong> I carry today.
                  </p>
                  <p>
                    In 2004, I became a licensed architect in the State of New York and a LEED Accredited Professional. Those years built the foundation for the public impact that followed.
                  </p>
                </div>
              </div>
            </div>

            {/* Recognition & Stewardship */}
            <div className="p-10 md:p-12 border-b border-[#1e1e1e] bg-[#0c0c0c]">
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div>
                    <div className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#C0141A] mb-4">Recognition</div>
                    <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-white mb-6">Recognition that Advances the Profession</h3>
                    <div className="text-[15px] leading-[1.8] text-[#E5E1DA] font-medium space-y-5">
                      <p>
                        Raya Ani’s contributions to architecture and public life have been recognized through <strong className="text-white">national and international honors</strong> reflecting leadership, professional service, and influence on the built environment. In 2016, she was selected by Cadillac and Black Tomato as one of the most influential global figures.
                      </p>
                      <p>
                        She was elevated to <strong className="text-white">Fellow of the American Institute of Architects (FAIA) in 2019</strong>, one of the highest membership honors. Her work advancing environmental responsibility and civic engagement was recognized with the <strong className="text-white">Takreem Award for Environmental Development and Sustainability in 2021</strong>, and she was named to <strong className="text-white">Forbes 50 Over 50: EMEA in 2022</strong>, recognizing women whose work is shaping global industries and public life.
                      </p>
                      <p>
                        Her leadership has also been acknowledged repeatedly by the architectural press. She has been included in the <strong className="text-white">Middle East Architect Power List across multiple years (2015–2025)</strong>, and recognized among <strong className="text-white">Influential Arab Women in Business (2021)</strong> and with the <strong className="text-white">Middle East Women Leadership Award (2018)</strong>.
                      </p>
                    </div>
                  </div>
                  <ZoomableImage src="/images/image3.png" alt="Awards Collage 1" aspect="aspect-[1.6/1]" className="border border-[#1e1e1e]" />
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#C0141A] mb-4">Stewardship</div>
                    <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-white mb-6">Professional Stewardship of the Discipline</h3>
                    <div className="text-[15px] leading-[1.8] text-[#E5E1DA] font-medium space-y-5">
                      <p>
                        The advancement of architecture also relies on professional stewardship through the evaluation of design excellence and cultural initiatives. Raya Ani has contributed to this role through service on major international juries.
                      </p>
                      <p>
                        She served as <strong className="text-white">Jury President for the UNESCO international competition for the reconstruction of the Al-Nouri Mosque Complex in Mosul (2020)</strong>, an initiative of global cultural and architectural significance. She also served as <strong className="text-white">Jury Chair for the AIA Middle East Design Awards (2019)</strong> and on the jury panel for the Middle East Architect Awards (2019).
                      </p>
                      <p>
                        In 2018, she launched the <strong className="text-white">Zukak & Mahala Initiative</strong>, a community empowerment program focused on rebuilding Iraqi communities and supporting local leadership through architecture and civic engagement.
                      </p>
                    </div>
                  </div>
                  <ZoomableImage src="/images/image2.png" alt="Awards Collage 2" aspect="aspect-[1.6/1]" className="border border-[#1e1e1e]" />
                </div>
              </div>
            </div>

            {/* Public Dialogue & Academic */}
            <div className="p-10 md:p-12 border-b border-[#1e1e1e]">
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div>
                    <div className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#C0141A] mb-4">Dialogue</div>
                    <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-white mb-6">Public Dialogue and Global Forums</h3>
                    <p className="text-[15px] leading-[1.8] text-[#E5E1DA] font-medium mb-5">
                      Architecture evolves through dialogue across disciplines, cultures, and institutions. Raya Ani contributes to international conversations on innovation, sustainability, technology, and the social responsibilities of design through lectures and conferences across the United States, Europe, and the Middle East.
                    </p>
                    <div className="text-[14px] text-[#E5E1DA] font-medium grid grid-cols-2 gap-x-4 gap-y-2">
                      <div>• TEDx Baghdad (2022)</div>
                      <div>• AIA International Conf. (2022)</div>
                      <div>• Global Real Estate Summit (NY/BCN)</div>
                      <div>• Smart Skyscraper Summit (Dubai)</div>
                      <div>• Leaders in Architecture MENA</div>
                      <div>• Harvard Arab Alumni Conference</div>
                      <div>• Cityscape Global (Dubai)</div>
                      <div>• Sustainability Innovation Forum</div>
                    </div>
                  </div>
                  <ZoomableImage src="/images/image5.png" alt="Speaking Engagements" aspect="aspect-[1.6/1]" className="border border-[#1e1e1e]" />
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#C0141A] mb-4">Education</div>
                    <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-white mb-6">Academic Engagement and Mentorship</h3>
                    <p className="text-[15px] leading-[1.8] text-[#E5E1DA] font-medium mb-5">
                      Education plays an important role in shaping future generations of architects. Raya Ani has contributed to architectural education through teaching, research, and academic critique at world-class institutions.
                    </p>
                    <div className="text-[14px] text-[#E5E1DA] font-medium space-y-2">
                      <p><strong className="text-white">Teaching:</strong> MIT (Aga Khan Program), Boston Architectural Center.</p>
                      <p><strong className="text-white">Guest Critic:</strong> Columbia University, Catholic University of America, FIT, New York School of Interior Design, Zayed University.</p>
                      <p><strong className="text-white">Research:</strong> Published in <span className="italic">The Papers</span> (MIT), exploring Iraqi domestic architecture.</p>
                    </div>
                  </div>
                  <ZoomableImage src="/images/image4.png" alt="Academic Experience" aspect="aspect-[1.6/1]" className="border border-[#1e1e1e]" />
                </div>
              </div>
            </div>

            {/* Publications & Media */}
            <div className="p-10 md:p-12 border-b border-[#1e1e1e] bg-[#0c0c0c]">
              <div className="max-w-3xl mb-12">
                <div className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#C0141A] mb-4">Media</div>
                <h3 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-light text-white mb-6">Publications and Media Coverage</h3>
                <p className="text-[15px] leading-[1.9] text-[#E5E1DA] font-medium">
                  Raya Ani’s work and ideas have been featured in international architectural, cultural, and mainstream media, contributing to public understanding of architecture’s role in society. Her projects have been covered by <strong className="text-white">Fast Company, Inhabitat, Grist, Green Prophet, designMENA, Middle East Architect, and Construction Week</strong>. Her perspectives have been discussed in broadcast interviews with <strong className="text-white">BLINX, Dubai TV, NBC, Arab TV, Al Sharqiya, Sky News Arabia, and Abu Dhabi TV</strong>.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <ZoomableImage src="/images/image7.png" alt="Publications Archive" aspect="aspect-[1.6/1]" className="border border-[#1e1e1e]" />
                <ZoomableImage src="/images/image6.png" alt="Media Interviews" aspect="aspect-[1.6/1]" className="border border-[#1e1e1e]" />
              </div>
            </div>

            {/* Press Archive / Indexed References */}
            <div className="p-10 md:p-12">
              <div className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#C0141A] mb-12 flex items-center gap-2.5">
                Indexed References & Press Archive
                <span className="flex-1 h-px bg-[#1e1e1e]"></span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Recognition Links */}
                <div>
                  <h4 className="text-[11px] font-bold tracking-widest uppercase text-white mb-6 border-b border-[#1e1e1e] pb-2">Recognition & Honors</h4>
                  <ul className="text-[13px] text-[#E5E1DA] font-medium space-y-4 leading-relaxed">
                    <li><a href="https://design-middleeast.com/powerlist-influential-30-architects-2024-raya-ani-founder-design-director-raw-nyc-architects/" target="_blank" className="hover:text-[#C0141A] transition-colors">• Powerlist Influential 30 Architects 2024</a></li>
                    <li><a href="https://design-middleeast.com/powerlist-creative-30-2023-raya-ani-founder-and-design-director-raw-nyc-architects/" target="_blank" className="hover:text-[#C0141A] transition-colors">• Powerlist Creative 30 2023</a></li>
                    <li><a href="https://architecture.mit.edu/news/raya-ani-smarchs-94-named-forbes-50-over-50" target="_blank" className="hover:text-[#C0141A] transition-colors">• MIT News: Forbes 50 Over 50</a></li>
                    <li><a href="https://www.forbes.com/sites/maggiemcgrath/2022/01/18/50-over-50-emea-2022/" target="_blank" className="hover:text-[#C0141A] transition-colors">• Forbes 50 Over 50: EMEA 2022</a></li>
                    <li><a href="https://www.takreem.org/raya-al-ani-iraq/" target="_blank" className="hover:text-[#C0141A] transition-colors">• Takreem Award: Environmental Development</a></li>
                  </ul>
                </div>

                {/* Institutional Links */}
                <div>
                  <h4 className="text-[11px] font-bold tracking-widest uppercase text-white mb-6 border-b border-[#1e1e1e] pb-2">Institutional & Professional</h4>
                  <ul className="text-[13px] text-[#E5E1DA] font-medium space-y-4 leading-relaxed">
                    <li><a href="https://www.aiany.org/news/featured-member-raya-ani-faia-leed-ap/" target="_blank" className="hover:text-[#C0141A] transition-colors">• AIA New York: Featured Member</a></li>
                    <li><a href="https://www.aiainternational.org/news-feed/2019/2/27/jury-of-fellows-elevates-3-aia-international-region-members-to-fellowship" target="_blank" className="hover:text-[#C0141A] transition-colors">• AIA International: FAIA Elevation</a></li>
                    <li><a href="https://www.unesco.org/en/articles/architectural-competition-reconstruction-and-rehabilitation-al-nouri-complex-mosul" target="_blank" className="hover:text-[#C0141A] transition-colors">• UNESCO: Al-Nouri Mosque Competition</a></li>
                    <li><a href="https://akpia.mit.edu/akpia-alumni-community-news/" target="_blank" className="hover:text-[#C0141A] transition-colors">• MIT Aga Khan Program Alumni News</a></li>
                  </ul>
                </div>

                {/* Media Links */}
                <div>
                  <h4 className="text-[11px] font-bold tracking-widest uppercase text-white mb-6 border-b border-[#1e1e1e] pb-2">Media & Publications</h4>
                  <ul className="text-[13px] text-[#E5E1DA] font-medium space-y-4 leading-relaxed">
                    <li><a href="https://www.fastcompany.com/3060800/this-self-proclaimed-micronation-has-plans-for-a-car-free-algae-powered-city" target="_blank" className="hover:text-[#C0141A] transition-colors">• Fast Company: Liberland Masterplan</a></li>
                    <li><a href="https://grist.org/cities/stackable-neighborhoods-could-be-the-way-of-the-future-for-cities/" target="_blank" className="hover:text-[#C0141A] transition-colors">• Grist: Future of Cities</a></li>
                    <li><a href="https://inhabitat.com/liberland-may-be-the-worlds-first-sovereign-nation-powered-by-algae/" target="_blank" className="hover:text-[#C0141A] transition-colors">• Inhabitat: Algae-Powered Urbanism</a></li>
                    <li><a href="https://www.middleeastarchitect.com/insight/bringing-the-outside-in" target="_blank" className="hover:text-[#C0141A] transition-colors">• ME Architect: Bringing the Outside In</a></li>
                    <li><a href="https://www.khaleejtimes.com/lifestyle/how-women-architects-are-shaping-the-uaes-design-identity" target="_blank" className="hover:text-[#C0141A] transition-colors">• Khaleej Times: Shaping Design Identity</a></li>
                  </ul>
                </div>
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
                <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#E5E1DA] font-medium mb-10">
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
                    <ul className="text-[14px] text-[#E5E1DA] font-medium space-y-4 leading-relaxed">
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
                    <ul className="text-[14px] text-[#E5E1DA] font-medium space-y-4 leading-relaxed">
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
                    <ul className="text-[14px] text-[#E5E1DA] font-medium space-y-4 leading-relaxed">
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
                    <ul className="text-[14px] text-[#E5E1DA] font-medium space-y-4 leading-relaxed">
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
                  <p className="text-[15px] leading-relaxed text-[#E5E1DA] font-medium max-w-xl">
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
                  <div className="font-['Cormorant_Garamond'] text-3xl text-[#C0141A]">1994–1998</div>
                  <div className="text-[15px] leading-relaxed text-[#E5E1DA] font-medium">
                    <strong className="text-white block mb-2 uppercase tracking-wider text-[11px]">Civic, Educational, & Urban Architecture — Boston, MA</strong>
                    Professional formation at Elkus Manfredi Architects, Wood & Zapata, and Ellenzweig Associates. Work included schools, universities, and healthcare facilities.
                  </div>
                </div>

                <div className="grid md:grid-cols-[140px_1fr] gap-8">
                  <div className="font-['Cormorant_Garamond'] text-3xl text-[#C0141A]">1999–2005</div>
                  <div className="text-[15px] leading-relaxed text-[#E5E1DA] font-medium">
                    <strong className="text-white block mb-2 uppercase tracking-wider text-[11px]">Institutional & Cultural Architecture — New York City</strong>
                    Perkins + Will — Associate / Senior Designer. University buildings, cultural institutions, and major cultural facilities in China.
                  </div>
                </div>

                <div className="grid md:grid-cols-[140px_1fr] gap-8">
                  <div className="font-['Cormorant_Garamond'] text-3xl text-[#C0141A]">2005–2009</div>
                  <div className="text-[15px] leading-relaxed text-[#E5E1DA] font-medium">
                    <strong className="text-white block mb-2 uppercase tracking-wider text-[11px]">Public Realm & Urban Design — New York City</strong>
                    Ehrenkrantz Eckstut & Kuhn Architects — Associate Principal / Design Director. Shaping city infrastructure, waterfronts, and major urban master plans.
                  </div>
                </div>

                <div className="grid md:grid-cols-[140px_1fr] gap-8">
                  <div className="font-['Cormorant_Garamond'] text-3xl text-[#C0141A]">2010–2012</div>
                  <div className="text-[15px] leading-relaxed text-[#E5E1DA] font-medium">
                    <strong className="text-white block mb-2 uppercase tracking-wider text-[11px]">International Studio Architecture — Dubai</strong>
                    Design Worldwide Partnership — Head of Architecture / Design Director. Leadership of multidisciplinary studio working on regional master plans across the Middle East.
                  </div>
                </div>

                <div className="grid md:grid-cols-[140px_1fr] gap-8 pt-8 border-t border-[#1e1e1e]">
                  <div className="font-['Cormorant_Garamond'] text-3xl text-[#C0141A]">2012–Present</div>
                  <div className="text-[15px] leading-relaxed text-[#E5E1DA] font-medium">
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
                  <p className="text-[15px] leading-relaxed text-[#E5E1DA] font-medium">
                    Founded in 2012, RAW-NYC Architects is a woman-led practice that operates as a global design studio. We work across scales, from interior architecture to urban master planning, with a focus on innovation and environmental resilience.
                  </p>
                </div>
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-4">Mentorship & Education</h3>
                  <p className="text-[15px] leading-relaxed text-[#E5E1DA] font-medium">
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
        <p className="text-[11px] tracking-[0.2em] text-[#666] uppercase">
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
