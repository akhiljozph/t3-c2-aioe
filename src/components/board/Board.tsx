import Cell from "../cell/Cell";

import "./Board.css";

function Board() {

    const cells = Array(9).fill(null);
    const cellValue = 'X';

    const handleClick = () => {
        console.log('Clicked');
    }

    return (
        <section className="tic-tac-wrapper">
            <div className="tic-tac-board">
                {cells.map((cell, cellIndex) => (
                    <Cell key={cellIndex} onCellClick={handleClick} value={cell} />
                ))}
            </div>
        </section>
    )
}
export default Board;