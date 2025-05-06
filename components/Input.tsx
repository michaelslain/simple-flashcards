import { FC, InputHTMLAttributes, useState } from 'react'
import styles from './Input.module.scss'
import fontStyles from './LanguageFont.module.scss'
import checkLanguage from '../util/checkLanguage'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
    className = '',
    ...props
}) => {
    const [value, setValue] = useState(props.value?.toString() || '')
    const language = checkLanguage(value)
    const fontClass =
        language === 'hebrew'
            ? fontStyles.hebrew
            : language === 'russian'
            ? fontStyles.russian
            : fontStyles.english

    return (
        <input
            className={`${styles.input} ${fontClass} ${className}`}
            {...props}
            value={value}
            onChange={e => {
                setValue(e.target.value)
                props.onChange?.(e)
            }}
        />
    )
}

export default Input
