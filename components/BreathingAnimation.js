import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const BreathingAnimation = () => {
  const svgRef = useRef(null);
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showTimestamp, setShowTimestamp] = useState(false);
  const [showSwirls, setShowSwirls] = useState(false);
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const fullText = '> welcome to liminal space_';
  
  useEffect(() => {
    if (isIOS) {
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

    // Show royal blue swirls after 20 seconds
    const swirlsTimeout = setTimeout(() => {
      setShowSwirls(true);
    }, 20000);

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
        clearTimeout(swirlsTimeout);
      };
    } else {
      const cursorTimeout = setTimeout(() => setShowCursor(false), 1000);
      return () => {
        clearTimeout(cursorTimeout);
        clearTimeout(timestampTimeout);
        clearTimeout(swirlsTimeout);
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
          <path 
            d="M 200 170 L 230 200 L 200 230 L 170 200 Z" 
            fill="none" 
            stroke="var(--golden-spark)" 
            strokeWidth="0.5"
          />
        </g>
        <circle 
          className="soul-point"
          cx="200" cy="200" r="0.5" 
          fill="var(--golden-spark)" 
          opacity="0.4"
        />
        
        {showSwirls && (
          <g className="royal-swirls">
            <path
              d="M 200 200 Q 300 100 200 50 T 200 0"
              fill="none"
              stroke="#1a237e"
              strokeWidth="0.3"
              opacity="0.08"
            />
            <path
              d="M 200 200 Q 100 300 50 200 T 0 200"
              fill="none"
              stroke="#1a237e"
              strokeWidth="0.3"
              opacity="0.08"
            />
          </g>
        )}
      </svg>

      <div className="mt-8 font-mono text-ethereal-blue opacity-40 text-sm hover:opacity-60 transition-all duration-300">
        <p>/* between what was && what could be */</p>
      </div>
    </div>
  );
};

export default BreathingAnimation;