import { useEffect } from "react";

const DarkLayout = ({ children }) => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const buffer = new Uint32Array(imageData.data.buffer);

    for (let i = 0; i < buffer.length; i++) {
      const val = Math.random() * 255;
      buffer[i] =
        (255 << 24) | // alpha
        (val << 16) | // red
        (val << 8) | // green
        val; // blue
    }

    ctx.putImageData(imageData, 0, 0);
    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.opacity = "0.03";
    canvas.style.mixBlendMode = "screen";
    canvas.style.zIndex = "0";

    document.body.appendChild(canvas);

    return () => {
      document.body.removeChild(canvas);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0e0e0e] to-[#1a1a1a] text-white">
      <div className="relative z-10 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default DarkLayout;
