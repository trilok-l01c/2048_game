import { useState } from "react";
import "./App.css";

const N = 4;

const generateBoard = () => new Array(N).fill(null).map(() => Array(N).fill(0));

const generateRandomNumber = (max) => Math.floor(Math.random() * max);

const addTile = (board) => {
    const emptyTiles = [];

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] == "0") emptyTiles.push([i, j]);
        }
    }

    const tile = emptyTiles[generateRandomNumber(emptyTiles.length)];

    board[tile[0]][tile[1]] = Math.random() >= 0.9 ? 4 : 2;
};

export default function App() {
    const [board, setBoard] = useState(() => {
        let b = generateBoard();
        addTile(b);
        addTile(b);
        return b;
    });
    return (
        <div className="container">
            <h1>2048 Board game</h1>
            <div className="board">
                {board.map((row) => (
                    <div className="row">
                        {row.map((cell) => (
                            <div className={`cell cell-${cell}`}>{cell}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
