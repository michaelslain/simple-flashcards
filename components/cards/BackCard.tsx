import { FC } from 'react'
import Card from '@/components/cards/Card'
import Heading from '@/components/Heading'
import Subheading from '@/components/Subheading'
import Button from '@/components/buttons/Button'
import SoundButton from '@/components/buttons/SoundButton'
import styles from './BackCard.module.scss'

interface BackCardProps {
    frontText: string
    backText: string
    deckId: string
    onRating: (rating: number) => void
}

const BackCard: FC<BackCardProps> = ({
    frontText,
    backText,
    deckId,
    onRating,
}) => {
    return (
        <Card className={styles.backCard}>
            <Subheading className={styles.frontText}>{frontText}</Subheading>
            <Heading className={styles.backText}>{backText}</Heading>
            <SoundButton text={backText} />

            <div className={styles.ratings}>
                <Button
                    className={`${styles.ratingButton} rating-impossible`}
                    onClick={() => onRating(-2)}
                >
                    -2
                </Button>
                <Button
                    className={`${styles.ratingButton} rating-hard`}
                    onClick={() => onRating(-1)}
                >
                    -1
                </Button>
                <Button
                    className={`${styles.ratingButton} rating-easy`}
                    onClick={() => onRating(1)}
                >
                    +1
                </Button>
                <Button
                    className={`${styles.ratingButton} rating-too-easy`}
                    onClick={() => onRating(2)}
                >
                    +2
                </Button>
            </div>
        </Card>
    )
}

export default BackCard
