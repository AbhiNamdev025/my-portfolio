import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <section className={styles.wrap}>
      <div className={styles.card}>
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <Button as={Link} to="/">Back to Home</Button>
      </div>
    </section>
  );
}

export default NotFoundPage;
