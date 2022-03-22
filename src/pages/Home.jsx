import React, { useEffect, useState, useCallback } from 'react'
import Board from '../components/Board'
import Controls from '../components/Controls'
import Result from '../components/Result'
import SolveButton from '../components/SolveButton'
import axios from '../axios';
import { BOARD_ROWS, BOARD_DATA } from '../constants'

export default function Home() {
    const [difficulty, setDifficulty] = useState('easy')
    const [boardData, setBoardData] = useState(BOARD_DATA)
    const [gameStatus, setGameStatus] = useState('unsolved')

    const fetchBoardData = useCallback(async (difficultyLevel = 'easy') => {
        try {
            const { data: { puzzle } } = await axios.get(`generate?difficulty=${difficultyLevel}`);
            drawPuzzle(puzzle)
            setDifficulty(difficultyLevel)
            setGameStatus('unsolved')
        } catch (error) {
            console.error(error);
        }
    }, [])

    useEffect(() => {
        fetchBoardData()
    }, [fetchBoardData])

    const drawPuzzle = (puzzle) => {
        const board = Array.from(Array(9).fill(null), () => new Array(9).fill(null));
        Object.entries(puzzle).forEach(([key, value]) => {
            const [row, column] = key.split('')
            board[BOARD_ROWS.indexOf(row)][column - 1] = Number(value)
        })
        setBoardData(board)
    }

    const solveBoard = () => {
        const inputValid = isValid(boardData)
        if (!inputValid) {
            inputIsInvalid()
        }
        else {
            const answer = isSolved(boardData) ? boardData : getSolutions(boardData)
            updateBoard(answer, inputValid)
        }
    };

    const validateBoard = () => {
        setGameStatus(isSolved(boardData) && isValid(boardData) ? 'solved' : 'broken')
    };

    const getSolutions = (board) => {
        const possibilities = nextBoards(board)
        const validBoards = keepOnlyValid(possibilities)
        return searchForSolution(validBoards)
    }

    const searchForSolution = (boards) => {
        if (boards.length < 1) {
            return null
        }
        else {
            // backtracking search for solution
            const first = boards.shift()
            const tryPath = isSolved(first) ? first : getSolutions(first)
            if (tryPath) {
                return tryPath
            }
            else {
                return searchForSolution(boards)
            }
        }
    }

    const isSolved = (board) => {
        // checks to see if the given puzzle is solved
        return board.every(row => row.every(item => !!item))

    }

    const nextBoards = (board) => {
        // finds the first emply square and generates 9 different boards filling in that square with numbers 1...9
        let res = []
        const firstEmpty = findEmptySquare(board)
        if (firstEmpty !== undefined) {
            const y = firstEmpty[0]
            const x = firstEmpty[1]
            for (let i = 1; i <= 9; i++) {
                let newBoard = [...board]
                let row = [...newBoard[y]]
                row[x] = i
                newBoard[y] = row
                res.push(newBoard)
            }
        }
        return res
    }

    const findEmptySquare = (board) => {
        // (get the i j coordinates for the first empty square)
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] == null) {
                    return [i, j]
                }
            }
        }
    }

    const keepOnlyValid = (boards) => {
        // filters out all of the invalid boards from the list
        let res = []
        for (let i = 0; i < boards.length; i++) {
            if (isValid(boards[i])) {
                res.push(boards[i])
            }
        }
        return res
    }

    const isValid = (board) => {
        // checks to see if given board is valid & make sure there are no repeating numbers for each row
        return rowsGood(board) && columnsGood(board) && boxesGood(board)
    }

    const rowsGood = (board) => {
        for (let i = 0; i < 9; i++) {
            let cur = []
            for (let j = 0; j < 9; j++) {
                if (cur.includes(board[i][j])) {
                    return false
                }
                else if (board[i][j] !== null) {
                    cur.push(board[i][j])
                }
            }
        }
        return true
    }

    const columnsGood = (board) => {
        for (let i = 0; i < 9; i++) {
            let cur = []
            for (let j = 0; j < 9; j++) {
                if (cur.includes(board[j][i])) {
                    return false
                }
                else if (board[j][i] !== null) {
                    cur.push(board[j][i])
                }
            }
        }
        return true
    }


    const boxesGood = (board) => {
        const boxCoordinates = [[0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]]
        for (let y = 0; y < 9; y += 3) {
            for (let x = 0; x < 9; x += 3) {
                // each traversal should examine each box
                let cur = []
                for (let i = 0; i < 9; i++) {
                    let coordinates = [...boxCoordinates[i]]
                    coordinates[0] += y
                    coordinates[1] += x
                    if (cur.includes(board[coordinates[0]][coordinates[1]])) {
                        return false
                    }
                    else if (board[coordinates[0]][coordinates[1]] !== null) {
                        cur.push(board[coordinates[0]][coordinates[1]])
                    }
                }
            }
        }
        return true
    }

    const updateBoard = (board) => {
        if (!board) {
            setGameStatus('unsolvable')
            console.log(`No Solution exists`)
            return
        }
        setBoardData(board)
        setGameStatus('solved')
    }

    const inputIsInvalid = () => {
        // board is invalid or puzzle is insolvable
        setGameStatus('unsolvable')
    }

    return (
        <div className='flex flex-wrap justify-center'>
            <div className="grid grid-flow-row auto-rows-max w-500">
                <Board boardData={boardData} setBoardData={setBoardData} />
                <Controls fetchBoardData={fetchBoardData} setBoardData={setBoardData} />
                <Result gameStatus={gameStatus} difficulty={difficulty} validateBoard={validateBoard} />
                <SolveButton solveBoard={solveBoard} />
            </div>
        </div>
    )
}
