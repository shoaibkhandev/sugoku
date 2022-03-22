
export default function Controls({ difficulty, gameStatus, validateBoard }) {
    return (
        <div>
            <div className='mb-3'>
                <div className='flex flex-wrap justify-between items-center'>
                    <div>
                        <button onClick={validateBoard} className='hover:bg-gray-200 py-2 px-4 rounded-l-lg border'>Validate</button>
                        <button data-testid="game-result" className='py-2 px-4 font-bold rounded-r-lg border'>{gameStatus}</button>
                    </div>
                    <div>
                        <button className='py-2 px-4 font-bold rounded-l-lg border'>{difficulty}</button>
                        <button className='hover:bg-gray-200 py-2 px-4 rounded-r-lg border'>Difficulty</button>
                    </div>
                </div>
            </div>
        </div>
    );
}