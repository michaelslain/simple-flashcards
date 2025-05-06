import { FC } from 'react'
import Card from './Card'
import Input from '../Input'
import NextButton from '../buttons/NextButton'
import styles from './EditCardFront.module.scss'

interface EditCardFrontProps {
    frontText: string
    onFrontTextChange: (text: string) => void
    deckId: string
    onNext: () => void
}

const EditCardFront: FC<EditCardFrontProps> = ({
    frontText,
    onFrontTextChange,
    deckId,
    onNext,
}) => {
    return (
        <Card className={styles.editCardFront}>
            <Input
                value={frontText}
                onChange={e => onFrontTextChange(e.target.value)}
                placeholder="front..."
                className={styles.frontInput}
            />
            <NextButton onClick={onNext} />
        </Card>
    )
}

export default EditCardFront
