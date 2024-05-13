import { AnimatePresence, motion } from 'framer-motion';

// const styles = css`
//   padding: 1rem;
//   font-size: 1.6rem;
//   box-shadow: 2px 2px 4px 2px #ccc;
//   max-width: 500px;
//   margin: 2rem auto;
// `;

const Fade = ({ children, isActive }) => {
  return (
    <AnimatePresence>
      <motion.div
        style={{ height: '100vh', width: '100vw' }}
        initial={{ opacity: 0, y: "100%"}}
        animate={{ opacity: 1, y: 0}}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Fade;
