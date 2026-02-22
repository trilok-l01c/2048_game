import { useEffect, useState } from "react";
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
    return board;
};

// shifting logic
const onLeft = (board) => {};
export default function App() {
    const [board, setBoard] = useState(() => {
        let b = generateBoard();
        addTile(b);
        addTile(b);
        return b;
    });
    // ******** Working area *************************
    // using useEffect
    useEffect(() => {}, [board]);

    // handle key down
    const handleKeydown = (e) => {
        addTile(board);
        const key = e.key;
        if (key === "ArrowUp" || key === "w") {
            // handle logic for up
        } else if (key === "ArrowDown" || key === "s") {
            // handle logic for down
        } else if (key === "ArrowLeft" || key === "a") {
            // handle logic for left
        } else if (key === "ArrowRight" || key === "d") {
            // handle logic for right
        } else return;

        // handle remaining tasks
    };
    // ***********************************************
    window.addEventListener("keydown", handleKeydown);
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
