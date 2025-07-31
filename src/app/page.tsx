
"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// Import all portfolio images
const portfolioImages = [
  "/portfolio/mod1.jpg",
  "/portfolio/mod2.jpg",
  "/portfolio/ramp1.jpg",
  "/portfolio/ramp2.JPG",
  "/portfolio/ramp3.JPG",
  "/portfolio/side1.jpg",
  "/portfolio/side2.jpg",
  "/portfolio/tred1.jpg",
  "/portfolio/tred2.jpg",
];


export default function Home() {
  // Gallery horizontal auto-scroll logic
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [centerIdx, setCenterIdx] = useState(2); // Start with center image
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-scroll effect (with centerIdx sync)
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    let scrollAmount = 1.2; // px per frame
    let req: number;
    const scrollStep = () => {
      if (!isHovered) {
        gallery.scrollLeft += scrollAmount;
        // Loop back to start if at end
        if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 2) {
          gallery.scrollLeft = 0;
        }
        // Update centerIdx based on scroll position
        const galleryRect = gallery.getBoundingClientRect();
        let minDist = Infinity;
        let minIdx = 2;
        itemRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const imgCenter = rect.left + rect.width / 2;
          const galleryCenter = galleryRect.left + galleryRect.width / 2;
          const dist = Math.abs(imgCenter - galleryCenter);
          if (dist < minDist) {
            minDist = dist;
            minIdx = idx;
          }
        });
        setCenterIdx(minIdx);
      }
      req = requestAnimationFrame(scrollStep);
    };
    req = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(req);
  }, [isHovered]);

  // Remove separate scroll event centerIdx tracker (now handled in auto-scroll)

  // Arrow scroll handlers
  const scrollGallery = (dir: 'left' | 'right') => {
    const imagesPerSet = portfolioImages.slice(2).length;
    const middleSet = 1;
    // Find the current index in the set
    let idxInSet = centerIdx % imagesPerSet;
    let newIdxInSet = dir === 'left' ? idxInSet - 1 : idxInSet + 1;
    if (newIdxInSet < 0) newIdxInSet = imagesPerSet - 1;
    if (newIdxInSet >= imagesPerSet) newIdxInSet = 0;
    const newCenterIdx = middleSet * imagesPerSet + newIdxInSet;
    setCenterIdx(newCenterIdx);
    setTimeout(() => {
      const gallery = galleryRef.current;
      const el = itemRefs.current[newCenterIdx];
      if (gallery && el) {
        const galleryRect = gallery.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const galleryCenter = galleryRect.left + galleryRect.width / 2;
        const elCenter = elRect.left + elRect.width / 2;
        const scrollOffset = elCenter - galleryCenter;
        gallery.scrollBy({ left: scrollOffset, behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col font-sans">
      {/* TOP: Sidebar and Hero Section */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Sidebar Navigation and Title */}
        <aside className="md:w-[40vw] w-full border-t border-l border-white flex flex-col bg-black relative min-h-[500px] md:min-h-[800px]" style={{ boxSizing: 'border-box' }}>
          {/* Main Title Content with border */}
          <section className="flex flex-col justify-center items-center md:items-start flex-1 px-4 sm:px-6 md:px-16 py-8 md:py-0 border border-white border-t-0 border-l-0 border-b-0 border-r-0 md:border-t-0 md:border-l-0 md:border-b-0 md:border-r-0" style={{ minHeight: '320px', margin: '40px 0 0 0' }}>
            <span className="text-xs tracking-widest mb-3 text-gray-300 font-sans uppercase">FASHION MODEL</span>
            <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight mb-8 text-center md:text-left" style={{ fontFamily: 'Playfair Display, Georgia, serif', letterSpacing: '0.04em' }}>
              LISNA<br/>SHAJI
            </h1>
            <a href="#portfolio" className="mt-2 flex items-center gap-2 text-base md:text-lg group font-sans border-b border-white pb-1 hover:opacity-80 transition-all">
              <span>View My Portfolio</span>
              <span className="transition-transform group-hover:translate-x-2 text-xl md:text-2xl">→</span>
            </a>
          </section>
        </aside>
        {/* Hero Images - use two random images */}
        <main className="md:w-[60vw] w-full flex flex-col items-center justify-center bg-black relative p-0 min-h-[400px] md:min-h-[800px]">
          <div className="relative w-[220px] h-[300px] sm:w-[320px] sm:h-[420px] md:w-[480px] md:h-[650px] mt-8 md:mt-0 rounded-lg shadow-lg overflow-hidden z-10 transition-all duration-300">
            <Image
              src={portfolioImages[0]}
              alt="Portfolio Hero 1"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute top-2 right-2 sm:top-[-20px] sm:right-[-20px] md:top-12 md:right-12 w-[100px] h-[140px] sm:w-[160px] sm:h-[200px] md:w-[260px] md:h-[340px] rounded-lg shadow-md overflow-hidden border-4 border-black z-20 transition-all duration-300">
            <Image
              src={portfolioImages[1]}
              alt="Portfolio Hero 2"
              fill
              className="object-cover"
              priority
            />
          </div>
        </main>
      </div>

      {/* BOTTOM: Portfolio Gallery Section (from your screenshot) */}
      <section className="w-full bg-black mt-10 sm:mt-16 md:mt-20 flex flex-col items-center px-1 sm:px-2">
        {/* Top Navigation Arrows and Title */}
        <div className="w-full max-w-7xl flex flex-row justify-between items-center px-1 sm:px-2 md:px-14">
          <h2 className="text-center text-2xl md:text-4xl font-serif font-light tracking-wider w-full" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            HI, I'M LISNA SHAJI
          </h2>
        </div>
        {/* Subtitle */}
        <div className="text-xs sm:text-sm md:text-base text-gray-300 tracking-widest font-light mt-2 mb-6 sm:mb-8 text-center">
          FASHION | EDITORIAL | TRADITIONAL FUSION | Y2K / STREETWEAR
        </div>
        {/* Five-Image Gallery - use 5 unique images, auto-scrollable */}
        <div
          ref={galleryRef}
          className="flex flex-row justify-start items-center gap-1 sm:gap-2 md:gap-4 w-full max-w-7xl overflow-x-auto scrollbar-hide scroll-smooth pb-6 sm:pb-8 hide-scrollbar"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', overflowY: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', minHeight: '160px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Repeat images to simulate endless scroll */}
          {Array.from({ length: 3 }).flatMap((_, repeatIdx) =>
            portfolioImages.slice(2).map((src, idx) => {
              const galleryIdx = repeatIdx * portfolioImages.slice(2).length + idx;
              const isCenter = galleryIdx === centerIdx;
              return (
                <div
                  key={src + '-' + repeatIdx}
                  ref={el => { itemRefs.current[galleryIdx] = el; }}
                  className={`relative rounded-lg overflow-hidden shadow-lg flex-shrink-0 transition-all duration-500 ${isCenter ? 'scale-110 z-20 shadow-2xl border-4 border-[#c4b896]' : 'scale-100 z-10 border-0 opacity-80'}`}
                  style={{
                    width: window.innerWidth < 480 ? 110 : window.innerWidth < 770 ? 140 : 180,
                    height: window.innerWidth < 480 ? 150 : window.innerWidth < 770 ? 180 : 260,
                    marginTop: 0,
                    marginBottom: 0,
                    boxShadow: isCenter ? '0 8px 32px 0 rgba(196,184,150,0.25)' : undefined,
                    transition: 'all 0.5s cubic-bezier(.4,2,.6,1)',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    // Always jump to the middle set for endless illusion
                    const imagesPerSet = portfolioImages.slice(2).length;
                    const middleSet = 1; // 0,1,2 for 3 sets
                    const idxInSet = idx;
                    const newCenterIdx = middleSet * imagesPerSet + idxInSet;
                    setCenterIdx(newCenterIdx);
                    // Scroll the clicked image in the middle set to the center
                    setTimeout(() => {
                      const gallery = galleryRef.current;
                      const el = itemRefs.current[newCenterIdx];
                      if (gallery && el) {
                        const galleryRect = gallery.getBoundingClientRect();
                        const elRect = el.getBoundingClientRect();
                        const galleryCenter = galleryRect.left + galleryRect.width / 2;
                        const elCenter = elRect.left + elRect.width / 2;
                        const scrollOffset = elCenter - galleryCenter;
                        gallery.scrollBy({ left: scrollOffset, behavior: 'smooth' });
                      }
                    }, 0);
                  }}
                >
                  <Image
                    src={src}
                    alt={`Portfolio Gallery ${galleryIdx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 170px"
                    priority={isCenter}
                  />
                </div>
              );
            })
          )}
          
        </div>
      </section>

      {/* BIO/INTRO SECTION */}
      <section className="w-full flex flex-col md:flex-row justify-center items-center gap-0 md:gap-10 py-10 sm:py-16 md:py-20 px-2 sm:px-4 bg-[#e8ebe9]">
        {/* Left: White Card with Title/Text */}
        <div className="w-full md:w-1/2 max-w-xl bg-white rounded-lg shadow-xl p-4 sm:p-8 md:p-12 flex flex-col items-start">
          <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
            I'M LISNA, FASHION<br />
            AND EDITORIAL MODEL
          </h2>
          <p className="text-sm md:text-base text-gray-800 mb-8 leading-relaxed">
            Age: 17<br/>
            Location: Kerala, India<br/>
            Languages: English, Malayalam<br/>
            <br/>
            Active in aesthetic and fashion shoots.<br/>
            Versatile in traditional and Y2K styling.<br/>
            Posing, styling, and creative shoot experience.<br/>
            Comfortable with photo and video content.<br/>
            Walks, expressions, and styling confidence.<br/>
          </p>
          <a href="#bio" className="text-xs text-black underline hover:text-gray-400">Read About My Story &gt;&gt;</a>
        </div>
        {/* Right: Poolside Photo */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-6 sm:mt-8 md:mt-0">
        <div className="relative w-[180px] h-[240px] sm:w-[320px] sm:h-[420px] md:w-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg transition-all duration-300">
          <Image
            src={portfolioImages[7]}
            alt="Poolside Fashion"
            fill
            className="object-cover"
            priority={false}
          />
        </div>
        </div>
      </section>
    {/* STATS SECTION - Poolside with Model Info */}
    <section className="w-full bg-black py-8 sm:py-12 md:py-16 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12">
        {/* Left: Poolside Image */}
        <div className="w-full lg:w-3/5 flex justify-center">
        <div className="relative w-[180px] h-[240px] sm:w-[320px] sm:h-[420px] md:w-[380px] md:h-[500px] lg:w-[450px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl transition-all duration-300">
          <Image
            src={portfolioImages[8]}
            alt="Lisna poolside relaxing"
            fill
            className="object-cover"
            priority={false}
          />
        </div>
        </div>
        {/* Right: Stats Card */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-start">
          <div className="bg-black border border-gray-700 p-3 sm:p-5 md:p-8 lg:p-12 rounded-lg shadow-xl max-w-xs sm:max-w-md w-full flex flex-col">
            {/* Header */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-2 tracking-wider text-center sm:text-left" 
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                HI, I'M LISNA SHAJI
              </h2>
            </div>
            {/* Model Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-200">
              <div><span className="font-semibold text-white">Location:</span> Kerala, India</div>
              <div><span className="font-semibold text-white">Height:</span> 4'11" (150 cm)</div>
              <div><span className="font-semibold text-white">Measurements:</span> 30-26-30 in (76-66-76 cm)</div>
              <div><span className="font-semibold text-white">Shoe Size:</span> EU 35 / UK 3 / US 4</div>
              <div><span className="font-semibold text-white">Hair Color:</span> Black</div>
              <div><span className="font-semibold text-white">Eye Color:</span> Brown</div>
              <div><span className="font-semibold text-white">Skin Tone:</span> Medium</div>
              <div><span className="font-semibold text-white">Body Type:</span> petite (hourglass)</div>
              <div className="sm:col-span-2"><span className="font-semibold text-white">Languages:</span> English, Malayalam</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* LIFESTYLE PORTFOLIO SECTION */}
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 md:mb-12">
          {/* Left: Title and Subtitle */}
          <div className="flex flex-col mb-4 sm:mb-6 md:mb-0">
            <span className="text-xs text-gray-500 tracking-widest mb-2 font-light">VIEW MY PAST WORK</span>
            <h2 className="text-4xl md:text-6xl font-serif text-black tracking-wider" 
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              LIFESTYLE
            </h2>
          </div>
          {/* Right: Portfolio Button and Navigation Arrows */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="bg-[#c4b896] hover:bg-[#b5a885] transition-colors px-4 sm:px-6 py-2 sm:py-3 text-black text-xs tracking-wider font-medium">
              GO TO PORTFOLIO
            </button>
          </div>
        </div>
        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {portfolioImages.slice(0, 4).map((src, idx) => (
            <div
              className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg group"
              key={src}
            >
              <Image
                src={src}
                alt={`Lifestyle photo ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
        {/* Optional: Load More Button */}
        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
          <button className="border border-gray-300 hover:border-gray-500 px-4 sm:px-8 py-2 sm:py-3 text-black text-xs sm:text-sm tracking-wider transition-colors">
            VIEW MORE LIFESTYLE PHOTOS
          </button>
        </div>
      </div>
    </section>
    {/* FOOTER SECTION */}
    <footer className="w-full bg-black text-white text-xs sm:text-sm">
      {/* Top: Photo Strip */}
      {/* Instagram Handle */}
      {/* Bottom: Agency and Contact Info */}
      <div className="bg-gray-100 text-black py-6 sm:py-10 md:py-12 px-2 sm:px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-4 sm:gap-8">
          {/* Left: Agency Information */}
          <div className="flex flex-col">
            <h3 className="text-2xl md:text-3xl font-serif mb-6 tracking-wider" 
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              AGENCY
            </h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Available For</p>
              <p>EMAIL: <a href="mailto:lisnashaji567@gmail.com" className="hover:underline">lisnashaji567@gmail.com</a></p>
              <p className="text-xs text-gray-600 leading-relaxed max-w-md">
                Fashion / Editorial Shoots<br/>
                Cultural / Traditional Campaigns<br/>
                Brand Collaborations and Promotions<br/>
                Content Creation / Reels
              </p>
            </div>
          </div>
          {/* Right: Contact Information */}
          <div className="flex flex-col">
            <h3 className="text-2xl md:text-3xl font-serif mb-6 tracking-wider" 
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              CONTACT
            </h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Lisna Shaji</p>
              <p>EMAIL: <a href="mailto:lisnashaji567@gmail.com" className="hover:underline">lisnashaji567@gmail.com</a></p>
              <p className="text-xs text-gray-600">
                Kerala, India<br/>
                English, Malayalam<br/>
                Petite (hourglass) body type
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Navigation & Socials (Appended) */}
      {/* Footer Bottom Bar - Custom Flex Layout for pixel-perfect match */}
      <div className="w-full bg-black border-t border-gray-800 py-4 sm:py-6 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-8 md:gap-0">
          {/* Links Column */}
          <div className="flex flex-col items-center md:items-start mb-2 sm:mb-4 md:mb-0">
            <h3 className="text-xs font-light tracking-widest mb-2 text-gray-400">LINKS</h3>
            <div className="flex flex-col gap-1 text-[10px] sm:text-xs text-gray-300">
              <a href="#home" className="hover:underline">Home</a>
              <a href="#headshots" className="hover:underline">Headshots</a>
              <a href="#about" className="hover:underline">About Me</a>
              <a href="#blog" className="hover:underline">The Blog</a>
              <a href="#portfolio" className="hover:underline">Portfolio</a>
              <a href="#contact" className="hover:underline">Contact</a>
            </div>
          </div>
          {/* Name Column */}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-white leading-tight text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              LISNA<br/>SHAJI
            </h1>
          </div>
          {/* Socials Column */}
          <div className="flex flex-row gap-2 sm:gap-4 items-center mt-2 sm:mt-4 md:mt-0">
            <a href="#" className="text-white hover:text-gray-300 transition-colors text-xl">
              <span>f</span>
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors text-xl">
              <span>&#x1F4F7;</span>
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors text-xl">
              <span>&#x1F4CC;</span>
            </a>
          </div>
        </div>
        <div className="w-full text-center text-[9px] sm:text-[10px] text-gray-500 mt-2 sm:mt-4">Copyright © 2024 All Rights Reserved</div>
      </div>
    </footer>
    </div>
  );
}
