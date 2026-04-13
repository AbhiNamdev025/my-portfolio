import { useMemo, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Code2, Database, GitBranch, Globe, Monitor, PenTool, Server, Workflow } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import Button from '../common/Button';
import { SKILLS } from '../../data/content';
import { cardReveal, revealViewport, staggerCards } from '../../utils/motion';
import styles from './Skills.module.css';

const iconMap = [Code2, Globe, Monitor, PenTool, GitBranch, Workflow, Server, Database, Code2];
const defaultSkills = [{ name: 'MERN Stack', group: 'Full Stack' }, { name: 'React Native', group: 'Mobile' }, { name: 'Figma', group: 'Design' }, { name: 'AI Tools', group: 'Productivity' }];
const PAGE_SIZE = 12;

function Skills({
  enablePagination = true,
  subtitle,
  summary = ''
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const skillList = Array.isArray(SKILLS) && SKILLS.length ? SKILLS : defaultSkills;
  const visibleSkills = useMemo(
    () => (enablePagination ? skillList.slice(0, visibleCount) : skillList),
    [enablePagination, skillList, visibleCount]
  );
  const hasMore = visibleCount < skillList.length;

  const handleLoadMore = () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + PAGE_SIZE, skillList.length));
      setIsLoadingMore(false);
    }, 650);
  };

  return (
    <SectionWrapper
      id="skills"
      title="Skills"
      subtitle={subtitle || 'MERN + React Native + Figma + AI tooling for modern product development'}
      summary={summary}
    >
      <Motion.div
        className={styles.grid}
        variants={staggerCards}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
      >
        {visibleSkills.map((skill, index) => {
          const Icon = iconMap[index % iconMap.length];
          return (
            <Motion.div key={`${skill.name}-${skill.group}`} className={styles.card} variants={cardReveal} whileHover={{ y: -5 }} transition={{ duration: 0.18 }}>
              <Icon size={20} />
              <span className={styles.name}>{skill.name}</span>
              <small className={styles.group}>{skill.group}</small>
            </Motion.div>
          );
        })}
      </Motion.div>
      {enablePagination && hasMore && (
        <div className={styles.loadMoreWrap}>
          <Button type="button" onClick={handleLoadMore} disabled={isLoadingMore}>
            {isLoadingMore ? (
              <span className={styles.loader} aria-label="Loading more skills" />
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
}

export default Skills;
