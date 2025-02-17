import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BreathingAnimation from '../components/BreathingAnimation';

const LiminalAnimation = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous animation loop (6 seconds total)
      const mainTL = gsap.timeline({
        repeat: -1,
        defaults: { ease: "sine.inOut" }
      });

      mainTL
        .to(".liminal-circle", {
          scale: 1.03,
          opacity: 0.4,
          duration: 3
        })
        .to(".liminal-circle", {
          scale: 1,
          opacity: 0.2,
          duration: 3
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={containerRef}>
      <BreathingAnimation />
    </div>
  );
};

export default LiminalAnimation;