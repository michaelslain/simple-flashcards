import checkLanguage from '@/utils/checkLanguage'
import styles from './LanguageFont.module.scss'

interface LanguageFontProps {
    children: React.ReactNode
    text: string
}

const LanguageFont = ({ children, text }: LanguageFontProps) => {
    const language = checkLanguage(text)

    const getFontClass = () => {
        switch (language) {
            case 'hebrew':
                return styles.hebrew
            case 'russian':
                return styles.russian
            default:
                return styles.english
        }
    }

    return <span className={getFontClass()}>{children}</span>
}

export default LanguageFont
