
export default function Controls({ setDifficulty }) {
    return (
        <div>
            <div className='mb-3'>
                <div className='flex flex-wrap items-center justify-between'>
                    <p className='text-xl font-bold mr-4'>Generate:</p>
                    <button onClick={() => setDifficulty('easy')} className='hover:bg-gray-200 px-3 py-2 rounded'>Easy</button>
                    <button onClick={() => setDifficulty('medium')} className='hover:bg-gray-200 px-3 py-2 rounded mx-2'>Medium</button>
                    <button onClick={() => setDifficulty('hard')} className='hover:bg-gray-200 px-3 py-2 rounded mx-2'>Hard</button>
                    <button onClick={() => setDifficulty('random')} className='hover:bg-gray-200 px-3 py-2 rounded mx-2'>Random</button>
                    <button onClick={() => setDifficulty('clear')} className='hover:bg-gray-200 px-3 py-2 rounded border'>Clear</button>
                </div>
            </div>
        </div>
    );
}