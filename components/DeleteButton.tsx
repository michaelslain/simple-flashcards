import { FC, ButtonHTMLAttributes } from 'react';
import Button from './Button';
import styles from './DeleteButton.module.scss';

type DeleteButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

const DeleteButton: FC<DeleteButtonProps> = ({ className = '', ...props }) => {
  return (
    <Button className={`${styles.deleteButton} ${className}`} {...props}>
      x
    </Button>
  );
};

export default DeleteButton;