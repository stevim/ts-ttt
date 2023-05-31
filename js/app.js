"use strict";
/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');
/*-------------------------------- Functions --------------------------------*/
const render = () => {
    updateBoard();
    updateMessage();
};
const init = () => {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0,];
    turn = 1;
    winner = false;
    tie = false;
    render();
};
const handleClick = (evt) => {
    if (!evt.target)
        return;
    const clickedSqr = evt.target;
    const sqIdx = parseInt(clickedSqr.id.replace(`sq`, ``));
    if (board[sqIdx] || winner)
        return;
    placePiece(sqIdx);
    checkTie();
    checkWinner();
    switchPlayerTurn();
    render();
};
const updateBoard = () => {
    board.forEach((sqr, idx) => {
        if (sqr === 1) {
            squareEls[idx].textContent = 'X';
        }
        else if (sqr === -1) {
            squareEls[idx].textContent = 'O';
        }
        else {
            squareEls[idx].textContent = '';
        }
    });
};
const updateMessage = () => {
    if (winner === true && tie === false) {
        if (messageEl)
            messageEl.textContent = `Player ${turn === 1 ? 'X' : 'O'} wins!`;
    }
    else if (winner === false && tie === true) {
        if (messageEl)
            messageEl.textContent = `Congrats, you've solved one of the simplest games out there`;
    }
    else {
        if (messageEl)
            messageEl.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn`;
    }
};
const placePiece = (idx) => {
    board[idx] = turn;
};
const checkTie = () => {
    if (!board.includes(0)) {
        tie = true;
    }
};
const checkWinner = () => {
    winningCombos.forEach((combo) => {
        if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
            winner = true;
            confetti.start(3000)
        }
    });
};
const switchPlayerTurn = () => {
    if (winner)
        return;
    turn = turn * -1;
};
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((sqr, idx) => {
    sqr.addEventListener('click', handleClick);
});
if (resetBtnEl)
    resetBtnEl.addEventListener('click', init);
/*-------------------------------- Actual Code -------------------------------*/
init();
