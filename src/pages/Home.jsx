import React, { useEffect, useState } from 'react'
import Board from '../components/Board'
import Controls from '../components/Controls'
import Result from '../components/Result'
import axios from '../axios';

export default function Task() {
    const [difficulty, setDifficulty] = useState('easy')
    const [boardData, setBoardData] = useState([])
    const [gameStatus, setGameStatus] = useState('unsolved')

    const getBoardData = async () => {
        try {
            const { data } = await axios.get(`board?difficulty=${difficulty}`);
            setBoardData(data.board)
        } catch (error) {
            console.error(error);
        }
    };

    const solveBoard = async () => {
        try {
            const { data } = await axios.post(`solve`, {
                board: { boardData },
            });
            setBoardData(data.solution)
            setGameStatus(data.status)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBoardData()
    }, [difficulty])

    return (
        <div className='flex flex-wrap justify-center'>
            <div className="grid grid-flow-row auto-rows-max w-500">
                <Board boardData={boardData} setBoardData={setBoardData} />
                <Controls setDifficulty={setDifficulty} />
                <Result gameStatus={gameStatus} difficulty={difficulty} />
                <button onClick={() => solveBoard()} className='hover:bg-gray-200 py-2 pr-6 pl-3 rounded-lg border w-full mt-4'>Solve</button>
            </div>
        </div>
    )
}
