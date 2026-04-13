import { useMemo, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import SectionWrapper from '../common/SectionWrapper';
import ProjectCard from '../common/ProjectCard';
import Button from '../common/Button';
import { PROJECTS } from '../../data/content';
import { revealViewport, staggerCards } from '../../utils/motion';
import styles from './Projects.module.css';

const INITIAL_PROJECTS = 6;
const PROJECT_BATCH = 3;

function Projects({
  subtitle,
  summary = '',
  enableViewMore = true
}) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_PROJECTS);
  const visibleProjects = useMemo(
    () => (enableViewMore ? PROJECTS.slice(0, visibleCount) : PROJECTS),
    [enableViewMore, visibleCount]
  );
  const hasMore = enableViewMore && visibleCount < PROJECTS.length;
  const remaining = Math.max(PROJECTS.length - visibleCount, 0);

  const handleLoadMore = () => {
    setVisibleCount((current) => Math.min(current + PROJECT_BATCH, PROJECTS.length));
  };

  return (
    <SectionWrapper
      id="projects"
      title="Projects"
      subtitle={subtitle || 'Some of my top-rated projects out of many, focused on practical UX and real outcomes.'}
      summary={summary}
    >
      <Motion.div
        className={styles.grid}
        variants={staggerCards}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
      >
        {visibleProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </Motion.div>
      {hasMore && (
        <div className={styles.actions}>
          <Button type="button" onClick={handleLoadMore}>
            View More ({remaining})
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
}

export default Projects;
