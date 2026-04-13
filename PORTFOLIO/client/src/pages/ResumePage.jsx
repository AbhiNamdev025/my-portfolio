import Button from '../components/common/Button';
import { PERSONAL_INFO } from '../data/content';
import styles from './ResumePage.module.css';

function ResumePage() {
  const resumeUrl = PERSONAL_INFO?.resumeUrl || '/assets/Abhi_Namdev_CV.pdf';

  return (
    <section className={styles.wrap}>
      <div className={styles.card}>
        <h1>Resume</h1>
        <p>View my latest resume in a new tab or download it instantly.</p>
        <div className={styles.actions}>
          <Button as="a" href={resumeUrl} target="_blank" rel="noreferrer" variant="secondary">
            View Now
          </Button>
          <Button as="a" href={resumeUrl} download>
            Download Now
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ResumePage;
