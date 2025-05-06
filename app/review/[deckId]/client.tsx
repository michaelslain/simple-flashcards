'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import FrontCard from '@/components/FrontCard'
import ErrorHandler from '@/components/ErrorHandler'
import { getDeck } from '@/util/storage'
import { Card } from '@/util/types'
import { getNextCardToReview } from '@/util/utils'
import styles from './page.module.scss'
import Subheading from '@/components/Subheading'

export default function ReviewFrontClient({ deckId }: { deckId: string }) {
    const [currentCard, setCurrentCard] = useState<Card | null>(null)
    const [deckName, setDeckName] = useState('')
    const router = useRouter()

    useEffect(() => {
        const deck = getDeck(deckId)
        if (deck) {
            setDeckName(deck.name)

            // Always show cards if there are any
            if (deck.cards && deck.cards.length > 0) {
                const nextCard = getNextCardToReview(deck.cards)
                setCurrentCard(nextCard || deck.cards[0]) // Fallback to first card if no next card
            } else {
                setCurrentCard(null) // Only null if truly no cards
            }
        } else {
            router.push('/')
        }
    }, [deckId, router])

    const handleBackClick = () => {
        router.push('/')
    }

    const handleCardClick = () => {
        if (currentCard) {
            router.push(`/review/${deckId}/back?cardId=${currentCard.id}`)
        }
    }

    return (
        <ErrorHandler>
            <main className={styles.reviewFrontPage}>
                <BackButton onClick={handleBackClick} />

                <Subheading className={styles.deckName}>{deckName}</Subheading>

                {currentCard ? (
                    <FrontCard
                        frontText={currentCard.frontText}
                        deckId={deckId}
                        onClick={handleCardClick}
                    />
                ) : (
                    <div className={styles.noCardsMessage}>
                        <p>This deck is empty. Add some cards first.</p>
                    </div>
                )}
            </main>
        </ErrorHandler>
    )
}
