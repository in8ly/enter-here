import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const BreathingAnimation = () => {
  const svgRef = useRef(null);
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showTimestamp, setShowTimestamp] = useState(false);
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const fullText = '> welcome to liminal space_';
  
  useEffect(() => {
    if (isIOS) {
      // Phoenix transformation animation
      const timeline = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power1.inOut" }
      });

      timeline
        .to(".breathing-circle", {
          scale: 1.03,
          opacity: 0.4,
          duration: 4,
          yoyo: true
        })
        .to(".phoenix-center", {
          scale: 1.1,
          rotation: 5,
          opacity: 0.7,
          duration: 3,
          yoyo: true
        }, "<")
        .to(".soul-point", {
          scale: 1.5,
          opacity: 0.9,
          duration: 2,
          yoyo: true
        }, "<");
    }

    // Show timestamp after 15 seconds
    const timestampTimeout = setTimeout(() => {
      setShowTimestamp(true);
    }, 15000);

    // Typewriter effect
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
      return () => {
        clearTimeout(timeout);
        clearTimeout(timestampTimeout);
      };
    } else {
      const cursorTimeout = setTimeout(() => setShowCursor(false), 1000);
      return () => {
        clearTimeout(cursorTimeout);
        clearTimeout(timestampTimeout);
      };
    }
  }, [text]);

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-shadow-depth">
      <div className="w-full max-w-2xl mb-8 font-mono text-lavender-mist">
        <p className="text-sm h-6 opacity-60">
          {text}
          {showCursor && <span className="animate-blink">|</span>}
        </p>
        {showTimestamp && (
          <p className="text-sm h-6 animate-fade-in">
            {'>'} {currentTime}
          </p>
        )}
      </div>

      {/* Your existing SVG animation */}
      <svg 
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-full max-w-2xl"
      >
        <circle 
          className="breathing-circle"
          cx="200" cy="200" r="180" 
          fill="none" 
          stroke="var(--lavender-mist)" 
          strokeWidth="1" 
          opacity="0.2"
        />
        <g className="phoenix-center">
          {/* Your existing phoenix/diamond path */}
        </g>
        <circle 
          className="soul-point"
          cx="200" cy="200" r="0.5" 
          fill="var(--golden-spark)" 
          opacity="0.4"
        />
      </svg>

      {/* Subtle hint text */}
      <div className="mt-8 font-mono text-ethereal-blue opacity-40 text-sm">
        <p>/* between what was & what could be */</p>
      </div>
    </div>
  );
};

export default BreathingAnimation;