export const fadeUp = {
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

export const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const scaleHover = {
  whileHover: { y: -5, scale: 1.01 },
  transition: { duration: 0.2 }
};

export const sectionReveal = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const staggerCards = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06
    }
  }
};

export const cardReveal = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const revealViewport = {
  once: true,
  amount: 0.22
};
