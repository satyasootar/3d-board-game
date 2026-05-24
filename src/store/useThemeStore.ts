import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themes } from '../config/themes';
import type { ThemeConfig } from '../config/themes';

interface ThemeState {
  activeThemeId: string;
  activeTheme: ThemeConfig;
  setTheme: (id: string) => void;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  unlockedThemes: string[];
  unlockTheme: (id: string) => void;
  savedPresets: Record<string, ThemeConfig>;
  savePreset: (name: string) => void;
  loadPreset: (name: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      activeThemeId: 'cyberpunk',
      activeTheme: themes.cyberpunk,
      unlockedThemes: ['cyberpunk', 'space', 'matrix', 'lava', 'ice', 'minimal'], // all unlocked
      savedPresets: {},
      
      setTheme: (id) => {
        if (themes[id]) {
          set({ activeThemeId: id, activeTheme: themes[id] });
        }
      },
      
      updateTheme: (updates) => {
        set((state) => ({
          activeTheme: { ...state.activeTheme, ...updates }
        }));
      },
      
      unlockTheme: (id) => {
        set((state) => ({
          unlockedThemes: state.unlockedThemes.includes(id) 
            ? state.unlockedThemes 
            : [...state.unlockedThemes, id]
        }));
      },
      
      savePreset: (name) => {
        set((state) => ({
          savedPresets: {
            ...state.savedPresets,
            [name]: state.activeTheme
          }
        }));
      },
      
      loadPreset: (name) => {
        const preset = get().savedPresets[name];
        if (preset) {
          set({ activeTheme: preset, activeThemeId: 'custom' });
        }
      }
    }),
    {
      name: 'tictactoe-theme-storage-v2',
    }
  )
);
