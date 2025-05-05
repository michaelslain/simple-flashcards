import { FC, ButtonHTMLAttributes } from 'react';
import Button from './Button';
import styles from './BackButton.module.scss';

type BackButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

const BackButton: FC<BackButtonProps> = ({ className = '', ...props }) => {
  return (
    <Button className={`${styles.backButton} ${className}`} {...props}>
      ←
    </Button>
  );
};

export default BackButton;