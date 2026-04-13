import clsx from 'clsx';
import styles from './Button.module.css';

function Button({ children, variant = 'primary', fullWidth = false, as = 'button', className, ...rest }) {
  const Component = as;

  return (
    <Component className={clsx(styles.button, styles[variant], fullWidth && styles.fullWidth, className)} {...rest}>
      {children}
    </Component>
  );
}

export default Button;
