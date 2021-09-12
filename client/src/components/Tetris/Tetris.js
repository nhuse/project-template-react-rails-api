import Stage from './Stage'
import { createStage } from './gameHelpers'
import Display from './Display'
import StartButton from './StartButton'
import { StyledTetris } from './styles/TetrisStyle'

export default function Tetris() {

    console.log(createStage())
    return (
    <StyledTetris>
        <Stage stage={createStage()}/>
        <aside>
            <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
            </div>
            <StartButton />
        </aside>
    </StyledTetris>
    )
}