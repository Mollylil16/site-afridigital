"use client";

import { motion } from "framer-motion";

export default function AfricaFingerprint() {
  // Geographically accurate silhouette path of the African continent
  const africaPath = `
    M 100 40 
    C 130 35, 160 30, 190 30 
    C 210 30, 225 40, 235 45 
    C 245 42, 260 55, 275 60
    C 290 65, 305 70, 310 80
    C 300 95, 290 110, 295 125
    C 305 135, 320 145, 330 160
    C 338 170, 342 185, 335 195
    C 325 205, 315 220, 305 235
    C 290 255, 275 285, 255 315
    C 240 335, 225 355, 205 370
    C 198 375, 190 380, 185 380
    C 180 380, 175 365, 172 350
    C 165 320, 158 290, 150 260
    C 145 245, 135 235, 120 228
    C 105 220, 90 215, 75 210
    C 55 205, 35 195, 25 175
    C 15 155, 12 135, 18 115
    C 22 95, 35 80, 50 70
    C 65 60, 80 50, 100 40
    Z
  `;

  // Concentric ellipses for fingerprint ripples aligned with the new center
  const fingerprintRings = [
    { rx: 20, ry: 25, cx: 175, cy: 165, duration: 3 },
    { rx: 35, ry: 45, cx: 175, cy: 170, duration: 4 },
    { rx: 50, ry: 65, cx: 175, cy: 175, duration: 5 },
    { rx: 65, ry: 85, cx: 175, cy: 180, duration: 6 },
    { rx: 80, ry: 105, cx: 175, cy: 185, duration: 7 },
    { rx: 95, ry: 125, cx: 175, cy: 190, duration: 8 },
  ];

  return (
    <div className="relative w-full max-w-[400px] aspect-[5/6] flex items-center justify-center select-none">
      <svg
        viewBox="0 0 360 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_20px_rgba(245,166,35,0.15)]"
      >
        {/* Outer Africa Silhouette Border (Dashed Scan effect) */}
        <motion.path
          d={africaPath}
          stroke="#F5A623"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 8"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0.3, 0.7, 0.7, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Outer Africa Silhouette Glow (Continuous pulse) */}
        <motion.path
          d={africaPath}
          stroke="#F5A623"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.15"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Masking logic to keep fingerprint ripples bounded inside Africa silhouette */}
        <defs>
          <clipPath id="africa-clip">
            <path d={africaPath} />
          </clipPath>
        </defs>

        {/* Fingerprint concentric loops clipped inside Africa */}
        <g clipPath="url(#africa-clip)">
          {fingerprintRings.map((ring, index) => (
            <motion.ellipse
              key={index}
              cx={ring.cx}
              cy={ring.cy}
              rx={ring.rx}
              ry={ring.ry}
              stroke="#F5A623"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="15 25"
              opacity="0.3"
              animate={{
                rotate: 360,
                opacity: [0.25, 0.45, 0.25],
              }}
              style={{
                transformOrigin: `${ring.cx}px ${ring.cy}px`,
              }}
              transition={{
                duration: ring.duration * 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* Glowing pulse ripples radiating from center */}
          <motion.ellipse
            cx="175"
            cy="165"
            rx="10"
            ry="12"
            stroke="#F5A623"
            strokeWidth="2"
            opacity="0"
            animate={{
              rx: [10, 100],
              ry: [12, 130],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </g>

        {/* Horizontal Laser Scanning Line */}
        <motion.line
          x1="40"
          y1="50"
          x2="320"
          y2="50"
          stroke="url(#laser-gradient)"
          strokeWidth="2"
          initial={{ y: 35, opacity: 0 }}
          animate={{
            y: [35, 300, 35],
            opacity: [0, 0.8, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Laser Gradient Definition */}
        <defs>
          <linearGradient id="laser-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5A623" stopOpacity="0" />
            <stop offset="25%" stopColor="#F5A623" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#F5A623" stopOpacity="1" />
            <stop offset="75%" stopColor="#F5A623" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
