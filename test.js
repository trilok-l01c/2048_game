const N = 4;
const generateBoard = () => new Array(N).fill(null).map(() => Array(N).fill(0));
const compress = (board) => {
    const newBoard = generateBoard();
    // compressing to the left
    for (let i = 0; i < N; i++) {
        for (let j = 0, k = 0; j < N; j++) {
            if (board[i][j] > 0) {
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

const transpose = (board) => {
    const newBoard = generateBoard();

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            newBoard[j][i] = board[i][j];
        }
    }

    return newBoard;
};

const board = [
    [4, 2, 2, 4],
    [2, 0, 4, 0],
    [0, 0, 0, 2],
    [2, 0, 0, 4],
];

let newboard = compress(board);
newboard = merge(newboard);
newboard = compress(newboard);

console.log(transpose(newboard));
