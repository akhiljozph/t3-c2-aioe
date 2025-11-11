import { useEffect, useState } from "react";
import Cell from "../cell/Cell";

import "./Board.css";

function Board() {

    const [cells, setCells] = useState<string[]>(Array(9).fill(''));
    const [clickTracer, setClickTracer] = useState(0);

    useEffect(() => {
        console.log("Effect triggered: cells changed", cells);
    }, [cells]);

    const handleClick = (index: number) => {
        setClickTracer(prev => {
            const next = prev + 1;

            setCells(prevCells => {
                const updated = [...prevCells];
                if (next > 1) {
                    updated[index] = next % 2 === 0 ? '0' : 'X';
                } else {
                    updated[index] = 'X';
                }
                return updated;
            });

            console.log('Clicked', { index, clickTracer: next });
            return next;
        });
    };


    return (
        <section className="tic-tac-wrapper">
            <div className="tic-tac-board">
                {cells.map((cell, cellIndex) => (
                    <Cell key={cellIndex} onCellClick={() => handleClick(cellIndex)} value={cell} />
                ))}
            </div>
        </section>
    )
}
export default Board;