"use client";
import { NewsletterCta } from "@/components/newsletter-cta";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { LinesHorizontal, Spikes } from "@/components/decorations";
import { RegistrationModal } from "./components/registration-modal";
import Masonry from "react-masonry-css";
import { useState, useCallback, useEffect } from "react";

// Generate array of image paths with duplicates to reach ~60 images
const generateImagePaths = () => {
  const baseImages = Array.from({ length: 19 }, (_, i) => `/images/summit25/event-photos/${i + 1}.png`);
  // Duplicate images to reach ~60 total
  return [...baseImages, ...baseImages, ...baseImages.slice(0, 23)];
};

export default function SummitPage() {
  const images = generateImagePaths();

  // Modal state for image viewer
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = useCallback((idx: number) => {
    setCurrentIndex(idx);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, showPrev, showNext, closeModal]);

  return (
    <main className="min-h-screen theme-dark bg-[#141416] text-white py-6 sm:py-12 relative">
      <Spikes direction="down" className="absolute top-0 w-full h-48 sm:h-56 opacity-50" />
      <div className="container mx-auto max-w-6xl flex flex-col gap-y-10 sm:gap-y-14 px-4 sm:px-8">
        {/* Hero Section */}
        <section 
          className="flex flex-col items-center text-center rounded-3xl relative overflow-hidden min-h-[480px] sm:min-h-[600px]"
          style={{
            backgroundImage: 'url(/images/summit25/summit-card-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Video Layer */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover rounded-3xl brightness-[0.7] z-[1]"
            src="/images/summit25/summit-card-bg.webm"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30 z-[2] rounded-3xl" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[480px] sm:min-h-[600px] w-full px-4 sm:px-8">
            <Image
              src="/images/summit25/Summit-White.svg"
              alt="Sonic Summit"
              width={400}
              height={200}
              className="h-auto w-[280px] sm:w-[350px] md:w-[400px] mb-12"
              priority
            />
            <div className="flex gap-4 items-center font-medium mb-8 text-base">
              <div className="flex gap-2 items-center">
                Check out the photos from the event!
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full max-w-full">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    placeholder="Get notified on next Events"
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 pr-40 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                  />
                  <button 
                    className="absolute right-2 bg-white text-black font-medium rounded-full w-28 py-1.5 text-sm hover:bg-white/90 transition-colors"
                  >
                    Sign up
                  </button>
                </div>
              </div>
              <RegistrationModal />
            </div>
          </div>
        </section>

        {/* Pinterest-style Masonry Grid */}
        <Masonry
          breakpointCols={{
            default: 4,
            1100: 3,
            700: 2,
            500: 1,
          }}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {images.map((src, index) => (
            <div key={index} className="mb-4 relative group cursor-pointer" onClick={() => openModal(index)}>
              <div className="relative overflow-hidden rounded-lg w-full">
                <img
                  src={src}
                  alt={`Sonic Summit Event Photo ${index + 1}`}
                  className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </Masonry>

        {/* Image Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all">
            <button
              className="absolute top-6 right-8 text-white text-3xl font-bold bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <button
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition"
              onClick={showPrev}
              aria-label="Previous image"
            >
              &#8592;
            </button>
            <img
              src={images[currentIndex]}
              alt={`Sonic Summit Event Photo ${currentIndex + 1}`}
              className="max-h-[92vh] max-w-[98vw] rounded-2xl shadow-2xl border-4 border-white/10 object-contain"
            />
            <button
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition"
              onClick={showNext}
              aria-label="Next image"
            >
              &#8594;
            </button>
          </div>
        )}

        {/* Newsletter Section */}
        <section className="z-10 relative py-6 sm:py-10 pb-64">
          <div className="container mx-auto">
            <NewsletterCta />
          </div>
        </section>
      </div>
      
      <LinesHorizontal direction="up" className="h-40 absolute bottom-0" />
    </main>
  );
}
