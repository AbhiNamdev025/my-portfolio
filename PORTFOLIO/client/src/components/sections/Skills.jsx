import { useMemo, useState } from 'react';
import { Bot, Braces, Clapperboard, Cloud, Code2, Database, GitBranch, Megaphone, MessageSquare, Palette, PenTool, Server, Smartphone, Workflow } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import Button from '../common/Button';
import { SKILLS } from '../../data/content';
import styles from './Skills.module.css';

const defaultSkills = [{ name: 'MERN Stack', group: 'Full Stack' }, { name: 'React Native', group: 'Mobile' }, { name: 'Figma', group: 'Design' }, { name: 'AI Tools', group: 'Productivity' }];
const PAGE_SIZE = 12;

const iconByName = {
  HTML5: Code2,
  CSS3: Braces,
  JavaScript: Braces,
  React: Workflow,
  'Framer Motion': Workflow,
  'Node.js': Server,
  'Express.js': Server,
  'REST APIs': MessageSquare,
  MongoDB: Database,
  Mongoose: Database,
  'React Native': Smartphone,
  Expo: Smartphone,
  Figma: PenTool,
  Canva: Palette,
  CapCut: Clapperboard,
  'UI/UX Design': Palette,
  Wireframing: PenTool,
  'Social Media Managing': Megaphone,
  Git: GitBranch,
  GitHub: GitBranch,
  Vercel: Cloud,
  Postman: MessageSquare,
  ChatGPT: Bot,
  'Prompt Engineering': MessageSquare
};

const iconByGroup = {
  Frontend: Braces,
  Backend: Server,
  Database: Database,
  Mobile: Smartphone,
  Design: Palette,
  Marketing: Megaphone,
  DevOps: Cloud,
  'AI Tools': Bot
};

function Skills({
  enablePagination = true,
  subtitle,
  summary = ''
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const skillList = useMemo(() => {
    const sourceList = Array.isArray(SKILLS) && SKILLS.length ? SKILLS : defaultSkills;

    return sourceList.map((skill, index) => {
      if (typeof skill === 'string') {
        return { name: skill, group: 'General' };
      }

      const name = typeof skill?.name === 'string' ? skill.name.trim() : '';
      const group = typeof skill?.group === 'string' ? skill.group.trim() : '';

      return {
        name: name || `Skill ${index + 1}`,
        group: group || 'General'
      };
    });
  }, []);
  const visibleSkills = useMemo(
    () => (enablePagination ? skillList.slice(0, visibleCount) : skillList),
    [enablePagination, skillList, visibleCount]
  );
  const hasMore = enablePagination && visibleCount < skillList.length;

  const handleLoadMore = () => {
    if (!hasMore) return;
    setVisibleCount((count) => Math.min(count + PAGE_SIZE, skillList.length));
  };

  return (
    <SectionWrapper
      id="skills"
      title="Skills"
      subtitle={subtitle || 'MERN + React Native + Figma + AI tooling for modern product development'}
      summary={summary}
    >
      <div className={styles.grid}>
        {visibleSkills.map((skill, index) => {
          const Icon = iconByName[skill.name] || iconByGroup[skill.group] || Code2;
          return (
            <div key={`${skill.name}-${skill.group}-${index}`} className={styles.card}>
              <Icon size={20} />
              <span className={styles.name}>{skill.name}</span>
              <small className={styles.group}>{skill.group}</small>
            </div>
          );
        })}
        {!visibleSkills.length && (
          <div className={styles.emptyState}>
            Skills data is currently unavailable.
          </div>
        )}
      </div>
      {hasMore && (
        <div className={styles.loadMoreWrap}>
          <Button type="button" onClick={handleLoadMore}>Load More</Button>
        </div>
      )}
    </SectionWrapper>
  );
}

export default Skills;
