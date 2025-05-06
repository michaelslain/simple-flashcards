import { FC } from 'react'
import Card from '@/components/cards/Card'
import Heading from '@/components/Heading'
import SoundButton from '@/components/buttons/SoundButton'
import styles from './FrontCard.module.scss'

interface FrontCardProps {
    frontText: string
    deckId: string
    onClick?: () => void
}

const FrontCard: FC<FrontCardProps> = ({ frontText, deckId, onClick }) => {
    return (
        <Card className={styles.frontCard} onClick={onClick}>
            <Heading>{frontText}</Heading>
            <SoundButton text={frontText} />
        </Card>
    )
}

export default FrontCard
