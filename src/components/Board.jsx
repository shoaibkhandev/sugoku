import React from 'react'

export default function Board({ boardData, setBoardData }) {
    const handleChange = (e, index, subIndex) => {
        const data = [...boardData];
        data[index][subIndex] = e.target.value
        setBoardData(data)
    }
    return (
        <div className='mb-3'>
            <div className='flex justify-between'>
                <div className='py-6'>
                    <p className='text-2xl font-bold'>suGOku</p>
                </div>
            </div>
            {boardData.map((board, index) => {
                return <div key={index} className='flex'>
                    {board.map((data, subIndex) => {
                        return <div key={`${index}-${subIndex}`} className='flex justify-center items-center border border-black w-14 h-14 p-7'>
                            <input className='outline-none w-14 text-center text-xl' onChange={(e) => handleChange(e, index, subIndex)} type='number' value={data || ''} />
                        </div>
                    })}
                </div>

            })}
        </div>
    );
}