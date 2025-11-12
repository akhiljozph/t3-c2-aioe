import { useEffect, useState } from "react";
import Cell from "../cell/Cell";

import "./Board.css";

function Board() {

    const [cells, setCells] = useState<string[]>(Array(9).fill(''));
    const [clickTracer, setClickTracer] = useState(0);

    useEffect(() => { }, [cells]);

    const handleClick = (index: number) => {
        setClickTracer(prev => {
            const next = prev + 1;

            setCells(prevCells => {
                const updated = [...prevCells];
                if (next > 1) {
                    updated[index] = next % 2 === 0 ? 'O' : 'X';
                } else {
                    updated[index] = 'X';
                }
                return updated;
            });

            return next;
        });
    };

    const resetProgress = () => {
        setCells(Array(9).fill(''));
    }

    return (
        <section className="tic-tac-wrapper">
            <span className="tic-tac-alert">Player 1 won!</span>
            <div className="tic-tac-board">
                {cells.map((cell, cellIndex) => (
                    <Cell key={cellIndex} onCellClick={() => handleClick(cellIndex)} value={cell} />
                ))}
            </div>
            <button className="reset-btn" onClick={resetProgress}>Reset Game</button>
        </section>
    )
}
export default Board;