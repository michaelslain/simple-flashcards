import { FC, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
    className = '',
    ...props
}) => {
    return <input className={`${styles.input} ${className}`} {...props} />
}

export default Input
