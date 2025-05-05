import { FC, HTMLAttributes } from 'react';
import styles from './Subheading.module.scss';

const Subheading: FC<HTMLAttributes<HTMLHeadingElement>> = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <h2 className={`${styles.subheading} ${className}`} {...props}>
      {children}
    </h2>
  );
};

export default Subheading;