import { PERSONAL_INFO } from '../../data/content';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
