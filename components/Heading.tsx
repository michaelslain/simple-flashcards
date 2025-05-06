import { FC, HTMLAttributes } from 'react'
import styles from './Heading.module.scss'
import LanguageFont from './LanguageFont'

const Heading: FC<HTMLAttributes<HTMLHeadingElement>> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <h1 className={`${styles.heading} ${className}`} {...props}>
            <LanguageFont text={children?.toString() || ''}>
                {children}
            </LanguageFont>
        </h1>
    )
}

export default Heading
