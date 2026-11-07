// Every moment of the intro, in milliseconds after the visitor clicks Start.
// To change the pacing, edit these numbers. Nothing else needs to change.
export const TIMELINE = {
  commandStart: 150,
  commandEnd: 600,
  stepTimes: [650, 850, 1050], // One time for each "[ OK ]" line.
  alertStart: 1300, // The red alert takes over the monitor.
  crackTimes: [1700, 2200, 2700], // One time for each firewall. These land on alarm beats.
  glitchStart: 3200,
  grantedStart: 3500,
  zoomStart: 4300,
  zoomEnd: 5300, // The screen fills the page, and the intro starts fading.
};

// SAFETY: each of these moments flashes the monitor once. To stay comfortable for people
// sensitive to flashing, there must never be more than 3 of them in any one second.
export const FLASH_TIMES = [
  TIMELINE.alertStart,
  ...TIMELINE.crackTimes,
  TIMELINE.glitchStart,
  TIMELINE.grantedStart,
];

// How long the intro takes to fade away, in seconds.
export const FADE_SECONDS = {
  normal: 0.6, // 5.3s + 0.6s = 5.9 seconds from click to desktop.
  skip: 0.25,
  reducedMotion: 0.4,
};

// The zoom starts gently, then rushes forward and settles.
export const ZOOM_EASE = [0.76, 0, 0.24, 1];
