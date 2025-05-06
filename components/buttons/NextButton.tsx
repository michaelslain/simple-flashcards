import { FC, ButtonHTMLAttributes } from 'react';
import Button from './Button';
import styles from './NextButton.module.scss';

type NextButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

const NextButton: FC<NextButtonProps> = ({ className = '', ...props }) => {
  return (
    <Button className={`${styles.nextButton} ${className}`} {...props}>
      →
    </Button>
  );
};

export default NextButton;