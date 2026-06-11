"use client";

import { motion } from "framer-motion";

export default function AfricaFingerprint() {
  // Accurate geographic silhouette path of Africa
  const africaPath = `
    M 150 40 
    C 190 35, 240 45, 260 65 
    C 275 80, 295 100, 285 125 
    C 275 145, 245 195, 225 235 
    C 205 275, 190 310, 180 340 
    C 175 340, 170 310, 160 285 
    C 150 260, 140 240, 125 225 
    C 115 215, 100 205, 90 195 
    C 75 180, 50 170, 45 140 
    C 40 100, 70 65, 100 50 
    C 115 42, 130 42, 150 40 
    Z
  `;

  // Concentric ellipses for fingerprint ripples
  const fingerprintRings = [
    { rx: 20, ry: 25, cx: 180, cy: 150, duration: 3 },
    { rx: 35, ry: 45, cx: 180, cy: 155, duration: 4 },
    { rx: 50, ry: 65, cx: 180, cy: 160, duration: 5 },
    { rx: 65, ry: 85, cx: 180, cy: 165, duration: 6 },
    { rx: 80, ry: 105, cx: 180, cy: 170, duration: 7 },
    { rx: 95, ry: 125, cx: 180, cy: 175, duration: 8 },
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
            cx="180"
            cy="150"
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
