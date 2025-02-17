import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BreathingAnimation = () => {
  const containerRef = useRef(null);
  const waterCircleRef = useRef(null);
  const radiatingCircleRef = useRef(null);
  const wheelRef = useRef(null);

  useEffect(() => {
    // Create a master timeline for synchronized animations
    const masterTL = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power1.inOut" }
    });

    // Water circle breathing animation
    masterTL.to(waterCircleRef.current, {
      scale: 1.25,
      opacity: 0.5,
      duration: 6,
    }).to(waterCircleRef.current, {
      scale: 1,
      opacity: 0.2,
      duration: 6,
    });

    // Radiating circle animation
    gsap.to(radiatingCircleRef.current, {
      scale: 12,
      opacity: 0,
      duration: 12,
      repeat: -1,
      ease: "none"
    });

    // Wheel rotation
    gsap.to(wheelRef.current, {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: "none",
      transformOrigin: "center"
    });

    // Cleanup
    return () => {
      masterTL.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-[#2a3831]">
      <svg 
        viewBox="0 0 400 400" 
        className="w-96 h-96"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Base circle water flow */}
        <circle 
          ref={waterCircleRef}
          cx="200" 
          cy="200" 
          r="80" 
          fill="none" 
          stroke="#a3d4e5" 
          strokeWidth="2"
          className="opacity-20"
        />

        {/* Radiating circle */}
        <circle 
          ref={radiatingCircleRef}
          cx="200" 
          cy="200" 
          r="10" 
          fill="none" 
          stroke="#ffb599" 
          strokeWidth="1.5"
          className="opacity-0"
        />

        {/* Central wheel */}
        <g ref={wheelRef} transform="translate(200 200)">
          <path 
            d="M -30 0 L 30 0 M 0 -30 L 0 30" 
            stroke="#d4e6d9" 
            strokeWidth="1.5"
            className="opacity-50"
          />
        </g>
      </svg>
    </div>
  );
};

export default BreathingAnimation;