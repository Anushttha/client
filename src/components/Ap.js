"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './style.module.scss';



function Ap() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [cursorVariant, setCursorVariant] = useState("default");


  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    }
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    
  }

 


  return (
    
      <motion.div
        className={styles.cursor2}
        variants={variants}
        animate={cursorVariant}
      />
   
  );
}

export default Ap;