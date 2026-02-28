import { useEffect, useState } from "react";
import "./App.css";

const N = 4;

const generateBoard = () => new Array(N).fill(null).map(() => Array(N).fill(0));

const generateRandomNumber = (max) => Math.floor(Math.random() * max);

const addTile = (board) => {
    const emptyTiles = [];

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] == 0) emptyTiles.push([i, j]);
        }
    }
    if (emptyTiles.length == 0) return board;
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

// shifting left
const moveLeft = (board) => {
    let newboard = compress(board);
    newboard = merge(newboard);
    newboard = compress(newboard);
    return newboard;
};

// shifting right
const moveRight = (board) => {
    let rev = reverse(board);
    rev = moveLeft(rev);
    return reverse(rev);
};

// shifting up
const moveUp = (board) => {
    let transposed = transpose(board);
    let newBoard = moveLeft(transposed);
    return transpose(newBoard);
};

// shifting down
const moveDown = (board) => {
    let transposed = transpose(board);
    let newBoard = moveRight(transposed);
    return transpose(newBoard);
};

const isGameOver = () => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (
                board[i][j] == 0 ||
                (i > 0 && board[i - 1][j] == board[i][j]) ||
                (j > 0 && board[i][j - 1] == board[i][j])
            )
                return false;
        }
    }
    return true;
};
// ***********************************************
export default function App() {
    const [board, setBoard] = useState(() => {
        let b = generateBoard();
        b = addTile(b);
        b = addTile(b);
        return b;
    });
    const [gameover, setGameover] = useState(false);
    // ******** Working area *************************
    // handle key down
    const handleKeydown = (e) => {
        if (gameover) return;
        const key = e.key;
        let newBoard;
        if (key === "ArrowUp" || key === "w") {
            // handle logic for up
            newBoard = moveUp(board);
        } else if (key === "ArrowDown" || key === "s") {
            // handle logic for down
            newBoard = moveDown(board);
        } else if (key === "ArrowLeft" || key === "a") {
            // handle logic for left
            newBoard = moveLeft(board);
        } else if (key === "ArrowRight" || key === "d") {
            // handle logic for right
            newBoard = moveRight(board);
        } else return;

        // handle remaining tasks
        if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
            setBoard(addTile([...newBoard].map((row) => [...row])));
            setGameover(gameover);
        }
    };
    // ***********************************************
    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, [board]);
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
