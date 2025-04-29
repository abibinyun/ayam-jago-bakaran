"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const FloatingWhatsAppButton = ({ phone = "6282297463806", message = "Halo Ayam Jago Bakaran! Saya ingin pesan ayam bakar.", position = "bottom-6 right-6", iconSrc = "/wa.png", fallbackSrc = "/placeholder-wa.svg", size = 56 }) => {
  const [imgSrc, setImgSrc] = useState(iconSrc);
  const [showText, setShowText] = useState(false);
  const buttonRef = useRef<any>(null);
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    if (!showText) {
      setShowText(true);
    } else {
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
    }
  };

  // Hide text when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowText(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={buttonRef} onClick={handleClick} className={`fixed ${position} z-50 flex items-center gap-2 w-auto h-[${size}px] cursor-pointer`}>
      {showText && <span className="opacity-100 translate-x-0 transition-all duration-300 bg-white border border-green-600 text-green-700 px-3 py-2 rounded-md font-semibold shadow">Pesan Sekarang</span>}

      <div className="w-[56px] h-[56px] bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300">
        <Image src={imgSrc} alt="WhatsApp Button" width={size - 8} height={size - 8} className="object-contain p-1" onError={() => setImgSrc(fallbackSrc)} />
      </div>
    </div>
  );
};

export default FloatingWhatsAppButton;
