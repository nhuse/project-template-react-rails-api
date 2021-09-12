import { ButtonStyle } from "./styles/ButtonStyles"

export default function StartButton({ cb }) {
    return <ButtonStyle onClick={cb}>Start Game</ButtonStyle>
}