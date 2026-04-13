import styles from './SkeletonCard.module.css';

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.lineLg} />
      <div className={styles.lineMd} />
      <div className={styles.lineSm} />
    </div>
  );
}

export default SkeletonCard;
