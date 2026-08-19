import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Mic, Play, Pause } from 'lucide-react';
import { 
  startAmbientMusic, 
  stopAmbientMusic, 
  isAmbientMusicPlaying, 
  speakBirthdayWish, 
  stopVoiceSpeech,
  playChimeSound 
} from '../utils/audioSynth';

interface AudioControlsProps {
  isSoundMuted: boolean;
  onToggleSound: () => void;
  variant?: 'header' | 'floating';
}

export function AudioControls({ isSoundMuted, onToggleSound, variant = 'floating' }: AudioControlsProps) {
  const [isMusicActive, setIsMusicActive] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  useEffect(() => {
    return () => {
      stopAmbientMusic();
      stopVoiceSpeech();
    };
  }, []);

  const handleToggleMusic = () => {
    playChimeSound('pop');
    if (isMusicActive) {
      stopAmbientMusic();
      setIsMusicActive(false);
    } else {
      const started = startAmbientMusic();
      setIsMusicActive(started);
    }
  };

  const handleReplayVoice = () => {
    if (isVoicePlaying) {
      stopVoiceSpeech();
      setIsVoicePlaying(false);
      return;
    }

    playChimeSound('sparkle');
    setIsVoicePlaying(true);
    speakBirthdayWish(
      () => setIsVoicePlaying(true),
      () => setIsVoicePlaying(false),
      () => setIsVoicePlaying(false)
    );
  };

  if (variant === 'header') {
    return (
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* 🎵 Music Button */}
        <button
          id="header-music-btn"
          onClick={handleToggleMusic}
          className={`bg-white/60 backdrop-blur-md border border-white/80 rounded-full px-3.5 sm:px-4 py-2 flex items-center space-x-1.5 sm:space-x-2 text-pink-500 text-xs font-medium shadow-sm hover:bg-white/80 transition-all cursor-pointer active:scale-95 ${
            isMusicActive ? 'ring-2 ring-pink-300 bg-white/90 text-pink-600' : ''
          }`}
          title="Play ambient birthday melody"
        >
          <span>🎵</span>
          <span>{isMusicActive ? 'Playing' : 'Music'}</span>
        </button>

        {/* 🎙️ Voice Wish Button */}
        <button
          id="header-voice-btn"
          onClick={handleReplayVoice}
          className={`bg-white/60 backdrop-blur-md border border-white/80 rounded-full px-3.5 sm:px-4 py-2 flex items-center space-x-1.5 sm:space-x-2 text-pink-500 text-xs font-medium shadow-sm hover:bg-white/80 transition-all cursor-pointer active:scale-95 ${
            isVoicePlaying ? 'ring-2 ring-rose-400 bg-white/90 text-rose-600 animate-pulse' : ''
          }`}
          title="Play voice wish"
        >
          <span>🎙️</span>
          <span>{isVoicePlaying ? 'Wish...' : 'Voice'}</span>
        </button>
      </div>
    );
  }

  return (
    <div 
      id="floating-audio-controls"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-2 rounded-full border border-pink-200 shadow-lg shadow-pink-200/40 text-xs font-medium text-pink-800"
    >
      {/* 🎵 Music Toggle */}
      <button
        id="toggle-background-music-btn"
        onClick={handleToggleMusic}
        aria-label={isMusicActive ? "Pause background music" : "Play background music"}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer active:scale-95 ${
          isMusicActive 
            ? 'bg-pink-500 text-white shadow-xs' 
            : 'bg-pink-50 hover:bg-pink-100 text-pink-700'
        }`}
        title="Toggle soft birthday background music"
      >
        <Music className={`w-3.5 h-3.5 ${isMusicActive ? 'animate-bounce' : ''}`} />
        <span>{isMusicActive ? 'Music Playing' : '🎵 Music'}</span>
      </button>

      {/* 🎙️ Voice Wish Replay */}
      <button
        id="replay-voice-wish-btn"
        onClick={handleReplayVoice}
        aria-label="Replay AI Voice Wish"
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer active:scale-95 ${
          isVoicePlaying
            ? 'bg-rose-500 text-white animate-pulse'
            : 'bg-pink-50 hover:bg-pink-100 text-pink-700'
        }`}
        title="Listen to Birthday Voice Wish"
      >
        <Mic className="w-3.5 h-3.5" />
        <span>{isVoicePlaying ? 'Speaking...' : 'Voice Wish'}</span>
      </button>

      {/* 🔊 Master Sound Mute/Unmute */}
      <button
        id="toggle-master-sound-btn"
        onClick={onToggleSound}
        aria-label={isSoundMuted ? "Unmute all sound" : "Mute all sound"}
        className="p-1.5 rounded-full hover:bg-pink-100 text-pink-700 transition-all cursor-pointer active:scale-95"
        title={isSoundMuted ? "Unmute Sound" : "Mute Sound"}
      >
        {isSoundMuted ? (
          <VolumeX className="w-4 h-4 text-pink-400" />
        ) : (
          <Volume2 className="w-4 h-4 text-pink-600" />
        )}
      </button>
    </div>
  );
}
