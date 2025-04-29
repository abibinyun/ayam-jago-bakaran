"use client";

import Image from "next/image";
import { useState } from "react";

const FloatingWhatsAppButton = ({ phone = "6282297463806", message = "Halo Ayam Jago Bakaran! Saya ingin pesan ayam bakar.", position = "bottom-6 right-6", iconSrc = "/wa.png", fallbackSrc = "/placeholder-wa.svg", size = 56 }) => {
  const [imgSrc, setImgSrc] = useState(iconSrc);
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={`fixed ${position} z-50 flex items-center justify-center w-[${size}px] h-[${size}px] hover:rounded-md hover:bg-green-600 transition-all duration-300`}>
      <p className="px-3 py-2 bg-white rounded-md font-semibold">Pesan Sekarang</p>
      <Image src={imgSrc} alt="WhatsApp Button" width={size} height={size} className="object-contain p-1" onError={() => setImgSrc(fallbackSrc)} />
    </a>
  );
};

export default FloatingWhatsAppButton;
