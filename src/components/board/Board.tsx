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
            <header>Tic Tac Toe</header>
            <section className="tic-tac-players-information">
                <div className="players-name">
                    <div>
                        <label htmlFor="player-one">Player 1: </label>
                        <input id="player-one" className="tic-tac-input" maxLength={10}/>
                    </div>
                    <div>
                        <label htmlFor="player-two">Player 2: </label>
                        <input id="player-two" className="tic-tac-input" maxLength={10}/>
                    </div>
                </div>
                <div>
                    <table>
                        <tr>
                            <th>Player 1</th>
                            <th>Player 2</th>
                            <th>Draw</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </table>
                </div>
            </section>
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