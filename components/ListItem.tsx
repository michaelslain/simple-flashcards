import { FC, ReactNode } from 'react'
import Text from './Text'
import EditButton from './buttons/EditButton'
import DeleteButton from './buttons/DeleteButton'
import styles from './ListItem.module.scss'

interface ListItemProps {
    children: ReactNode
    onEdit?: () => void
    onDelete?: () => void
    percentText?: string
    className?: string
}

const ListItem: FC<ListItemProps> = ({
    children,
    onEdit,
    onDelete,
    percentText,
    className = '',
}) => {
    return (
        <div className={`${styles.listItem} ${className}`}>
            <div className={styles.content}>
                <Text>{children}</Text>
            </div>
            <div className={styles.actions}>
                {onEdit && <EditButton onClick={onEdit} />}
                {onDelete && <DeleteButton onClick={onDelete} />}
                {percentText && (
                    <Text className={styles.percent}>{percentText}%</Text>
                )}
            </div>
        </div>
    )
}

export default ListItem
