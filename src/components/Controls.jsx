import { BOARD_DATA } from '../constants'

export default function Controls({ setBoardData, fetchBoardData }) {
    const randomDifficulty = () => {
        const difficulties = ['easy', 'medium', 'hard']
        fetchBoardData(difficulties[Math.floor(Math.random() * 3) + 1])
    }
    const changeDifficulty = (item) => {
        fetchBoardData(item)
    }
    const clearBoard = () => {
        setBoardData(BOARD_DATA)
    }

    return (
        <div className='mb-3'>
            <div className='flex flex-wrap items-center justify-between'>
                <p className='text-xl font-bold mr-4'>Generate:</p>
                <button onClick={() => changeDifficulty('easy')} className='hover:bg-gray-200 px-3 py-2 rounded'>Easy</button>
                <button onClick={() => changeDifficulty('medium')} className='hover:bg-gray-200 px-3 py-2 rounded mx-2'>Medium</button>
                <button onClick={() => changeDifficulty('hard')} className='hover:bg-gray-200 px-3 py-2 rounded mx-2'>Hard</button>
                <button onClick={() => randomDifficulty()} className='hover:bg-gray-200 px-3 py-2 rounded mx-2'>Random</button>
                <button onClick={() => clearBoard()} className='hover:bg-gray-200 px-3 py-2 rounded border'>Clear</button>
            </div>
        </div>
    );
}