import { FC, HTMLAttributes } from 'react'
import styles from './Text.module.scss'
import LanguageFont from './LanguageFont'

const Text: FC<HTMLAttributes<HTMLParagraphElement>> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <p className={`${styles.text} ${className}`} {...props}>
            <LanguageFont text={children?.toString() || ''}>
                {children}
            </LanguageFont>
        </p>
    )
}

export default Text
