export function TriyambakamLogo({ className = "", size = 44 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 400 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Triangle Outer Frame */}
      <path
        d="M200 24 L375 336 H25 Z"
        stroke="#4A654E"
        strokeWidth="7"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M200 38 L360 326 H40 Z"
        stroke="#C4A962"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
      />

      {/* Water Waves / Roots at Base */}
      <g stroke="#C4A962" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M55 320 Q 95 295, 140 320 T 230 320 T 310 320 T 345 320" />
        <path d="M75 305 Q 115 285, 160 305 T 250 305 T 325 305" />
        <path d="M95 290 Q 135 275, 180 290 T 270 290 T 305 290" />
      </g>

      {/* Tree Trunk & Roots */}
      <path
        d="M175 275 C 182 225, 186 195, 186 175 C 186 145, 214 145, 214 175 C 214 195, 218 225, 225 275 Z"
        fill="#2C4435"
        stroke="#C4A962"
        strokeWidth="3"
      />

      {/* Earth Globe at Center */}
      <circle cx="200" cy="155" r="38" fill="#FAF8F2" stroke="#4A654E" strokeWidth="5" />
      <circle cx="200" cy="155" r="38" stroke="#C4A962" strokeWidth="2.5" fill="none" />

      {/* Globe Continents */}
      <path
        d="M176 145 C 185 135, 195 138, 202 142 C 212 148, 218 140, 228 152 C 220 162, 210 165, 195 160 Z M182 168 C 190 178, 205 182, 218 178 C 226 172, 230 160, 222 165 Z"
        fill="#C4A962"
      />

      {/* Tree Canopy / Arch of Leaves */}
      <g fill="#4A654E" stroke="#2C4435" strokeWidth="2.5">
        {/* Top central leaves */}
        <path d="M200 55 Q 188 78, 200 98 Q 212 78, 200 55 Z" />
        <path d="M184 70 Q 168 88, 190 102 Q 200 86, 184 70 Z" />
        <path d="M216 70 Q 232 88, 210 102 Q 200 86, 216 70 Z" />

        {/* Left branch leaves */}
        <path d="M162 90 Q 140 102, 168 122 Q 178 106, 162 90 Z" />
        <path d="M142 110 Q 120 126, 152 142 Q 162 126, 142 110 Z" />
        <path d="M126 135 Q 104 156, 138 166 Q 148 146, 126 135 Z" />
        <path d="M118 165 Q 96 186, 130 192 Q 140 176, 118 165 Z" />
        <path d="M115 195 Q 92 216, 126 220 Q 136 204, 115 195 Z" />

        {/* Right branch leaves */}
        <path d="M238 90 Q 260 102, 232 122 Q 222 106, 238 90 Z" />
        <path d="M258 110 Q 280 126, 248 142 Q 238 126, 258 110 Z" />
        <path d="M274 135 Q 296 156, 262 166 Q 252 146, 274 135 Z" />
        <path d="M282 165 Q 304 186, 270 192 Q 260 176, 282 165 Z" />
        <path d="M285 195 Q 308 216, 274 220 Q 264 204, 285 195 Z" />
      </g>

      {/* Crescent Moon on right */}
      <path
        d="M265 75 A 14 14 0 0 0 278 92 A 16 16 0 0 1 265 75 Z"
        fill="#C4A962"
      />

      {/* Stars in sky */}
      <circle cx="140" cy="75" r="3" fill="#C4A962" />
      <circle cx="120" cy="95" r="2.5" fill="#C4A962" />
      <circle cx="285" cy="115" r="2.5" fill="#C4A962" />

      {/* Bottom Apex Ornament */}
      <path d="M175 352 L 200 370 L 225 352 L 200 342 Z" fill="#C4A962" stroke="#2C4435" strokeWidth="2" />
    </svg>
  );
}
