import { create } from 'zustand';

export type Player = 'X' | 'O' | null;
export type GameStatus = 'menu' | 'playing' | 'game_over';
export type OpponentType = 'local' | 'zen' | 'rage' | 'glitch' | 'godmode';

export interface GameState {
  board: Player[];
  currentPlayer: 'X' | 'O';
  status: GameStatus;
  winner: Player | 'draw';
  winningLine: number[] | null;
  opponent: OpponentType;
  
  startGame: (opponent: OpponentType) => void;
  makeMove: (index: number) => void;
  resetGame: () => void;
  goToMenu: () => void;
}

const checkWinner = (board: Player[]): { winner: Player | 'draw', line: number[] | null } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: lines[i] };
    }
  }
  if (!board.includes(null)) {
    return { winner: 'draw', line: null };
  }
  return { winner: null, line: null };
};

export const useGameStore = create<GameState>((set, get) => ({
  board: Array(9).fill(null),
  currentPlayer: 'X',
  status: 'menu',
  winner: null,
  winningLine: null,
  opponent: 'local',

  startGame: (opponent) => set({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    status: 'playing',
    winner: null,
    winningLine: null,
    opponent
  }),

  makeMove: (index) => {
    const { board, currentPlayer, status } = get();
    
    // Allow moves in playing OR menu states
    if ((status !== 'playing' && status !== 'menu') || board[index] !== null) return;
    
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    
    const { winner, line } = checkWinner(newBoard);
    
    if (winner && status === 'playing') {
      set({ 
        board: newBoard, 
        status: 'game_over', 
        winner, 
        winningLine: line 
      });
    } else if (winner && status === 'menu') {
      // Sandbox mode: if someone wins or draws while previewing, just clear the board
      set({ 
        board: Array(9).fill(null), 
        currentPlayer: 'X' 
      });
    } else {
      set({ 
        board: newBoard, 
        currentPlayer: currentPlayer === 'X' ? 'O' : 'X' 
      });
    }
  },

  resetGame: () => set(() => ({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    status: 'playing',
    winner: null,
    winningLine: null,
  })),

  goToMenu: () => set({
    status: 'menu',
    board: Array(9).fill(null),
    winner: null,
    winningLine: null,
  })
}));
