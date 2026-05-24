import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../../store/useThemeStore';
import { themes } from '../../config/themes';
import { Palette, Sun, Zap, Save, ChevronLeft, LayoutTemplate } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function CustomizationPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'themes' | 'materials' | 'lighting' | 'effects'>('themes');
  
  const { activeThemeId, activeTheme, setTheme, updateTheme, unlockedThemes, savePreset } = useThemeStore();

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/80 backdrop-blur-md border-y border-l border-white/5 rounded-l-xl text-white/50 hover:text-cyan-400 hover:bg-black transition-colors"
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronLeft className={cn("w-5 h-5 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
      </motion.button>

      {/* Main Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-[340px] z-40 bg-black/60 backdrop-blur-2xl border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col text-white font-sans"
          >
            {/* Header */}
            <div className="p-8 pb-6">
              <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] mb-2">Configure</h2>
              <p className="text-2xl font-black tracking-tight text-white uppercase">Arena Parameters</p>
            </div>

            {/* Tabs */}
            <div className="flex px-6 pb-4 gap-4 overflow-x-auto no-scrollbar border-b border-white/5">
              {[
                { id: 'themes', icon: LayoutTemplate, label: 'Core' },
                { id: 'materials', icon: Palette, label: 'Matter' },
                { id: 'lighting', icon: Sun, label: 'Light' },
                { id: 'effects', icon: Zap, label: 'FX' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex flex-col items-center gap-2 pb-2 transition-all relative",
                    activeTab === tab.id ? "text-white" : "text-white/30 hover:text-white/70"
                  )}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="text-[9px] uppercase font-bold tracking-widest">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeTabIndicator" className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-cyan-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {activeTab === 'themes' && (
                <div className="space-y-4">
                  {Object.values(themes).map((theme) => {
                    const isUnlocked = unlockedThemes.includes(theme.id);
                    const isActive = activeThemeId === theme.id;
                    return (
                      <motion.div
                        key={theme.id}
                        whileHover={isUnlocked && !isActive ? { x: 5 } : {}}
                        whileTap={isUnlocked ? { scale: 0.98 } : {}}
                        onClick={() => isUnlocked && setTheme(theme.id)}
                        className={cn(
                          "relative p-5 cursor-pointer border-l-2 transition-all",
                          isActive 
                            ? "bg-gradient-to-r from-cyan-500/10 to-transparent border-cyan-400" 
                            : isUnlocked 
                              ? "border-white/10 hover:border-white/30 hover:bg-white/5" 
                              : "border-transparent opacity-30 cursor-not-allowed"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-sm tracking-wider uppercase">{theme.name}</h4>
                            <p className="text-[10px] text-white/40 mt-1 font-mono uppercase">{theme.description}</p>
                          </div>
                          {!isUnlocked && <LockIcon className="w-4 h-4 text-white/30" />}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'materials' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] mb-4">Surface Type</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['glass', 'metallic', 'holographic', 'neon', 'matte', 'crystal', 'lava'].map((mat) => (
                        <button
                          key={mat}
                          onClick={() => updateTheme({ board: { ...activeTheme.board, material: mat as any } })}
                          className={cn(
                            "px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-all border",
                            activeTheme.board.material === mat 
                              ? "bg-white text-black border-white" 
                              : "bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white"
                          )}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] mb-4">Geometry</h3>
                    <div className="flex gap-2">
                      {['square', 'circular', 'hexagonal'].map((shape) => (
                        <button
                          key={shape}
                          onClick={() => updateTheme({ board: { ...activeTheme.board, shape: shape as any } })}
                          className={cn(
                            "flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all border",
                            activeTheme.board.shape === shape 
                              ? "bg-white text-black border-white" 
                              : "bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white"
                          )}
                        >
                          {shape}
                        </button>
                      ))}
                    </div>
                  </div>
                  <SliderControl
                    label="Luminescence"
                    value={activeTheme.board.glowIntensity}
                    min={0} max={5} step={0.1}
                    onChange={(val: number) => updateTheme({ board: { ...activeTheme.board, glowIntensity: val } })}
                  />
                  <SliderControl
                    label="Opacity"
                    value={activeTheme.board.opacity}
                    min={0} max={1} step={0.1}
                    onChange={(val: number) => updateTheme({ board: { ...activeTheme.board, opacity: val } })}
                  />
                </div>
              )}

              {activeTab === 'lighting' && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">Ambient Color</label>
                    <input 
                      type="color" 
                      value={activeTheme.lighting.ambientColor}
                      onChange={(e) => updateTheme({ lighting: { ...activeTheme.lighting, ambientColor: e.target.value } })}
                      className="w-full h-10 bg-transparent border border-white/10 cursor-pointer rounded-none"
                    />
                  </div>
                  <SliderControl
                    label="Ambient Intensity"
                    value={activeTheme.lighting.ambientIntensity}
                    min={0} max={2} step={0.1}
                    onChange={(val: number) => updateTheme({ lighting: { ...activeTheme.lighting, ambientIntensity: val } })}
                  />
                  <SliderControl
                    label="Spot Intensity"
                    value={activeTheme.lighting.spotIntensity}
                    min={0} max={5} step={0.1}
                    onChange={(val: number) => updateTheme({ lighting: { ...activeTheme.lighting, spotIntensity: val } })}
                  />
                </div>
              )}

              {activeTab === 'effects' && (
                <div className="space-y-8">
                  <ToggleControl
                    label="Bloom Effect"
                    checked={activeTheme.effects.bloom}
                    onChange={(val: boolean) => updateTheme({ effects: { ...activeTheme.effects, bloom: val } })}
                  />
                  {activeTheme.effects.bloom && (
                    <SliderControl
                      label="Bloom Intensity"
                      value={activeTheme.effects.bloomIntensity}
                      min={0} max={3} step={0.1}
                      onChange={(val: number) => updateTheme({ effects: { ...activeTheme.effects, bloomIntensity: val } })}
                    />
                  )}
                  <ToggleControl
                    label="Digital Glitch"
                    checked={activeTheme.effects.glitch}
                    onChange={(val: boolean) => updateTheme({ effects: { ...activeTheme.effects, glitch: val } })}
                  />
                  <ToggleControl
                    label="Film Noise"
                    checked={activeTheme.effects.noise}
                    onChange={(val: boolean) => updateTheme({ effects: { ...activeTheme.effects, noise: val } })}
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5">
              <Button 
                variant="outline" 
                className="w-full bg-transparent border-white/20 text-white hover:bg-white hover:text-black transition-all gap-2 rounded-none h-12 uppercase tracking-widest text-[10px] font-bold"
                onClick={() => {
                  const name = prompt('Enter preset name:');
                  if (name) savePreset(name);
                }}
              >
                <Save className="w-4 h-4" /> Save Preset
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Subcomponents
const LockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const SliderControl = ({ label, value, min, max, step, onChange }: any) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">{label}</span>
      <span className="font-mono text-cyan-400 text-xs">{value.toFixed(1)}</span>
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full accent-white h-0.5 bg-white/10 appearance-none cursor-pointer"
    />
  </div>
);

const ToggleControl = ({ label, checked, onChange }: any) => (
  <div className="flex items-center justify-between">
    <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "w-12 h-6 p-1 transition-colors relative border",
        checked ? "bg-white border-white" : "bg-transparent border-white/20"
      )}
    >
      <motion.div
        className={cn("w-4 h-4", checked ? "bg-black" : "bg-white/50")}
        animate={{ x: checked ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  </div>
);
