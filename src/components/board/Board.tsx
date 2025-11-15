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
            <header>
                <h1>Tic Tac Toe</h1>
            </header>

            <section className="tic-tac-players-information">
                <form className="players-name">
                    <div>
                        <label htmlFor="player-one">Player 1:&nbsp;</label>
                        <input
                            id="player-one"
                            className="tic-tac-input"
                            maxLength={10}
                        />
                    </div>

                    <div>
                        <label htmlFor="player-two">Player 2:&nbsp;</label>
                        <input
                            id="player-two"
                            className="tic-tac-input"
                            maxLength={10}
                        />
                    </div>
                </form>

                <section aria-labelledby="scoreboard-title">
                    <h2 id="scoreboard-title" className="visually-hidden">Scoreboard</h2>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Player 1</th>
                                <th scope="col">Player 2</th>
                                <th scope="col">Draw</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </section>

            <p role="alert" className="tic-tac-alert">Player 1 won!</p>

            <section className="tic-tac-board" aria-label="Game board">
                {cells.map((cell, cellIndex) => (
                    <Cell
                        key={cellIndex}
                        onCellClick={() => handleClick(cellIndex)}
                        value={cell}
                    />
                ))}
            </section>

            <button className="reset-btn" onClick={resetProgress}>
                Reset Game
            </button>
        </section>

    )
}
export default Board;