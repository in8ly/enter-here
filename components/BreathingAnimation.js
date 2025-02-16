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
  const spaceBetweenText = 'a space between here and there';
  const timeText = '> It is Now == ';
  
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

  const currentTime = new Date().toLocaleString('en-US', { 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(',', '');

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-shadow-depth">
      <div className="w-full max-w-2xl mb-8 font-mono text-lavender-mist">
        <p className="text-sm h-6 opacity-60">
          {text}
          {showCursor && <span className="animate-blink">|</span>}
        </p>
        {showTimestamp && (
          <>
            <p className="text-sm h-6 animate-fade-in text-ethereal-blue opacity-40">
              {spaceBetweenText}
            </p>
            <p className="text-sm h-6 animate-fade-in text-golden-spark opacity-40">
              {timeText}{currentTime}
            </p>
          </>
        )}
      </div>

      <svg 
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-full max-w-2xl"
      >
        {/* First breathing circle */}
        <circle 
          className="circle-one"
          cx="200" cy="200" r="180" 
          fill="none" 
          stroke="var(--lavender-mist)" 
          strokeWidth="1" 
          opacity="0.2"
        >
          <animate 
            attributeName="r" 
            values="180;183;180" 
            dur="6s" 
            repeatCount="indefinite" 
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
          />
        </circle>

        {/* Second breathing circle */}
        <circle 
          className="circle-two"
          cx="200" cy="200" r="175" 
          fill="none" 
          stroke="var(--lavender-mist)" 
          strokeWidth="1" 
          opacity="0.2"
        >
          <animate 
            attributeName="r" 
            values="175;178;175" 
            dur="6s" 
            repeatCount="indefinite" 
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
          />
        </circle>

        {/* Centered soul point */}
        <circle 
          className="soul-point"
          cx="200" cy="200" r="0.8" 
          fill="var(--golden-spark)" 
          opacity="0.4"
        />

        {/* Radiation rings around soul point */}
        <circle 
          cx="200" cy="200" r="5" 
          fill="none" 
          stroke="var(--lavender-mist)" 
          strokeWidth="0.5" 
          opacity="0.2"
        >
          <animate 
            attributeName="r" 
            values="5;15;5" 
            dur="3s" 
            repeatCount="indefinite"
          />
          <animate 
            attributeName="opacity" 
            values="0.2;0;0.2" 
            dur="3s" 
            repeatCount="indefinite"
          />
        </circle>

        {/* Cardinal points that fade */}
        <g className="cardinal-points" opacity="0.3">
          <circle cx="200" cy="175" r="0.5" fill="var(--golden-spark)">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="225" cy="200" r="0.5" fill="var(--golden-spark)">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="200" cy="225" r="0.5" fill="var(--golden-spark)">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" begin="2s" />
          </circle>
          <circle cx="175" cy="200" r="0.5" fill="var(--golden-spark)">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" begin="3s" />
          </circle>
        </g>
        {/* Adjust soul point for better cross-device experience */}
        <circle 
          className="soul-point"
          cx="200" cy="200" r="0.8" 
          fill="var(--golden-spark)" 
          opacity="0.3"  // Reduced from 0.4 for more subtlety
        />
        
        {/* Enhanced radiation rings */}
        <circle 
          cx="200" cy="200" r="5" 
          fill="none" 
          stroke="var(--lavender-mist)" 
          strokeWidth="0.3"  // Reduced from 0.5 for more delicacy
          opacity="0.15"    // More subtle initial state
        >
          <animate 
            attributeName="r" 
            values="5;15;5" 
            dur="4s"        // Slowed down from 3s
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
          />
          <animate 
            attributeName="opacity" 
            values="0.15;0.05;0.15" 
            dur="4s" 
            repeatCount="indefinite"
          />
        </circle>        
        {/* Moving lights constellation */}
        <g className="moving-lights">
          <circle cx="200" cy="75" r="1" fill="var(--ethereal-blue)" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite"/>
            <animateMotion path="M 0 0 A 125 125 0 0 0 125 125" dur="6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="325" cy="200" r="1" fill="var(--ethereal-blue)" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.5;0.3" dur="4s" repeatCount="indefinite"/>
            <animateMotion path="M 0 0 A 125 125 0 0 0 -125 125" dur="6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="200" cy="325" r="1" fill="var(--ethereal-blue)" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.5;0.3" dur="4s" repeatCount="indefinite"/>
            <animateMotion path="M 0 0 A 125 125 0 0 0 125 -125" dur="6s" repeatCount="indefinite"/>
          </circle>
        </g>

        {showSwirls && (
          <g className="royal-swirls">
            <path
              d="M 200 200 Q 300 100 200 50 T 200 0"
              fill="none"
              stroke="#1a237e"
              strokeWidth="0.4"    // Increased from 0.3
              opacity="0.12"      // Increased from 0.08
            />
            <path
              d="M 200 200 Q 100 300 50 200 T 0 200"
              fill="none"
              stroke="#1a237e"
              strokeWidth="0.4"    // Increased from 0.3
              opacity="0.12"      // Increased from 0.08
            />
          </g>
        )}
      </svg>

      <div className="flex flex-col items-center gap-2 mt-8 font-mono">
        {showAdventure && (
          <p className="text-sm h-6 animate-pulse text-golden-spark opacity-40 hover:opacity-60 transition-all duration-700">
            {adventureText}
          </p>
        )}
        <p className="text-ethereal-blue opacity-40 text-sm hover:opacity-60 transition-all duration-300">
          {/* between what was & what could be */}
        </p>
      </div>
    </div>
  );
};

export default BreathingAnimation;