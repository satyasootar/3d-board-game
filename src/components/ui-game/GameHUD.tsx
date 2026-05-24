import { motion, AnimatePresence } from 'framer-motion';
const MotionDiv = motion.div as any;
import { useGameStore } from '../../store/useGameStore';
import { Button } from '@/components/ui/button';

export function GameHUD() {
  const { status, currentPlayer, winner, opponent, resetGame, goToMenu } = useGameStore();

  if (status === 'menu') return null;

  return (
    <>
      {/* Top HUD */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <MotionDiv 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-6"
        >
          {status === 'playing' ? (
            <>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 mb-2">SYSTEM STATUS</span>
                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2">
                  <div className={`w-2 h-2 animate-pulse ${currentPlayer === 'X' ? 'bg-cyan-400' : 'bg-orange-400'}`} />
                  <span className="font-bold tracking-widest text-sm text-white">
                    {opponent !== 'local' && currentPlayer === 'O' 
                      ? `[${opponent.toUpperCase()}] COMPUTING...` 
                      : `PLAYER [${currentPlayer}]`}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-yellow-400/50 mb-2">SYSTEM HALTED</span>
              <div className="bg-yellow-400/10 backdrop-blur-md border border-yellow-400/30 px-6 py-2">
                <span className="font-bold tracking-widest text-sm text-yellow-400">
                  MATCH CONCLUDED
                </span>
              </div>
            </div>
          )}
        </MotionDiv>
      </div>

      {/* Game Over Screen */}
      <AnimatePresence>
        {status === 'game_over' && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-md"
          >
            <MotionDiv 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-[80px] font-black tracking-tighter text-white uppercase leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                {winner === 'draw' ? 'DRAW' : `${winner} WINS`}
              </h2>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/50 to-transparent my-6" />
              <p className="text-cyan-400 text-sm font-mono uppercase tracking-[0.4em] mb-12">
                {winner === 'draw' ? 'STALEMATE DETECTED' : 'VICTORY ACHIEVED'}
              </p>
              
              <div className="flex gap-4">
                <Button 
                  onClick={resetGame}
                  className="bg-white text-black hover:bg-white/90 gap-2 rounded-none h-14 px-10 tracking-widest text-xs font-bold uppercase"
                >
                  Rematch
                </Button>
                <Button 
                  variant="outline"
                  onClick={goToMenu}
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 gap-2 rounded-none h-14 px-10 tracking-widest text-xs font-bold uppercase"
                >
                  Menu
                </Button>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-8 z-30">
        <Button 
          variant="outline"
          onClick={goToMenu}
          className="bg-black/50 border-white/10 text-white/50 hover:text-white hover:bg-white/10 rounded-none px-6 tracking-widest text-[10px] font-bold uppercase backdrop-blur-md"
        >
          ABORT MATCH
        </Button>
      </div>
    </>
  );
}
