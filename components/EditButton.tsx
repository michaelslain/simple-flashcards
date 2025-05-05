import { FC, ButtonHTMLAttributes } from 'react';
import Button from './Button';
import styles from './EditButton.module.scss';

type EditButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

const EditButton: FC<EditButtonProps> = ({ className = '', ...props }) => {
  return (
    <Button className={`${styles.editButton} ${className}`} {...props}>
      ...
    </Button>
  );
};

export default EditButton;