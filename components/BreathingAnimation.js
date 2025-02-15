import React, { useState, useEffect } from 'react';

const BreathingAnimation = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showTimestamp, setShowTimestamp] = useState(false);
  const fullText = '> welcome to liminal space_';
  
  useEffect(() => {
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
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 400 400"
        className="w-full max-w-2xl"
      >
        {/* Background hint */}
        <rect width="400" height="400" fill="#f8f6ff" opacity="0.1"/>
        
        {/* Multiple breathing circles */}
        <circle cx="200" cy="200" r="180" fill="none" stroke="#e6f3ff" strokeWidth="1" opacity="0.2">
          <animate 
            attributeName="r" 
            values="180;185;180" 
            dur="4s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="0.2;0.4;0.2" 
            dur="4s" 
            repeatCount="indefinite" 
          />
        </circle>
        
        {/* Transforming diamond */}
        <g id="phoenix-center">
          <path d="M 200 170 L 230 200 L 200 230 L 170 200 Z" fill="none" stroke="#333" strokeWidth="1">
            <animate 
              attributeName="d" 
              values="M 200 170 L 230 200 L 200 230 L 170 200 Z;
                      M 200 165 L 235 200 L 200 235 L 165 200 Z;
                      M 200 170 L 230 200 L 200 230 L 170 200 Z" 
              dur="6s" 
              repeatCount="indefinite"
            />
            <animate 
              attributeName="strokeOpacity" 
              values="1;0.3;1" 
              dur="3s" 
              repeatCount="indefinite"
            />
          </path>
          
          {/* Radiating lines that flow */}
          <path 
            d="M 200 160 L 200 150 M 240 200 L 250 200 M 200 240 L 200 250 M 160 200 L 150 200" 
            stroke="#88b4e6" 
            strokeWidth="0.5"
          >
            <animate 
              attributeName="d" 
              values="M 200 160 L 200 150 M 240 200 L 250 200 M 200 240 L 200 250 M 160 200 L 150 200;
                      M 200 155 L 200 145 M 245 200 L 255 200 M 200 245 L 200 255 M 155 200 L 145 200;
                      M 200 160 L 200 150 M 240 200 L 250 200 M 200 240 L 200 250 M 160 200 L 150 200"
              dur="4s" 
              repeatCount="indefinite"
            />
            <animate 
              attributeName="strokeOpacity" 
              values="1;0.3;1" 
              dur="2s" 
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* Soul point with subtle radiation */}
        <circle cx="200" cy="200" r="0.5" fill="#ffffff" opacity="0.4">
          <animate 
            attributeName="r" 
            values="0.5;1;0.5" 
            dur="2s" 
            repeatCount="indefinite"
          />
          <animate 
            attributeName="opacity" 
            values="0.4;0.2;0.4" 
            dur="2s" 
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Flowing elements that influence the structure */}
        <path 
          d="M 200 200 Q 300 100 200 50" 
          fill="none" 
          stroke="#88b4e6" 
          strokeWidth="0.5" 
          opacity="0.2"
        >
          <animate 
            attributeName="d" 
            values="M 200 200 Q 300 100 200 50;
                    M 200 200 Q 310 90 200 40;
                    M 200 200 Q 300 100 200 50" 
            dur="10s" 
            repeatCount="indefinite" 
          />
        </path>
        
        <path 
          d="M 200 200 Q 100 300 200 350" 
          fill="none" 
          stroke="#88b4e6" 
          strokeWidth="0.5" 
          opacity="0.2"
        >
          <animate 
            attributeName="d" 
            values="M 200 200 Q 100 300 200 350;
                    M 200 200 Q 90 310 200 360;
                    M 200 200 Q 100 300 200 350" 
            dur="10s" 
            repeatCount="indefinite" 
          />
        </path>

        {/* Moving lights */}
        <g id="moving-lights">
          <circle cx="200" cy="75" r="1" fill="#a8d1ff" opacity="0.3">
            <animate 
              attributeName="opacity" 
              values="0.3;0.5;0.3" 
              dur="3s" 
              repeatCount="indefinite"
            />
            <animateMotion 
              path="M 0 0 A 125 125 0 0 0 125 125" 
              dur="6s" 
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="325" cy="200" r="1" fill="#a8d1ff" opacity="0.3">
            <animate 
              attributeName="opacity" 
              values="0.3;0.5;0.3" 
              dur="4s" 
              repeatCount="indefinite"
            />
            <animateMotion 
              path="M 0 0 A 125 125 0 0 0 -125 125" 
              dur="6s" 
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>

      {/* Subtle hint text */}
      <div className="mt-8 font-mono text-ethereal-blue opacity-40 text-sm">
        <p>/* between what was & what could be */</p>
      </div>
    </div>
  );
};

export default BreathingAnimation;