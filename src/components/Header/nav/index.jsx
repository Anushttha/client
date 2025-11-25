import React, { useState } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../animation'; // Ensure this path is correct
import Link from './Link';
import Curve from './Curve';
import Footer from './Footer';
import Ap from '@/components/Ap';

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Work",
    href: "https://www.instagram.com/it.z_anushttha/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

export default function index() {

  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit" 
      className={styles.menu}
      >
       <div className={styles.body}>
            <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className={styles.nav}>
                    <div className={styles.header}>
                        <p>Navigation</p>
                    </div>
                    {
                      navItems.map( (data, index) => {
                        return <Link 
                        key={index} 
                        data={{...data, index}} 
                        isActive={selectedIndicator == data.href} 
                        setSelectedIndicator={setSelectedIndicator}>
                        </Link>
                      })
                    }
            </div>
            <Footer />
        </div>
        
        {/* Wrapped Curve to control visibility on mobile */}
        <div className={styles.curveWrapper}>
            <Curve />
        </div>
        
        <Ap/>
    </motion.div>
  )
}