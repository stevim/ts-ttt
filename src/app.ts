/*-------------------------------- Constants --------------------------------*/

const winningCombos: number[][] = [
  [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board: number[]
let turn: number
let winner: boolean
let tie: boolean

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll<HTMLDivElement>('.sqr')
const messageEl = document.querySelector<HTMLHeadingElement>('#message')
const resetBtnEl = document.querySelector<HTMLButtonElement>('#reset')

/*-------------------------------- Functions --------------------------------*/

const render = (): void => {
  updateBoard()
  updateMessage()
}

const init = (): void => {
  board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
  turn = 1
  winner = false
  tie = false
  render()
}

const handleClick = (evt: MouseEvent): void => {
  if ( !evt.target ) return
  const clickedSqr = evt.target as HTMLDivElement
  const sqIdx: number = parseInt(clickedSqr.id.replace(`sq`,``))
  if (board[sqIdx] || winner ) return
  placePiece(sqIdx)
  checkTie()
  checkWinner()
  switchPlayerTurn()
  render()
    
}

const updateBoard = (): void => {
  board.forEach((sqr, idx) => {
    if (sqr === 1 ) {
      squareEls[idx].textContent = 'X'
    } else if (sqr === -1) {
      squareEls[idx].textContent = 'O'
    } else {
      squareEls[idx].textContent = ''
    }
  })
}

const updateMessage = (): void => {
  if ( winner === true && tie === false ) {
    if (messageEl) messageEl.textContent = `Player ${ turn === 1 ? 'X' : 'O'} wins!`
  } else if ( winner === false && tie === true ) {
    if (messageEl) messageEl.textContent = `Congrats, you've solved one of the simplest games out there`
  } else {
    if (messageEl) messageEl.textContent = `It's ${turn === 1 ? 'X' : 'O' }'s turn`
  }
}

const placePiece = (idx: number): void => {
  board[idx] = turn
}

const checkTie = (): void => {
  if (!board.includes(0)) {
    tie = true
  }
}

const checkWinner = (): void => {
  winningCombos.forEach((combo: number[]) => {
    if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3 ) {
      winner = true
    }
  })
}

const switchPlayerTurn = (): void => {
  if (winner) return
  turn = turn * -1
}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((sqr: HTMLElement, idx: number) => {
  sqr.addEventListener('click', handleClick)
})

if (resetBtnEl) resetBtnEl.addEventListener('click', init)

/*-------------------------------- Actual Code -------------------------------*/ 

init()