import { motion as Motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Button from "./Button";
import { cardReveal } from "../../utils/motion";
import styles from "./ProjectCard.module.css";

function ProjectCard({ project }) {
  const safeProject = {
    title: project?.title || "Untitled Project",
    description:
      project?.description || "Project description not available yet.",
    techStack:
      Array.isArray(project?.techStack) && project.techStack.length
        ? project.techStack
        : ["MERN"],
    liveLink: project?.liveLink || "",
    framework: project?.framework || "",
  };

  const specialTags = ["Training Project", "Internship Project"];
  const displayTags = safeProject.techStack.filter(tag => !specialTags.includes(tag));
  const highlightedTags = safeProject.techStack.filter(tag => specialTags.includes(tag));

  return (
    <Motion.article
      className={styles.card}
      initial="hidden"
      animate="show"
      variants={cardReveal}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.18 }}
    >
      {highlightedTags.length > 0 && (
        <div className={styles.highlightedTags}>
          {highlightedTags.map(tag => (
            <span key={tag} className={styles.highlightedTag}>{tag}</span>
          ))}
        </div>
      )}
      <h3>{safeProject.title}</h3>
      <p>{safeProject.description}</p>
      <div className={styles.tags}>
        {displayTags.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div className={styles.actions}>
        {safeProject.liveLink && (
          <Button
            as="a"
            href={safeProject.liveLink}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            Open Project <ArrowUpRight size={16} />
          </Button>
        )}
        {safeProject.framework && (
          <span className={styles.framework}>{safeProject.framework}</span>
        )}
      </div>
    </Motion.article>
  );
}

export default ProjectCard;
