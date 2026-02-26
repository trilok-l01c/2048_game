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
// **************** tasks *********************

// compress, merge, transpose, reverse
const compress = (board) => {
    const newBoard = generateBoard();
    // compressing to the left
    for (let i = 0; i < N; i++) {
        for (let j = 0, k = 0; j < N; j++) {
            if (board[i][j]) {
                newBoard[i][k++] = board[i][j];
            }
        }
    }
    return newBoard;
};

const merge = (board) => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N - 1; j++) {
            // if adjacent elements are equal merge them
            if (board[i][j] && board[i][j] == board[i][j + 1]) {
                board[i][j] *= 2;
                board[i][j + 1] = 0;
            }
        }
    }
    return board;
};

// left col -> top row
const transpose = (board) => {
    const newBoard = generateBoard();

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            newBoard[j][i] = board[i][j];
        }
    }

    return newBoard;
};

// left to right and right to left
const reverse = (board) => board.map((row) => [...row].reverse());

// shifting logic
const onLeft = (board) => {
    const newboard = compress(board);
    newboard = merge(newboard);
    newboard = compress(newboard);
    return newboard;
};

// shifting right
const onRight = (board) => {
    const rev = reverse(board);
    return reverse(onLeft(rev));
};

// shifting up
const onUp = (board) => {
    const transposed = transpose(board);
    const newBoard = onLeft(transposed);
    return transpose(newBoard);
};

// shifting down
const onDown = (board) => {
    const rev = reverse(board);
    return rev(onUp(rev));
};

// ***********************************************
export default function App() {
    const [board, setBoard] = useState(() => {
        let b = generateBoard();
        b = addTile(b);
        b = addTile(b);
        return b;
    });
    // ******** Working area *************************
    // using useEffect
    useEffect(() => {}, [board]);

    // handle key down
    const handleKeydown = (e) => {
        const key = e.key;
        const newBoard = [];
        if (key === "ArrowUp" || key === "w") {
            // handle logic for up
            newBoard = onUp(board);
        } else if (key === "ArrowDown" || key === "s") {
            // handle logic for down
            newBoard = onDown(board);
        } else if (key === "ArrowLeft" || key === "a") {
            // handle logic for left
            newBoard = onLeft(board);
        } else if (key === "ArrowRight" || key === "d") {
            // handle logic for right
            newBoard = onRight(board);
        } else return;

        // handle remaining tasks
        setBoard(addTile([...newBoard]));
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
