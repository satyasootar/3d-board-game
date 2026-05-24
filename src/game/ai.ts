import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import type { Player, OpponentType } from '../store/useGameStore';
import { useThemeStore } from '../store/useThemeStore';
import { themes } from '../config/themes';

// AI Minimax logic for 'godmode' or perfect glitch moves
function minimax(board: Player[], depth: number, isMaximizing: boolean): number {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  
  let winner: Player | 'draw' | null = null;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      break;
    }
  }
  if (!winner && !board.includes(null)) winner = 'draw';

  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (winner === 'draw') return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function getBestMove(board: Player[]): number {
  let bestScore = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function getRandomMove(board: Player[]): number {
  const available = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
  return available[Math.floor(Math.random() * available.length)];
}

export function useGameAI() {
  const { board, currentPlayer, status, opponent, makeMove } = useGameStore();
  const { updateTheme, activeThemeId } = useThemeStore();

  useEffect(() => {
    // If it's not the AI's turn or game isn't playing, do nothing
    if (status !== 'playing' || currentPlayer !== 'O' || opponent === 'local') return;

    let moveDelay = 800; // ms to think
    let targetMove = -1;

    // AI Logic and Visual FX
    if (opponent === 'zen') {
      // ZEN: Calm, heuristic/random. 
      // Temporarily set lighting to calm blue
      updateTheme({
        lighting: { ...themes[activeThemeId].lighting, ambientColor: '#0055ff', ambientIntensity: 0.8 }
      });
      targetMove = getRandomMove(board); // Easy AI
    } 
    else if (opponent === 'rage') {
      // RAGE: Aggressive, triggers red bloom
      updateTheme({
        effects: { ...themes[activeThemeId].effects, bloom: true, bloomIntensity: 3.0 },
        lighting: { ...themes[activeThemeId].lighting, ambientColor: '#ff0000' }
      });
      moveDelay = 400; // Plays faster
      // Mix of random and best
      targetMove = Math.random() > 0.5 ? getBestMove(board) : getRandomMove(board);
    }
    else if (opponent === 'glitch') {
      // GLITCH: Triggers heavy glitch
      updateTheme({
        effects: { ...themes[activeThemeId].effects, glitch: true, glitchIntensity: 2.0 }
      });
      targetMove = Math.random() > 0.3 ? getBestMove(board) : getRandomMove(board);
    }
    else if (opponent === 'godmode') {
      targetMove = getBestMove(board);
    }

    const timer = setTimeout(() => {
      // Reset theme to original preset state after move
      updateTheme({
        lighting: themes[activeThemeId].lighting,
        effects: themes[activeThemeId].effects
      });
      makeMove(targetMove);
    }, moveDelay);

    return () => clearTimeout(timer);

  }, [board, currentPlayer, status, opponent]);
}
