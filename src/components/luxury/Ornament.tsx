export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-[color:var(--gold)] ${className}`} aria-hidden>
      <span className="ornament-divider w-24" />
      <svg width="26" height="14" viewBox="0 0 26 14" fill="none" className="opacity-80">
        <path d="M1 7 L10 7 M16 7 L25 7" stroke="currentColor" strokeWidth="1"/>
        <circle cx="13" cy="7" r="3" stroke="currentColor" strokeWidth="1" fill="none"/>
        <circle cx="13" cy="7" r="1" fill="currentColor"/>
      </svg>
      <span className="ornament-divider w-24" />
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">
      <span className="h-px w-6 bg-[color:var(--gold)] opacity-70" />
      {children}
      <span className="h-px w-6 bg-[color:var(--gold)] opacity-70" />
    </div>
  );
}
