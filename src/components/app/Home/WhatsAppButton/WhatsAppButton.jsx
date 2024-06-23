import React, { useState } from "react";
import Image from "next/image";
import whatsappImage from "../../../../../public/wp.svg"; //
import hoverImage from "../../../../../public/hover.svg"; //
const WhatsAppButton = () => {
  const [image, setImage] = useState(false);
  const phoneNumber = "+8801775770439";
  const message = "Hello, I have a question!";

  return (
    <a
      onMouseEnter={() => setImage(!image)}
      onMouseLeave={() => setImage(!image)}
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4    z-50"
    >
      <Image
        src={!image ? whatsappImage : hoverImage} // Path to your WhatsApp icon
        alt="WhatsApp"
        width={60}
        height={60}
        className="rounded-full"
      />
    </a>
  );
};

export default WhatsAppButton;
