import { useEffect, useState } from "react";

import Cell from "../cell/Cell";

import "./Board.css";

function Board() {
    const winningSeries = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const [cells, setCells] = useState<string[]>(Array(9).fill(''));
    const [clickTracer, setClickTracer] = useState(0);
    const [result, setResult] = useState('');
    const [playerOne, setPlayerOne] = useState('Player 1');
    const [playerTwo, setPlayerTwo] = useState('Player 2');
    const [winningValues, setWinningValues] = useState({
        playerOne: 0,
        playerTwo: 0,
        draw: 0
    });

    useEffect(() => {
        checkForTheWinner();
    }, [cells]);

    const checkForTheWinner = () => {
        if (cells.every((cell) => cell === '')) return;

        let xValues: number[] = [];
        let oValues: number[] = [];

        cells.forEach((cell, index) => {
            if (cell === 'X') {
                xValues.push(index);
            } else if (cell === 'O') {
                oValues.push(index);
            }
        });

        if (xValues.length < 3 && oValues.length < 3) return;

        winningSeries.forEach((series) => {
            console.log(cells);
            if (series.every((value) => xValues.includes(value))) {
                setResult(`${playerOne} won!`);
                setWinningValues(prev => ({
                    ...prev,
                    playerOne: prev.playerOne + 1
                }));
            } else if (series.every((value) => oValues.includes(value))) {
                setResult(`${playerTwo} won!`);
                setWinningValues(prev => ({
                    ...prev,
                    playerTwo: prev.playerTwo + 1
                }));
            } else if (cells.every((cell) => cell !== '')) {
                setResult(`It's a draw!`);
                setWinningValues(prev => ({
                    ...prev,
                    draw: prev.draw + 1
                }));
            }
        });
    }

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

    const setPlayerOneValues = (event: any) => {
        setPlayerOne(event.target.value);
    }

    const setPlayerTwoValues = (event: any) => {
        setPlayerTwo(event.target.value);
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
                            onKeyUp={(event) => setPlayerOneValues(event)}
                        />
                    </div>

                    <div>
                        <label htmlFor="player-two">Player 2:&nbsp;</label>
                        <input
                            id="player-two"
                            className="tic-tac-input"
                            maxLength={10}
                            onKeyUp={(event) => setPlayerTwoValues(event)}
                        />
                    </div>
                </form>

                <section aria-labelledby="scoreboard-title">
                    <h2 id="scoreboard-title" className="visually-hidden">Scoreboard</h2>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">{playerOne}</th>
                                <th scope="col">{playerTwo}</th>
                                <th scope="col">Draw</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{winningValues?.playerOne}</td>
                                <td>{winningValues?.playerTwo}</td>
                                <td>{winningValues?.draw}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </section>

            <p role="alert" className="tic-tac-alert">{result}</p>

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