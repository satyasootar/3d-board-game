import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import type { OpponentType } from '../../store/useGameStore';
import { Users, Brain, Zap, Flame, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MainMenu() {
  const { status, startGame } = useGameStore();

  if (status !== 'menu') return null;

  const modes = [
    { id: 'local', label: 'LOCAL MATCH', icon: Users, desc: 'PVP on same device', color: 'text-white' },
    { id: 'zen', label: 'VS ZEN', icon: Brain, desc: 'Calm, defensive', color: 'text-blue-400' },
    { id: 'rage', label: 'VS RAGE', icon: Flame, desc: 'Aggressive, fast', color: 'text-red-500' },
    { id: 'glitch', label: 'VS GLITCH', icon: Zap, desc: 'Unpredictable', color: 'text-purple-400' },
    { id: 'godmode', label: 'GODMODE', icon: ShieldAlert, desc: 'Flawless logic', color: 'text-yellow-400' },
  ];

  return (
    <div className="absolute inset-y-0 left-0 w-96 z-40 flex flex-col justify-center p-12 pointer-events-none">
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto"
      >
        <div className="mb-12">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            className="h-1 bg-cyan-400 mb-4"
          />
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            ARENA<br/>OVERRIDE
          </h1>
          <p className="text-cyan-400/70 text-xs mt-3 font-mono uppercase tracking-[0.3em]">
            Select Protocol
          </p>
        </div>

        <div className="space-y-1">
          {modes.map((mode, index) => (
            <motion.button
              key={mode.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ x: 10, color: '#fff' }}
              onClick={() => startGame(mode.id as OpponentType)}
              className="w-full group flex items-center justify-between py-4 border-b border-white/5 hover:border-cyan-400/50 transition-colors text-left"
            >
              <div className="flex flex-col">
                <span className={cn("text-xl font-bold tracking-widest text-white/70 group-hover:text-white transition-colors", mode.color)}>
                  {mode.label}
                </span>
                <span className="text-[10px] text-white/30 font-mono uppercase tracking-widest mt-1 group-hover:text-cyan-400/70 transition-colors">
                  {mode.desc}
                </span>
              </div>
              <mode.icon className={cn("w-5 h-5 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0", mode.color)} />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
