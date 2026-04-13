import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.toggle} onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}

export default ThemeToggle;
