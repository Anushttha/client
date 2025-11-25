'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton'; // Ensure this path is correct for your project
import Magnetic from '../../common/Magnetic'; // Ensure this path is correct for your project

export default function Header() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);

    useEffect(() => {
        if (isActive) setIsActive(false);
    }, [pathname]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        // Use matchMedia for responsive animations
        let mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            // DESKTOP: Button hidden at top, appears on scroll
            gsap.set(button.current, { scale: 0 }); 
            
            gsap.to(button.current, {
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 0,
                    end: window.innerHeight,
                    onLeave: () => { gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" }) },
                    onEnterBack: () => { gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" }); setIsActive(false); }
                }
            });
        });

        mm.add("(max-width: 768px)", () => {
            // MOBILE: Button always visible
            gsap.set(button.current, { scale: 1 });
        });

        return () => mm.revert(); // Cleanup
    }, []);

    return (
        <>
            <div ref={header} className={styles.header}>
                <div className={styles.logo}>
                    <p className={styles.copyright}>©</p>
                    <div className={styles.name}>
                        <p className={styles.codeBy}>Code by</p>
                        <p className={styles.dennis}>Anushttha</p>
                    </div>
                </div>
                <div className={styles.nav}>
                    <Magnetic>
                        <div className={styles.el}>
                            <a>Work</a>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                    <Magnetic>
                        <div className={styles.el}>
                            <a href='#'>About</a>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                    <Magnetic>
                        <div className={styles.el}>
                            <a>Contact</a>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                </div>
            </div>
            
            {/* Button Container */}
            <div ref={button} className={styles.headerButtonContainer}>
                <Rounded onClick={() => { setIsActive(!isActive) }} className={`${styles.button}`}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                </Rounded>
            </div>

            {/* Navigation Overlay */}
            <AnimatePresence mode="wait">
                {isActive && <Nav />}
            </AnimatePresence>
        </>
    );
}