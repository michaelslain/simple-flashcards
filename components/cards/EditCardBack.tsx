import { FC } from 'react'
import Card from './cards/Card'
import Input from './Input'
import NextButton from './NextButton'
import styles from './EditCardBack.module.scss'

interface EditCardBackProps {
    backText: string
    onBackTextChange: (text: string) => void
    deckId: string
    onNext: () => void
}

const EditCardBack: FC<EditCardBackProps> = ({
    backText,
    onBackTextChange,
    deckId,
    onNext,
}) => {
    return (
        <Card className={styles.editCardBack}>
            <Input
                value={backText}
                onChange={e => onBackTextChange(e.target.value)}
                placeholder="back..."
                className={styles.backInput}
            />
            <NextButton onClick={onNext} />
        </Card>
    )
}

export default EditCardBack
