import Button from '../common/Button';
import { motion as Motion } from 'framer-motion';
import SectionWrapper from '../common/SectionWrapper';
import { ABOUT_POINTS, CAREER_HIGHLIGHTS, WORK_AREAS, EDUCATION, PERSONAL_INFO } from '../../data/content';
import { cardReveal, revealViewport, staggerCards } from '../../utils/motion';
import styles from './About.module.css';

function About({
  subtitle = 'MERN-trained developer with internship + full-time industry experience',
  summary = '',
  showResume = false
}) {
  const resumeUrl = PERSONAL_INFO?.resumeUrl || '/assets/Abhi_Namdev_CV.pdf';

  return (
    <SectionWrapper
      id="about"
      title="About Me"
      subtitle={subtitle}
      summary={summary}
    >
      <Motion.div
        className={styles.grid}
        variants={staggerCards}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
      >
        <Motion.article className={styles.journey} variants={cardReveal} whileHover={{ y: -3 }} transition={{ duration: 0.16 }}>
          <h3>Professional Journey</h3>
          {ABOUT_POINTS.map((point) => (
            <p key={point}>{point}</p>
          ))}
        </Motion.article>

        <Motion.article className={`${styles.card} ${styles.highlights}`} variants={cardReveal} whileHover={{ y: -4 }} transition={{ duration: 0.16 }}>
          <h3>Career Highlights</h3>
          <ul>
            {CAREER_HIGHLIGHTS.map((item) => (
              <li key={item}>
                <strong>{item}</strong>
              </li>
            ))}
          </ul>
        </Motion.article>

        <Motion.article className={`${styles.card} ${styles.work}`} variants={cardReveal} whileHover={{ y: -4 }} transition={{ duration: 0.16 }}>
          <h3>Work Areas</h3>
          <div className={styles.pills}>
            {WORK_AREAS.map((area) => (
              <span key={area} className={styles.pill}>{area}</span>
            ))}
          </div>
        </Motion.article>

        <Motion.article className={`${styles.card} ${styles.education}`} variants={cardReveal} whileHover={{ y: -4 }} transition={{ duration: 0.16 }}>
          <h3>Education</h3>
          <ul>
            {EDUCATION.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.subtitle}</span>
              </li>
            ))}
          </ul>
        </Motion.article>

        {showResume && (
          <Motion.article className={`${styles.card} ${styles.resume}`} variants={cardReveal} whileHover={{ y: -4 }} transition={{ duration: 0.16 }}>
            <h3>Resume</h3>
            <div className={styles.resumeLayout}>
              <div className={styles.resumeViewer}>
                <iframe
                  src={`${resumeUrl}#toolbar=1&navpanes=0&view=FitH`}
                  title="Abhishek Namdev Resume"
                  loading="lazy"
                />
              </div>
              <div className={styles.resumePanel}>
                <h4>Quick Resume Actions</h4>
                <div className={styles.resumeActions}>
                  <Button as="a" href={resumeUrl} target="_blank" rel="noreferrer" variant="secondary">
                    View Now
                  </Button>
                  <Button as="a" href={resumeUrl} download>
                    Download Now
                  </Button>
                </div>
                <p className={styles.resumeMeta}>
                  Preview my CV on the left. You can open it in a new tab for full zoom controls or download it directly.
                </p>
                <ul className={styles.resumeList}>
                  <li>Full-stack MERN development profile</li>
                  <li>Training + internship + full-time experience</li>
                  <li>Ready for product and startup teams</li>
                </ul>
              </div>
            </div>
          </Motion.article>
        )}
      </Motion.div>
    </SectionWrapper>
  );
}

export default About;
