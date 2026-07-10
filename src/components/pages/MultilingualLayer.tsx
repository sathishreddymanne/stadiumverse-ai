"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Languages, 
  Sparkles, 
  Mic, 
  Volume2, 
  RefreshCw, 
  Check, 
  HelpCircle,
  VolumeX,
  Loader2,
  ArrowRight,
  Globe
} from "lucide-react";
import { useStadium } from "../../context/StadiumContext";
import { GlassCard } from "../primitives/GlassCard";
import { GradientButton } from "../primitives/GradientButton";
import { multilingualAnnouncements } from "../../data/mockData";

export const MultilingualLayer: React.FC = () => {
  const { language, setLanguage } = useStadium();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(0);
  const [targetLang, setTargetLang] = useState("es");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  
  // Voice detector states
  const [voiceDetected, setVoiceDetected] = useState(false);
  const [detectedLangName, setDetectedLangName] = useState("");
  const [detectedTextOriginal, setDetectedTextOriginal] = useState("");
  const [detectedTextEnglish, setDetectedTextEnglish] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const languagesList = [
    { code: "en", label: "EN", name: "English" },
    { code: "es", label: "ES", name: "Español" },
    { code: "fr", label: "FR", name: "Français" },
    { code: "pt", label: "PT", name: "Português" },
    { code: "de", label: "DE", name: "Deutsch" },
    { code: "ar", label: "AR", name: "العربية" },
    { code: "ja", label: "JA", name: "日本語" },
    { code: "ko", label: "KO", name: "한국어" },
    { code: "hi", label: "HI", name: "हिन्दी" },
    { code: "zh", label: "ZH", name: "中文" }
  ];

  // Perform translation animation
  const handleTranslate = () => {
    setIsTranslating(true);
    setTranslatedText("");
    
    // Fetch from mock multilingual announcments
    const announcement = multilingualAnnouncements[selectedAnnouncement];
    const translationSet = announcement.translations as Record<string, string>;
    const targetText = translationSet[targetLang] || announcement.original;

    setTimeout(() => {
      setIsTranslating(false);
      
      // Simulate typewriter streaming
      const words = targetText.split(" ");
      let currentIdx = 0;
      let streamed = "";
      
      const interval = setInterval(() => {
        if (currentIdx < words.length) {
          streamed += (currentIdx === 0 ? "" : " ") + words[currentIdx];
          setTranslatedText(streamed);
          currentIdx++;
        } else {
          clearInterval(interval);
        }
      }, 50);

    }, 1000);
  };

  // Simulate microphone audio detection
  const handleSimulateVoiceDetection = () => {
    setVoiceDetected(true);
    setDetectedLangName("Listening...");
    setDetectedTextOriginal("");
    setDetectedTextEnglish("");

    const simulations = [
      { lang: "Japanese", original: "すみません、救護室はどこですか？", english: "Excuse me, where is the first aid room?" },
      { lang: "Spanish", original: "Mi boleto no escanea en la puerta A, ¿me puede ayudar?", english: "My ticket won't scan at gate A, can you help me?" },
      { lang: "Arabic", original: "أين تقع مواقف الحافلات الخاصة بالملعب؟", english: "Where are the stadium shuttle bus parking lots located?" },
      { lang: "French", original: "Y a-t-il des options végétaliennes dans ce secteur?", english: "Are there vegan options in this sector?" }
    ];

    const chosen = simulations[Math.floor(Math.random() * simulations.length)];

    setTimeout(() => {
      setDetectedLangName(chosen.lang);
      setDetectedTextOriginal(chosen.original);
      
      setTimeout(() => {
        setDetectedTextEnglish(chosen.english);
      }, 1000);
    }, 1500);
  };

  const handlePlayAudio = () => {
    if (!translatedText) return;
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 2500); // Stop animation after 2.5s
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight">Multilingual Layer</h1>
          <p className="text-xs text-text-secondary font-light mt-1">
            Real-time announcement translations across 10 official languages with voice auto-detection.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Translation Console */}
        <GlassCard className="p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-2">
            <h3 className="font-bold text-xs uppercase text-text-secondary tracking-wider">Announcement Translator</h3>
            <span className="text-[10px] text-accent-blue font-bold uppercase">PA System Sync</span>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold block">Select Active Announcement:</label>
            <div className="space-y-2">
              {multilingualAnnouncements.map((ann, idx) => (
                <button
                  key={ann.id}
                  onClick={() => {
                    setSelectedAnnouncement(idx);
                    setTranslatedText("");
                  }}
                  className={`
                    w-full text-left p-3.5 rounded-xl border transition-all text-xs font-light leading-relaxed cursor-pointer
                    ${selectedAnnouncement === idx 
                      ? "bg-white/[0.03] border-accent-blue/40 text-text-primary" 
                      : "bg-transparent border-white/[0.06] hover:bg-white/[0.01] text-text-secondary"}
                  `}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-accent-purple">Feed Announcement {idx + 1}</span>
                    <span className="text-[9px] text-text-secondary font-mono">{ann.time}</span>
                  </div>
                  {ann.original}
                </button>
              ))}
            </div>
          </div>

          {/* Target Language Grid */}
          <div className="space-y-2 pt-2">
            <label className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold block">Select Target Translation Language:</label>
            <div className="grid grid-cols-5 gap-2">
              {languagesList.filter(l => l.code !== "en").map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setTargetLang(l.code);
                    setTranslatedText("");
                  }}
                  className={`
                    py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer text-center
                    ${targetLang === l.code 
                      ? "bg-accent-blue/10 border-accent-blue/50 text-accent-blue shadow-lg" 
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] text-text-secondary"}
                  `}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.05] flex justify-end">
            <GradientButton 
              onClick={handleTranslate}
              disabled={isTranslating}
              className="px-6 py-2.5 text-xs font-semibold flex items-center gap-1.5"
            >
              {isTranslating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Translating Feed...
                </>
              ) : (
                <>
                  Translate Feed <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </GradientButton>
          </div>

          {/* Translated Output Screen */}
          <AnimatePresence>
            {(translatedText || isTranslating) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-5 rounded-2xl bg-black border border-white/[0.08] relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2 mb-3 text-[9px] uppercase font-bold text-text-secondary">
                  <span>Translation Output ({languagesList.find(l => l.code === targetLang)?.name})</span>
                  <span className="text-accent-blue flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Synchronized</span>
                </div>

                {isTranslating ? (
                  <div className="flex items-center gap-2 text-xs text-text-secondary font-light py-4">
                    <Loader2 className="w-4 h-4 animate-spin text-accent-blue" />
                    <span>Neural translation active...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs text-text-primary leading-relaxed font-light italic">
                      &quot;{translatedText}&quot;
                    </p>
                    
                    <div className="flex justify-between items-center border-t border-white/[0.05] pt-3">
                      <button
                        onClick={handlePlayAudio}
                        disabled={isPlayingAudio}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-[9px] text-accent-blue font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? "animate-bounce text-pink-400" : ""}`} /> 
                        {isPlayingAudio ? "Auditory playback..." : "Simulate Speech"}
                      </button>
                      <span className="text-[8px] text-text-secondary font-mono">Synthesizer Level 1</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        {/* Auto Detect voice simulator */}
        <div className="flex flex-col gap-6">
          
          <GlassCard className="p-5 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-white/[0.05] pb-3">
                <Mic className="w-4 h-4 text-accent-purple" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-secondary">Speech Auto-Detector</h3>
              </div>

              <p className="text-xs text-text-secondary font-light leading-relaxed">
                Click the microphone to simulate a spectator dictating a question at a stadium help kiosk in a foreign language. The system will auto-detect the tongue and translate it immediately.
              </p>

              <button
                onClick={handleSimulateVoiceDetection}
                disabled={detectedLangName === "Listening..."}
                className="w-full flex items-center justify-center gap-2 bg-[#0f0714] hover:bg-[#180d21] border border-pink-500/20 hover:border-pink-500/40 rounded-2xl py-6 transition-all text-xs font-bold text-pink-400 cursor-pointer disabled:opacity-50 shadow-[0_0_15px_rgba(168,85,247,0.05)]"
              >
                <Mic className={`w-6 h-6 ${detectedLangName === "Listening..." ? "animate-pulse text-red-500" : ""}`} />
                {detectedLangName === "Listening..." ? "Voice detected..." : "Simulate Kiosk Speech"}
              </button>

              <AnimatePresence>
                {voiceDetected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-black border border-white/[0.08] space-y-3.5 text-xs leading-normal"
                  >
                    <div>
                      <span className="text-[9px] uppercase font-bold text-accent-purple tracking-wide block">Detected Language</span>
                      <span className="font-bold text-text-primary mt-0.5 block flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-accent-blue animate-spin" style={{ animationDuration: '6s' }} /> {detectedLangName}
                      </span>
                    </div>

                    {detectedTextOriginal && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <span className="text-[9px] uppercase font-bold text-text-secondary tracking-wide block">Original Input Speech</span>
                        <span className="font-light text-text-primary block mt-0.5 italic">&quot;{detectedTextOriginal}&quot;</span>
                      </motion.div>
                    )}

                    {detectedTextEnglish && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-t border-white/[0.05] pt-2"
                      >
                        <span className="text-[9px] uppercase font-bold text-green-400 tracking-wide block">AI English Translation</span>
                        <span className="font-semibold text-text-primary block mt-0.5">&quot;{detectedTextEnglish}&quot;</span>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-[9px] text-text-secondary font-light text-center border-t border-white/[0.04] pt-3 mt-4">
              Auto-Detection supports 48 global dialects
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
};
export default MultilingualLayer;
