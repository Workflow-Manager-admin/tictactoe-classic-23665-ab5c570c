import React, { useState } from "react";

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  /**
   * Main container for the TicTacToe Classic game.
   * - Two-player mode: alternates X and O
   * - Win & draw detection
   * - Reset option
   * - Minimal, centered design with specified color theme
   */
  // --- Theme colors (override via CSS-in-JS for direct usage) ---
  const COLORS = {
    primary: "#222831",
    secondary: "#393e46",
    accent: "#00adb5",
    light: "#eeeeee"
  };

  // --- STATE ---
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState(""); // "X wins", "O wins", "Draw", or ""
  const [winningLine, setWinningLine] = useState([]);

  // --- HANDLERS & GAME LOGIC ---

  /**
   * Returns the winner info – either {winner: "X" or "O", line: [indexes]} or null if no winner.
   */
  function calculateWinner(b) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6], // diagonals
    ];
    for (let line of lines) {
      const [a, b1, c] = line;
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return { winner: b[a], line };
      }
    }
    return null;
  }

  function handleClick(idx) {
    if (board[idx] || status) return; // Ignore if already filled or game ended
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    const res = calculateWinner(newBoard);

    if (res) {
      setBoard(newBoard);
      setStatus(`Player ${res.winner} wins!`);
      setWinningLine(res.line);
    } else if (newBoard.every(cell => cell)) {
      setBoard(newBoard);
      setStatus("It's a draw!");
      setWinningLine([]);
    } else {
      setBoard(newBoard);
      setXIsNext(!xIsNext);
      setStatus("");
      setWinningLine([]);
    }
  }

  function handleReset() {
    setBoard(emptyBoard);
    setXIsNext(true);
    setStatus("");
    setWinningLine([]);
  }

  // --- UI COMPONENTS ---
  function renderCell(i) {
    const isWinning = winningLine.includes(i);
    return (
      <button
        className="ttt-cell"
        key={i}
        onClick={() => handleClick(i)}
        style={{
          color: board[i] === "X" ? COLORS.accent : COLORS.secondary,
          background: isWinning ? COLORS.accent + "20" : COLORS.light,
          border: `2px solid ${isWinning ? COLORS.accent : COLORS.secondary}`,
          cursor: board[i] || status ? "default" : "pointer",
          fontWeight: isWinning ? "700" : "500"
        }}
        aria-label={`Cell ${i + 1} ${board[i] ? "filled with " + board[i] : "empty"}`}
        disabled={!!board[i] || !!status}
      >
        {board[i] ?? ""}
      </button>
    );
  }

  // --- LAYOUT & THEME STYLES (scoped to this component) ---
  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "70vh",
      background: COLORS.primary,
      padding: "2rem",
      borderRadius: "16px",
      boxShadow: `0 6px 30px 0 #00000017`
    },
    turn: {
      fontSize: "1.2rem",
      marginBottom: "20px",
      color: COLORS.accent,
      letterSpacing: "0.2rem"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 64px)",
      gap: "8px",
      background: COLORS.secondary,
      borderRadius: "12px",
      padding: "12px",
      marginBottom: "24px",
    },
    status: {
      minHeight: "1.8rem",
      marginBottom: "12px",
      fontWeight: "600",
      color: status.includes("win") ? COLORS.accent : COLORS.secondary,
      letterSpacing: "0.1rem"
    },
    resetBtn: {
      background: COLORS.accent,
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "10px 32px",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      marginTop: "8px",
      transition: "background 0.18s"
    }
  };

  return (
    <div style={styles.wrapper} data-testid="ttt-main">
      <div style={styles.turn}>
        {!status
          ? `Current turn: Player ${xIsNext ? "X" : "O"}`
          : null}
      </div>
      <div style={styles.grid}>
        {board.map((_, idx) => renderCell(idx))}
      </div>
      <div style={styles.status}>
        {status}
      </div>
      <button style={styles.resetBtn} onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}

export default TicTacToeClassic;
