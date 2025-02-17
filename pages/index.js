import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BreathingAnimation from '../components/BreathingAnimation';

const LiminalAnimation = () => {
  // The container holds space for transformation
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Creating a safe context for change
    const ctx = gsap.context(() => {
      // The eternal breath of renewal
      const mainTL = gsap.timeline({
        repeat: -1,
        defaults: { ease: "sine.inOut" }
      });

      // The rhythm of transformation
      mainTL
        .to(".liminal-circle", {
          scale: 1.03,  // Expansion
          opacity: 0.4, // Becoming
          duration: 3   // Time to process
        })
        .to(".liminal-circle", {
          scale: 1,     // Integration
          opacity: 0.2, // Grounding
          duration: 3   // Time to settle
        });
    }, containerRef);

    // Honoring the cycle of release
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={containerRef}>
      <BreathingAnimation />
    </div>
  );
};

export default LiminalAnimation;