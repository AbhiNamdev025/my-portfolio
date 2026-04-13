import { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import Button from '../common/Button';
import { PERSONAL_INFO } from '../../data/content';
import styles from './Hero.module.css';

const defaultRoles = ['MERN Developer', 'React Native Developer'];

const heroStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const heroReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const safeInfo = {
    name: PERSONAL_INFO?.name || 'Abhishek Namdev',
    subtitle:
      PERSONAL_INFO?.subtitle ||
      'Building reliable full-stack products with modern UI and great user experience.',
    roleRotator:
      Array.isArray(PERSONAL_INFO?.roleRotator) && PERSONAL_INFO.roleRotator.length
        ? PERSONAL_INFO.roleRotator
        : defaultRoles,
    socialLinks: {
      github: PERSONAL_INFO?.socialLinks?.github || '#',
      linkedin: PERSONAL_INFO?.socialLinks?.linkedin || '#',
      twitter: PERSONAL_INFO?.socialLinks?.twitter || '#',
      instagram: PERSONAL_INFO?.socialLinks?.instagram || '#'
    }
  };

  useEffect(() => {
    if (safeInfo.roleRotator.length < 2) return undefined;

    const interval = setInterval(() => {
      setTitleIndex((index) => (index + 1) % safeInfo.roleRotator.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [safeInfo.roleRotator.length]);

  return (
    <Motion.section
      id="home"
      className={styles.hero}
      initial="hidden"
      animate="show"
      variants={heroStagger}
    >
      <Motion.div className={styles.container} variants={heroReveal}>
        <div className={styles.content}>
          <Motion.div
            className={styles.imageWrap}
            variants={heroReveal}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src="/assets/main.jpg" alt={safeInfo.name} loading="eager" fetchPriority="high" />
          </Motion.div>

          <Motion.div variants={heroStagger}>
            <Motion.p className={styles.kicker} variants={heroReveal}>Open to full-stack opportunities</Motion.p>
            <Motion.h1 variants={heroReveal}>
              Hi, I&apos;m <span>{safeInfo.name}</span>
            </Motion.h1>
            <div className={styles.rotatorWrap}>
              <AnimatePresence mode="wait">
                <Motion.p
                  key={safeInfo.roleRotator[titleIndex] || safeInfo.roleRotator[0]}
                  className={styles.rotator}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {safeInfo.roleRotator[titleIndex] || safeInfo.roleRotator[0]}
                </Motion.p>
              </AnimatePresence>
            </div>
            <Motion.p className={styles.subtitle} variants={heroReveal}>{safeInfo.subtitle}</Motion.p>
            <Motion.p className={styles.summary} variants={heroReveal}>
              Focused on modern MERN products, polished mobile-ready UI, and real business workflows from idea to deployment.
            </Motion.p>

            <Motion.div className={styles.cta} variants={heroReveal}>
              <Button as={Link} to="/contact">Get In Touch</Button>
              <Button as={Link} to="/projects" variant="secondary">View Work</Button>
            </Motion.div>

            <Motion.div className={styles.socials} variants={heroReveal}>
              <Motion.a whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }} href={safeInfo.socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={18} /></Motion.a>
              <Motion.a whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }} href={safeInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={18} /></Motion.a>
              <Motion.a whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }} href={safeInfo.socialLinks.twitter} target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter size={18} /></Motion.a>
              <Motion.a whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }} href={safeInfo.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={18} /></Motion.a>
            </Motion.div>
          </Motion.div>
        </div>
      </Motion.div>

      <Motion.div variants={heroReveal}>
        <Link to="/about" className={styles.scrollHint}>
        Scroll <ArrowDown size={15} />
        </Link>
      </Motion.div>
    </Motion.section>
  );
}

export default Hero;
