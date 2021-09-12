import { StyledCell } from './styles/CellStyle'
import { TETROMINOS } from './tetriminos'

export default function Cell({ type }) {
    console.log(type)
    return <StyledCell type={type} color={TETROMINOS[type].color} />
}