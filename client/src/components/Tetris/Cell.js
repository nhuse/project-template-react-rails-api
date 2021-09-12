import { StyledCell } from './styles/CellStyle'
import { TETROMINOS } from './tetriminos'

export default function Cell({ type }) {
    console.log(type)
    return <StyledCell type={'O'} color={TETROMINOS['O'].color}>cell</StyledCell>
}