// Every moment of the intro, in milliseconds after the visitor clicks Start.
// To change the pacing, edit these numbers. Nothing else needs to change.
export const TIMELINE = {
  commandStart: 250,
  commandEnd: 900,
  stepTimes: [950, 1250, 1550], // One time for each "[ OK ]" line.
  welcomeStart: 1950,
  welcomeEnd: 2300,
  zoomStart: 2600,
  flickerStart: 4300,
  reveal: 4600, // The intro starts fading and whoami starts typing.
};

// How long the intro takes to fade away, in seconds.
export const FADE_SECONDS = {
  normal: 0.4, // 4.6s + 0.4s = 5 seconds from click to site.
  skip: 0.25,
  reducedMotion: 0.4,
};

// The zoom starts gently, speeds up, then settles.
export const ZOOM_EASE = [0.65, 0, 0.35, 1];
