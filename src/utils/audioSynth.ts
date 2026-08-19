// Web Audio API ambient music synthesizer & SpeechSynthesis natural voice manager

const BIRTHDAY_VOICE_TEXT = 
  "Happy Birthday Riya! I hope your special day is filled with lots of happiness, beautiful smiles, and wonderful memories. You deserve all the happiness in the world. Have an amazing birthday!";

let audioCtx: AudioContext | null = null;
let ambientMusicPlaying = false;
let ambientMusicTimeout: number | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle celesta chime / bell sound for magical moments
export function playChimeSound(type: 'sparkle' | 'warm_chord' | 'pop' | 'candle_blow' = 'sparkle') {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'sparkle') {
      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.65);
      });
    } else if (type === 'warm_chord') {
      const freqs = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.05, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.3);
      });
    } else if (type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'candle_blow') {
      // Soft air / breath sound
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.linearRampToValueAtTime(200, now + 0.5);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.55);
    }
  } catch (err) {
    console.warn('Audio chime notice:', err);
  }
}

// Gentle music box synthesizer for soft birthday background music
let melodyStep = 0;
const notes = [
  // Sweet gentle ambient birthday motif notes (in Hz)
  261.63, 261.63, 293.66, 261.63, 349.23, 329.63, // Happy Birthday to you
  261.63, 261.63, 293.66, 261.63, 392.00, 349.23, // Happy Birthday to you
  261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66, // Happy Birthday dear Riya
  466.16, 466.16, 440.00, 349.23, 392.00, 349.23  // Happy Birthday to you
];
const durations = [
  400, 400, 800, 800, 800, 1400,
  400, 400, 800, 800, 800, 1400,
  400, 400, 800, 800, 800, 800, 1400,
  400, 400, 800, 800, 800, 1800
];

function playNextMusicBoxNote() {
  if (!ambientMusicPlaying) return;

  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const freq = notes[melodyStep % notes.length];
    const duration = durations[melodyStep % durations.length];

    // Delicate bell / music-box harmonic tone
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now); // Sweet octave overtone

    // Low, soothing ambient volume (won't overpower voice)
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.022, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (duration / 1000) * 1.5);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + (duration / 1000) * 1.6);
    osc2.stop(now + (duration / 1000) * 1.6);

    melodyStep++;
    ambientMusicTimeout = window.setTimeout(playNextMusicBoxNote, duration * 0.95);
  } catch (err) {
    console.warn('Music box error:', err);
  }
}

export function startAmbientMusic(): boolean {
  try {
    ambientMusicPlaying = true;
    playNextMusicBoxNote();
    return true;
  } catch {
    return false;
  }
}

export function stopAmbientMusic() {
  ambientMusicPlaying = false;
  if (ambientMusicTimeout) {
    clearTimeout(ambientMusicTimeout);
    ambientMusicTimeout = null;
  }
}

export function isAmbientMusicPlaying(): boolean {
  return ambientMusicPlaying;
}

// Select best natural female voice
export function getBestFemaleVoice(): SpeechSynthesisVoice | null {
  if (!('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Prioritize premium/natural female English voices
  const priorityPatterns = [
    /Google UK English Female/i,
    /Samantha/i,
    /Victoria/i,
    /Karen/i,
    /Serena/i,
    /Moira/i,
    /Fiona/i,
    /Jenny/i,
    /Zira/i,
    /Google US English/i,
    /en-US.*Female/i,
    /Female/i,
    /en-US/i,
    /en-GB/i,
    /en/i
  ];

  for (const pattern of priorityPatterns) {
    const matched = voices.find(v => pattern.test(v.name) || pattern.test(v.lang));
    if (matched) return matched;
  }

  return voices[0] || null;
}

export function speakBirthdayWish(
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: unknown) => void
): boolean {
  if (!('speechSynthesis' in window)) {
    if (onError) onError(new Error('SpeechSynthesis not supported'));
    return false;
  }

  try {
    window.speechSynthesis.cancel();

    // Play subtle crystal opening chime
    playChimeSound('warm_chord');

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(BIRTHDAY_VOICE_TEXT);
      currentUtterance = utterance;

      const voice = getBestFemaleVoice();
      if (voice) {
        utterance.voice = voice;
      }

      // Natural, warm, soft delivery parameters
      utterance.rate = 0.90; // Slightly relaxed, caring, emotional tempo
      utterance.pitch = 1.1; // Gentle, cheerful, soft pitch
      utterance.volume = 1.0;

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        // If interrupted, still consider it graceful
        if (e.error !== 'interrupted' && onError) {
          onError(e);
        } else if (onEnd) {
          onEnd();
        }
      };

      window.speechSynthesis.speak(utterance);
    }, 300);

    return true;
  } catch (err) {
    if (onError) onError(err);
    return false;
  }
}

export function stopVoiceSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}
