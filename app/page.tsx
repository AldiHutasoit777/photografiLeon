"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ✅ prefix dari env (sudah kita set di next.config.mjs)
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

// ✅ pastikan semua file ada di /public dan nama file/case tepat
const heroImages = [
  `${prefix}/Vagabondo1.jpg`,
  `${prefix}/Neha1.jpg`,
  `${prefix}/Lebih1.jpg`,
  `${prefix}/Vagabondo2.jpg`,
  `${prefix}/Neha2.jpg`,
  `${prefix}/Neha3.jpg`,
  `${prefix}/Vagabondo1.jpg`,
  `${prefix}/Neha1.jpg`,
  `${prefix}/Lebih1.jpg`,
  `${prefix}/Vagabondo2.jpg`,
];

const portfolioImages = [
  { id: 1, src: `${prefix}/Vagabondo1.jpg`, alt: "Portrait Photography", caption: "Editorial Portrait Series", category: "Portrait" },
  { id: 2, src: `${prefix}/Neha1.jpg`, alt: "Architecture Photography", caption: "Urban Minimalism", category: "Architecture" },
  { id: 3, src: `${prefix}/Lebih1.jpg`, alt: "Fashion Photography", caption: "Fashion Editorial", category: "Fashion" },
  { id: 4, src: `${prefix}/Vagabondo2.jpg`, alt: "Street Photography", caption: "Street Stories", category: "Street" },
  { id: 5, src: `${prefix}/Neha2.jpg`, alt: "Fine Art Photography", caption: "Abstract Forms", category: "Fine Art" },
  { id: 6, src: `${prefix}/Neha3.jpg`, alt: "Landscape Photography", caption: "Moody Landscapes", category: "Landscape" },
];

interface LightboxProps {
  images: typeof portfolioImages;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function Lightbox({ images, currentIndex, isOpen, onClose, onNext, onPrev }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      <button onClick={onClose} className="absolute top-6 right-6 text-[#F5F5F5] hover:text-[#C5A572] transition-colors z-10">
        <X size={32} />
      </button>

      <button onClick={onPrev} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#F5F5F5] hover:text-[#C5A572] transition-colors z-10">
        <ChevronLeft size={48} />
      </button>

      <button onClick={onNext} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#F5F5F5] hover:text-[#C5A572] transition-colors z-10">
        <ChevronRight size={48} />
      </button>

      <div className="max-w-7xl max-h-[90vh] relative">
        <Image src={currentImage.src || `${prefix}/placeholder.svg`} alt={currentImage.alt} width={1200} height={800} className="max-w-full max-h-full object-contain" priority />
        <div className="absolute bottom-4 left-4 text-[#F5F5F5]">
          <p className="text-lg font-medium tracking-tight">{currentImage.caption}</p>
          <p className="text-sm text-[#F5F5F5]/70">{currentImage.category}</p>
        </div>
      </div>
    </div>
  );
}

export default function PhotographyPortfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentMinute = new Date().getMinutes();
    setCurrentSlide(currentMinute % heroImages.length);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroImages.length), 7000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % portfolioImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length);
  const handleImageLoad = (id: number) => setImagesLoaded((prev) => ({ ...prev, [id]: true }));

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0B0B0B]/80 backdrop-blur-sm border-b border-[#F5F5F5]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-serif font-semibold tracking-tight">LEON</div>
          <div className="flex space-x-8">
            <a href="#portfolio" className="text-sm tracking-wide luxury-underline hover:text-[#C5A572] transition-colors">
              PORTFOLIO
            </a>
            <a href="#about" className="text-sm tracking-wide luxury-underline hover:text-[#C5A572] transition-colors">
              ABOUT
            </a>
            <a href="#contact" className="text-sm tracking-wide luxury-underline hover:text-[#C5A572] transition-colors">
              CONTACT
            </a>
          </div>
        </div>
      </nav>

      <section ref={heroRef} className="h-screen relative overflow-hidden">
        {/* Slideshow Background */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={cn("absolute inset-0 transition-opacity duration-1000", index === currentSlide ? "opacity-100" : "opacity-0")}
              style={{ transform: prefersReducedMotion ? "none" : `translateY(${scrollY * 0.5}px)` }}>
              <Image src={image || `${prefix}/placeholder.svg`} alt={`Hero slide ${index + 1}`} fill className="object-cover" priority={index === 0} sizes="100vw" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-6 fade-in">
            <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-none text-balance">
              LEON <br />
              <span className="text-[#C5A572]">KARSTEN</span>
            </h1>
            <p className="text-xl md:text-2xl tracking-wide text-[#CFCFCF] max-w-2xl mx-auto leading-relaxed font-light">Capturing moments that transcend the ordinary through the lens of artistic vision</p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-24 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-center text-balance">SELECTED WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {portfolioImages.map((image, index) => (
              <div key={image.id} className="relative aspect-[4/5] overflow-hidden cursor-pointer group" onClick={() => openLightbox(index)}>
                <div className={cn("absolute inset-0 bg-[#121212] animate-pulse transition-opacity duration-300", imagesLoaded[image.id] ? "opacity-0" : "opacity-100")} />
                <Image
                  src={image.src || `${prefix}/placeholder.svg`}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-500 group-hover:brightness-110 group-hover:scale-105"
                  onLoad={() => handleImageLoad(image.id)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <p className="font-serif text-lg font-medium tracking-tight text-[#F5F5F5]">{image.caption}</p>
                  <p className="text-sm text-[#C5A572] font-light tracking-wide">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#0B0B0B]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-balance">ABOUT</h2>
          <div className="space-y-8 text-lg md:text-xl leading-relaxed text-[#CFCFCF] font-light">
            <p>I am a visual storyteller dedicated to capturing the essence of human emotion and the beauty found in everyday moments. My work spans across portrait, fashion, and architectural photography.</p>
            <p>With over a decade of experience, I've had the privilege of working with renowned brands and publications, always striving to create images that resonate on a deeper level.</p>
            <p>My approach is rooted in authenticity and artistic vision, believing that the most powerful photographs are those that tell a story without words.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#121212]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-balance">LET'S CREATE</h2>
          <p className="text-xl md:text-2xl mb-12 text-[#CFCFCF] leading-relaxed font-light">Ready to bring your vision to life? Let's discuss your next project.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:hello@LEON.com"
              className="flex items-center gap-3 px-8 py-4 border border-[#C5A572] text-[#C5A572] hover:bg-[#C5A572] hover:text-[#0B0B0B] transition-all duration-300 tracking-wide font-medium">
              <Mail size={20} /> EMAIL
            </a>
            <a
              href="https://wa.me/1234567890"
              className="flex items-center gap-3 px-8 py-4 border border-[#CFCFCF]/30 text-[#CFCFCF] hover:border-[#CFCFCF] hover:text-[#F5F5F5] transition-all duration-300 tracking-wide font-medium">
              <MessageCircle size={20} /> WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#F5F5F5]/10 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-[#CFCFCF]/60 tracking-wide font-light">© 2025 Leon Karsten. All rights reserved.</p>
        </div>
      </footer>

      {/* Lightbox */}
      <Lightbox images={portfolioImages} currentIndex={currentImageIndex} isOpen={lightboxOpen} onClose={closeLightbox} onNext={nextImage} onPrev={prevImage} />
    </div>
  );
}
