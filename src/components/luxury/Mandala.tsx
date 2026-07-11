<<<<<<< HEAD
import mandala from "@/assets/mandala.png";
=======
import mandala from "@/assets/mandala.jpg";
>>>>>>> origin/main

export function Mandala({ className = "", size = 720 }: { className?: string; size?: number }) {
  return (
    <div
      className={`pointer-events-none absolute select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div className="absolute inset-0 animate-spin-slow">
        <img src={mandala} alt="" className="h-full w-full object-contain opacity-60 mix-blend-screen" />
      </div>
      <div
        className="absolute inset-0 rounded-full animate-glow-pulse"
        style={{ background: "var(--gradient-radial-gold)" }}
      />
    </div>
  );
}
