import { FC, HTMLAttributes } from 'react';
import styles from './Text.module.scss';

const Text: FC<HTMLAttributes<HTMLParagraphElement>> = ({ children, className = '', ...props }) => {
  return (
    <p className={`${styles.text} ${className}`} {...props}>
      {children}
    </p>
  );
};

export default Text;