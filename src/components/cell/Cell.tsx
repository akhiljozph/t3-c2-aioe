import "./Cell.css";

interface CellProps {
    onCellClick: () => void;
    value?: string;
}

function Cell(props: CellProps) {
    return (
        <button className="tic-tac-cell" onClick={props?.onCellClick}>
            {props?.value}
        </button>
    )
};
export default Cell;