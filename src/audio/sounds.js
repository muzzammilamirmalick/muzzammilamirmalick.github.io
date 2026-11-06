// All of the site's sound effects, made with the Web Audio API instead of audio files.
// Browsers only allow sound after a click or key press, so unlockAudio runs on Start.

const STORAGE_KEY = "portfolio-muted";

let audioContext = null;
let noiseBuffer = null;
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
}

export function unlockAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume();
}

// True only when a sound is allowed to play right now.
function canPlay() {
  return audioContext && !muted;
}

// Builds a very short burst of random noise, once, to reuse for every key click.
function getNoiseBuffer() {
  if (!noiseBuffer) {
    const length = Math.floor(audioContext.sampleRate * 0.03);
    noiseBuffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
    const samples = noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i++) samples[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

// A soft keyboard click: filtered noise that fades out quickly.
// Small random changes stop each click from sounding identical.
export function playClick() {
  if (!canPlay()) return;

  const now = audioContext.currentTime;
  const source = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const volume = audioContext.createGain();

  source.buffer = getNoiseBuffer();
  filter.type = "bandpass";
  filter.frequency.value = 1800 + Math.random() * 1400;
  volume.gain.setValueAtTime(0.05 + Math.random() * 0.03, now);
  volume.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

  source.connect(filter).connect(volume).connect(audioContext.destination);
  source.start(now);
}

// A short, gentle beep. Fading in and out avoids a harsh pop at each end.
export function playBeep() {
  if (!canPlay()) return;

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = 880;
  volume.gain.setValueAtTime(0.0001, now);
  volume.gain.exponentialRampToValueAtTime(0.09, now + 0.015);
  volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

  oscillator.connect(volume).connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.2);
}
