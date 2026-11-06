// The illustrated room, drawn by hand in SVG. It is split into two drawings because the
// terminal sits between them: the room is behind it and the hooded figure is in front.
// The glow uses gradients instead of blur filters, so it stays smooth during the zoom.
import { motion } from "motion/react";
import { SCENE } from "./sceneLayout.js";

const VIEW_BOX = `0 0 ${SCENE.width} ${SCENE.height}`;

// The outline of the hood, shoulders and back, seen from behind.
const FIGURE_OUTLINE =
  "M650 540 C612 540 578 560 562 600 C548 635 545 680 552 720 " +
  "C556 745 548 765 525 782 C470 815 400 835 350 885 C300 945 285 1200 280 1800 " +
  "L1020 1800 C1015 1200 1000 945 950 885 C900 835 830 815 775 782 " +
  "C752 765 744 745 748 720 C755 680 752 635 738 600 C722 560 688 540 650 540 Z";

export function RoomBackground({ style }) {
  return (
    <motion.svg className="intro-layer" viewBox={VIEW_BOX} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="wall-glow" gradientUnits="userSpaceOnUse" cx="800" cy="390" r="780">
          <stop offset="0" stopColor="#ffb000" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#ffb000" stopOpacity="0.05" />
          <stop offset="1" stopColor="#ffb000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="side-glow" gradientUnits="userSpaceOnUse" cx="1280" cy="390" r="380">
          <stop offset="0" stopColor="#ffb000" stopOpacity="0.09" />
          <stop offset="1" stopColor="#ffb000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="desk-glow" gradientUnits="userSpaceOnUse" cx="850" cy="720" r="560">
          <stop offset="0" stopColor="#ffb000" stopOpacity="0.24" />
          <stop offset="1" stopColor="#ffb000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="desk-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1711" />
          <stop offset="1" stopColor="#070705" />
        </linearGradient>
        <linearGradient id="desk-edge" gradientUnits="userSpaceOnUse" x1="150" y1="0" x2="1450" y2="0">
          <stop offset="0" stopColor="#ffb000" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffb000" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffb000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bezel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f1b14" />
          <stop offset="1" stopColor="#12100c" />
        </linearGradient>
      </defs>

      {/* Light from the monitors falling on the wall. */}
      <rect x="20" y="-390" width="1560" height="1560" fill="url(#wall-glow)" />
      <rect x="900" y="10" width="760" height="760" fill="url(#side-glow)" />

      {/* The desk. */}
      <path d="M-300 700 H1900 V1050 H-300 Z" fill="url(#desk-top)" />
      <rect x="250" y="700" width="1200" height="600" fill="url(#desk-glow)" />
      <path d="M150 700 H1450" stroke="url(#desk-edge)" strokeWidth="2" />

      {/* The second monitor, turned toward the desk. */}
      <path d="M1250 590 L1305 580 L1305 680 L1250 680 Z" fill="#14120d" />
      <ellipse cx="1278" cy="686" rx="82" ry="9" fill="#1a1610" />
      <path d="M1140 240 L1400 180 V615 L1140 565 Z" fill="url(#bezel)" stroke="#3a3121" strokeWidth="1.5" />
      <path d="M1154 254 L1386 202 V594 L1154 550 Z" fill="#0d0b07" />
      <g transform="translate(1172 272) skewY(-12.6)" fill="#ffb000">
        <rect width="150" height="8" opacity="0.5" />
        <rect y="26" width="190" height="8" opacity="0.28" />
        <rect y="52" width="120" height="8" opacity="0.28" />
        <rect x="24" y="78" width="170" height="8" opacity="0.2" />
        <rect x="24" y="104" width="96" height="8" opacity="0.2" />
        <rect y="130" width="190" height="8" opacity="0.28" />
        <rect y="156" width="70" height="8" opacity="0.14" />
        <rect y="182" width="160" height="8" opacity="0.2" />
      </g>

      {/* The main monitor. Its screen uses the site's background colour, so at the
          end of the zoom the screen becomes the page. */}
      <rect x="770" y="590" width="60" height="92" fill="#14120d" />
      <ellipse cx="800" cy="688" rx="120" ry="11" fill="#1c1812" />
      <rect x="480" y="190" width="640" height="400" rx="10" fill="url(#bezel)" stroke="#3f3523" strokeWidth="2" />
      <rect x="500" y="210" width="600" height="360" fill="#0a0a08" />

      {/* The keyboard and mouse, catching a little light. */}
      <rect x="860" y="728" width="240" height="34" rx="4" fill="#15120d" stroke="#4a3c22" strokeWidth="1.5" />
      <path d="M872 739 H1088 M872 751 H1088" stroke="#ffb000" strokeOpacity="0.2" strokeWidth="3" strokeDasharray="10 5" />
      <rect x="1128" y="732" width="24" height="34" rx="11" fill="#15120d" stroke="#4a3c22" strokeWidth="1.5" />
    </motion.svg>
  );
}

