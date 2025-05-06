'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/buttons/BackButton'
import Input from '@/components/Input'
import NextButton from '@/components/buttons/NextButton'
import Card from '@/components/cards/Card'
import { saveDeck } from '@/util/storage'
import { generateId } from '@/util/utils'
import { toast } from 'react-toastify'
import styles from './page.module.scss'

export default function NewDeck() {
    const [deckName, setDeckName] = useState('')
    const router = useRouter()

    const handleBackClick = () => {
        router.push('/')
    }

    const handleNextClick = () => {
        if (!deckName.trim()) {
            toast.error('Please enter a deck name')
            return
        }

        const newDeck = {
            id: generateId(),
            name: deckName,
            cards: [],
            createdAt: Date.now(),
        }

        saveDeck(newDeck)
        toast.success(`Deck "${deckName}" created successfully!`)
        router.push('/')
    }

    return (
        <main className={styles.newDeckPage}>
            <BackButton onClick={handleBackClick} />

            <Card className={styles.newDeckCard}>
                <Input
                    value={deckName}
                    onChange={e => setDeckName(e.target.value)}
                    placeholder="deck name..."
                    className={styles.deckNameInput}
                />
                <NextButton onClick={handleNextClick} />
            </Card>
        </main>
    )
}
