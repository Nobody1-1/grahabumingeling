"use client";
import Image from "next/image";
import { useState } from "react";

export default function HouseGallery({ images }: { images: string[] }) {
  // Ensure we have an array and clean up URLs
  const validImages = (Array.isArray(images) ? images : [])
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .map((s) => s.replace(/^@+/, ""))
    .map((s) => s.replace(/^hhttps:\/\//i, "https://"))
    .filter((s) => /^https?:\/\//i.test(s));
  
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  console.log("HouseGallery received images:", images);
  console.log("HouseGallery valid images:", validImages);

  const active = validImages[activeIdx] || "/foto-rumah1.png";

  return (
    <div>
      <div
        className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 cursor-zoom-in"
        onClick={() => setLightbox(true)}
      >
        <Image src={active} alt="Foto rumah" fill className="object-cover" />
      </div>

      {validImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-3">
          {validImages.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-black/5 focus:outline-none ${
                activeIdx === idx ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <Image src={src} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <div className="relative w-full max-w-5xl aspect-[16/10]">
            <Image src={active} alt="Preview" fill className="object-contain" />
            <button
              className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm shadow"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(false);
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


