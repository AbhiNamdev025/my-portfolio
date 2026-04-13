import { motion as Motion } from 'framer-motion';
import { revealViewport, sectionReveal } from '../../utils/motion';
import styles from './SectionWrapper.module.css';

function SectionWrapper({ id, title, subtitle, summary, children }) {
  return (
    <Motion.section
      id={id}
      className={styles.section}
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
    >
      <div className={styles.container}>
        {(title || subtitle || summary) && (
          <Motion.header className={styles.header} variants={sectionReveal}>
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
            {summary && <div className={styles.summary}>{summary}</div>}
          </Motion.header>
        )}
        {children}
      </div>
    </Motion.section>
  );
}

export default SectionWrapper;
