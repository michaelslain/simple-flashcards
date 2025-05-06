import { FC, HTMLAttributes } from 'react'
import styles from './Subheading.module.scss'
import LanguageFont from './LanguageFont'

const Subheading: FC<HTMLAttributes<HTMLHeadingElement>> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <h2 className={`${styles.subheading} ${className}`} {...props}>
            <LanguageFont text={children?.toString() || ''}>
                {children}
            </LanguageFont>
        </h2>
    )
}

export default Subheading
