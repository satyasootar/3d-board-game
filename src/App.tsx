import { CustomizationPanel } from './components/ui-customization/CustomizationPanel';
import { ArenaCanvas } from './components/arena/ArenaCanvas';
import { MainMenu } from './components/ui-game/MainMenu';
import { GameHUD } from './components/ui-game/GameHUD';

export function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      <ArenaCanvas />
      <CustomizationPanel />
      <MainMenu />
      <GameHUD />
      
      {/* Small subtle branding or instructions */}
      <div className="absolute bottom-4 right-4 z-10 text-xs text-white/30 font-mono pointer-events-none">
        TIC TAC TOE: SYSTEM OVERRIDE
      </div>
    </div>
  );
}

export default App;
