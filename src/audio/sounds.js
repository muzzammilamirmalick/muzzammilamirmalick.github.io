// All of the site's sound effects, made with the Web Audio API instead of audio files.
// Browsers only allow sound after a click or key press, so unlockAudio runs on the first one.

const STORAGE_KEY = "portfolio-muted";

let audioContext = null;
let masterVolume = null; // Every sound goes through this, so mute silences them all at once.
let noiseBuffer = null;
let risingTone = null; // The long ACCESS GRANTED tone, kept so Skip can stop it.
let muted = readSavedChoice();

// Browsers can block localStorage, so these two helpers must never crash the site.
function readSavedChoice() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function saveChoice(value) {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // Nothing to do. The button still works until the page is closed.
  }
}

export function isMuted() {
  return muted;
}

export function setMuted(value) {
  muted = value;
  saveChoice(value);
  // This also silences anything that is already playing.
  if (masterVolume) masterVolume.gain.value = value ? 0 : 1;
}

export function unlockAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  if (!audioContext) {
    audioContext = new AudioContextClass();
    masterVolume = audioContext.createGain();
    masterVolume.gain.value = muted ? 0 : 1;
    masterVolume.connect(audioContext.destination);
  }
  if (audioContext.state === "suspended") audioContext.resume();
}

// True only when a sound is allowed to play right now.
function canPlay() {
  return audioContext && !muted;
}

// Builds a short burst of random noise, once, to reuse for clicks, cracks and glitches.
function getNoiseBuffer() {
  if (!noiseBuffer) {
    const length = Math.floor(audioContext.sampleRate * 0.4);
    noiseBuffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
    const samples = noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i++) samples[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

// Plays noise through a filter, and returns its volume so the caller can shape it.
function playNoise(filterType, frequency, seconds) {
  const now = audioContext.currentTime;
  const source = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const volume = audioContext.createGain();
  source.buffer = getNoiseBuffer();
  filter.type = filterType;
  filter.frequency.value = frequency;
  source.connect(filter).connect(volume).connect(masterVolume);
  source.start(now);
  source.stop(now + seconds);
  return { volume, now };
}

// Plays one steady note, with a quick fade in and out to avoid a harsh pop.
function playTone(type, startHz, endHz, seconds, loudness) {
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(startHz, now);
  oscillator.frequency.exponentialRampToValueAtTime(endHz, now + seconds);
  volume.gain.setValueAtTime(0.0001, now);
  volume.gain.exponentialRampToValueAtTime(loudness, now + 0.015);
  volume.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
  oscillator.connect(volume).connect(masterVolume);
  oscillator.start(now);
  oscillator.stop(now + seconds + 0.02);
}

// A soft keyboard click. Small random changes stop each one from sounding identical.
export function playClick() {
  if (!canPlay()) return;
  const { volume, now } = playNoise("bandpass", 1800 + Math.random() * 1400, 0.03);
  volume.gain.setValueAtTime(0.05 + Math.random() * 0.03, now);
  volume.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
}

// A short, gentle beep.
export function playBeep() {
  if (!canPlay()) return;
  playTone("sine", 880, 880, 0.18, 0.09);
}

// The alert: a low pulse that drops in pitch, like an alarm heard through a wall.
export function playAlarm() {
  if (!canPlay()) return;
  playTone("triangle", 150, 85, 0.3, 0.2);
}

// A firewall cracking: a sharp snap with a little weight under it.
export function playCrack() {
  if (!canPlay()) return;
  const { volume, now } = playNoise("highpass", 1400, 0.12);
  volume.gain.setValueAtTime(0.16, now);
  volume.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  playTone("square", 180, 60, 0.09, 0.05);
}

// The glitch: noise that stutters on and off for a moment.
export function playGlitch() {
  if (!canPlay()) return;
  const { volume, now } = playNoise("bandpass", 2600, 0.3);
  [0.1, 0, 0.12, 0, 0.07, 0.11, 0, 0.09].forEach((level, index) => {
    volume.gain.setValueAtTime(level, now + index * 0.035);
  });
  volume.gain.setValueAtTime(0, now + 0.28);
}

// ACCESS GRANTED: one note that climbs through the zoom.
export function playRisingTone(seconds) {
  if (!canPlay()) return;
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();
  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(180, now);
  oscillator.frequency.exponentialRampToValueAtTime(1100, now + seconds);
  volume.gain.setValueAtTime(0.0001, now);
  volume.gain.exponentialRampToValueAtTime(0.045, now + 0.12);
  volume.gain.setValueAtTime(0.045, now + seconds - 0.25);
  volume.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
  oscillator.connect(volume).connect(masterVolume);
  oscillator.start(now);
  oscillator.stop(now + seconds + 0.02);
  risingTone = oscillator;
}

// Used by Skip, so the tone doesn't keep playing after the intro has gone.
export function stopRisingTone() {
  try {
    risingTone?.stop();
  } catch {
    // It had already finished, which is fine.
  }
  risingTone = null;
}

// Windows make a soft blip: rising when they open, falling when they close.
export function playWindowOpen() {
  if (!canPlay()) return;
  playTone("sine", 420, 720, 0.11, 0.045);
}

export function playWindowClose() {
  if (!canPlay()) return;
  playTone("sine", 620, 340, 0.1, 0.04);
}
