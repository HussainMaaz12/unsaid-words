import { motion } from 'framer-motion';

const PageTransition = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '20px'
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
