import Cell from './Cell'

export default function Stage({ stage }) {
    return (
        <div>
            {stage.map(row => {
                return row.map((cell, x) => {
                return <Cell key={x} type={cell[0]}/>
                })
            })}
        </div>
    )
}