import { motion } from "framer-motion";

const MotionDiv = motion.div;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

  
const PageWrapper = ({ children }) => (
  <MotionDiv
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={{ duration: 0.5 }}
  >
    {children}
  </MotionDiv>
);

export default PageWrapper;