export function HoodedFigure({ style }) {
  return (
    <motion.svg className="intro-layer" viewBox={VIEW_BOX} style={style} aria-hidden="true">
      <defs>
        <linearGradient id="figure-fill" gradientUnits="userSpaceOnUse" x1="0" y1="540" x2="0" y2="1500">
          <stop offset="0" stopColor="#0b0a07" />
          <stop offset="1" stopColor="#070705" />
        </linearGradient>
        {/* The light is brightest close to the monitors and fades with distance. */}
        <radialGradient id="rim-light" gradientUnits="userSpaceOnUse" cx="880" cy="500" r="520">
          <stop offset="0" stopColor="#ffc53d" />
          <stop offset="0.55" stopColor="#ffb000" />
          <stop offset="1" stopColor="#7a5400" stopOpacity="0" />
        </radialGradient>
        {/* Lets the lower body melt into the dark, so the light stays up near the screen. */}
        <linearGradient id="figure-fade" gradientUnits="userSpaceOnUse" x1="0" y1="900" x2="0" y2="1250">
          <stop offset="0" stopColor="#070705" stopOpacity="0" />
          <stop offset="1" stopColor="#070705" />
        </linearGradient>
        <clipPath id="figure-shape">
          <path d={FIGURE_OUTLINE} />
        </clipPath>
      </defs>

      {/* The rim light: an amber copy of the figure, covered by darker copies shifted away
          from the monitors. Only a soft crescent stays lit, on the side facing the light. */}
      <path d={FIGURE_OUTLINE} fill="#070705" />
      <g clipPath="url(#figure-shape)">
        <path d={FIGURE_OUTLINE} fill="url(#rim-light)" />
        <path d={FIGURE_OUTLINE} fill="#6b4a06" transform="translate(-3 2)" />
        <path d={FIGURE_OUTLINE} fill="#3a2905" transform="translate(-6 4)" />
        <path d={FIGURE_OUTLINE} fill="#1e1605" transform="translate(-10 7)" />
        <path d={FIGURE_OUTLINE} fill="#120e06" transform="translate(-15 10)" />
        <path d={FIGURE_OUTLINE} fill="url(#figure-fill)" transform="translate(-22 14)" />

        {/* Folds in the hood and fabric, catching a little light. */}
        <g fill="none" stroke="#ffb000" strokeLinecap="round">
          <path d="M655 556 C690 610 700 680 682 748" strokeWidth="2" strokeOpacity="0.2" />
          <path d="M566 742 C610 792 695 796 738 744" strokeWidth="2.5" strokeOpacity="0.28" />
          <path d="M775 800 C745 850 735 910 742 990" strokeWidth="2" strokeOpacity="0.14" />
          <path d="M905 880 C880 960 872 1040 878 1130" strokeWidth="2" strokeOpacity="0.16" />
        </g>
        <rect x="250" y="900" width="800" height="900" fill="url(#figure-fade)" />
      </g>
    </motion.svg>
  );
}
