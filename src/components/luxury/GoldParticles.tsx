import { useState, useEffect } from "react";

export function GoldParticles({ count = 20 }: { count?: number }) {
  const [parts, setParts] = useState<any[]>([]);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const finalCount = isMobile ? Math.min(count, 10) : count;

    setParts(
      Array.from({ length: finalCount }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 12,
        size: 1.5 + Math.random() * 2.5,
        opacity: 0.25 + Math.random() * 0.4,
        key: i,
      }))
    );
  }, [count]);

  if (parts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10" aria-hidden>
      {parts.map((p) => (
        <span
          key={p.key}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "#254932",
            boxShadow: "0 0 6px #254932",
            opacity: p.opacity,
            animation: `ember ${p.duration}s linear ${p.delay}s infinite`,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        />
      ))}
    </div>
  );
}
