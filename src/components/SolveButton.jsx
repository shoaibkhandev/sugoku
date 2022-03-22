
export default function SolveButton({ solveBoard }) {
    return (
        <button data-testid="solve-button" onClick={solveBoard} className='hover:bg-gray-200 py-2 pr-6 pl-3 rounded-lg border w-full mt-4'>Solve</button>
    );
}