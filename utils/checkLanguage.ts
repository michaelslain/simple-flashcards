const checkLanguage = (text: string): 'english' | 'hebrew' | 'russian' => {
    // Hebrew Unicode range
    const hebrewRegex = /[\u0590-\u05FF]/
    // Russian Unicode range
    const russianRegex = /[\u0400-\u04FF]/

    if (hebrewRegex.test(text)) return 'hebrew'
    if (russianRegex.test(text)) return 'russian'
    return 'english'
}

export default checkLanguage
