export type Language = 'english' | 'russian' | 'hebrew'

const checkLanguage = (text: string): Language => {
    // Check for Hebrew characters (Unicode range)
    const hebrewRegex = /[\u0590-\u05FF]/
    if (hebrewRegex.test(text)) return 'hebrew'

    // Check for Cyrillic characters (Russian)
    const russianRegex = /[\u0400-\u04FF]/
    if (russianRegex.test(text)) return 'russian'

    // Default to English if no other matches
    // This assumes Latin characters or inability to detect others
    return 'english'
}

export default checkLanguage
