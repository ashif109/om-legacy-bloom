import { useState, useEffect } from "react";

export function GoldParticles({ count = 30 }: { count?: number }) {
  const [parts, setParts] = useState<any[]>([]);

  useEffect(() => {
    setParts(
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
        size: 1 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.6,
        key: i,
      }))
    );
  }, [count]);

  if (parts.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {parts.map((p) => (
        <span
          key={p.key}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: "radial-gradient(circle, #F6C453, transparent 70%)",
            boxShadow: "0 0 10px #F6C453",
            opacity: p.opacity,
            animation: `ember ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
