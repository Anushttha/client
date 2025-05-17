'use client';
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Description from '../components/Description';
import SlidingImages from '../components/SlidingImages';
import Contact from '../components/Contact';
import useMousePosition from './utils/useMousePosition';

import { motion } from 'framer-motion';



export default function Home() {

  

  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();

  const size = isHovered ? 400 : 40;

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])



  return (
    <main className={styles.main}>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <Projects />
      <SlidingImages />
      <Contact />

      <motion.div 

        className={styles.mask}

        animate={{

          WebkitMaskPosition: `${x - (size/2)}px ${y - (size/2)}px`,

          WebkitMaskSize: `${size}px`,

        }}

        transition={{ type: "tween", ease: "backOut", duration:0.5}}

      >

          <p onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>

            A visual designer - with skills that haven't been replaced by A.I (yet) - making good shit only if the paycheck is equally good.

          </p>

      </motion.div>



      <div className={styles.body}>

        <p>I'm a <span>selectively skilled</span> product designer with strong focus on producing high quality & impactful digital experience.</p>

      </div>
      
    </main>
  )
}





