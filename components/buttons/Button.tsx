import { FC, ButtonHTMLAttributes } from 'react'
import Text from '@/components/Text'
import styles from './Button.module.scss'

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <button className={`${styles.button} ${className}`} {...props}>
            <Text>{children}</Text>
        </button>
    )
}

export default Button
