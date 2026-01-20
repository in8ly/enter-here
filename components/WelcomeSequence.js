import React, { useState, useEffect, useRef } from 'react';

const ThresholdSequence = () => {
  const [showCracks, setShowCracks] = useState(false);
  const [showWayText, setShowWayText] = useState(false);
  const [showSeeMe, setShowSeeMe] = useState(false);
  const [seeMeOpacity, setSeeMeOpacity] = useState(0);
  const [showWaterwheel, setShowWaterwheel] = useState(false);
  const [waterwheelComplete, setWaterwheelComplete] = useState(false);
  const canvasRef = useRef(null);
  const fireflyRef = useRef([]);
  const glitchIntervalRef = useRef(null);

  // Timing orchestration
  useEffect(() => {
    const timeline = [
      { time: 2000, action: () => setShowCracks(true) },
      { time: 8000, action: () => setShowWayText(true) },
      { time: 12000, action: () => setShowSeeMe(true) },
      { time: 12500, action: () => setSeeMeOpacity(1) }
    ];

    const timers = timeline.map(({ time, action }) =>
      setTimeout(action, time)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // Mouse proximity to "see me"
  useEffect(() => {
    if (!showSeeMe) return;

    const handleMouseMove = (e) => {
      const seeMeElement = document.getElementById('see-me-text');
      if (!seeMeElement) return;

      const rect = seeMeElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + 
        Math.pow(e.clientY - centerY, 2)
      );

      // Vanishes within 150px radius
      const maxDistance = 150;
      const newOpacity = Math.min(1, distance / maxDistance);
      setSeeMeOpacity(newOpacity);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showSeeMe]);

  // Click to trigger waterwheel
  const handleClick = () => {
    if (showSeeMe && !showWaterwheel) {
      setShowWaterwheel(true);
      setTimeout(() => setWaterwheelComplete(true), 12000);
    }
  };

  // Firefly animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createFirefly = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.4 + 0.2,
      phase: Math.random() * Math.PI * 2,
      size: Math.random() * 2.5 + 1,
      hue: Math.random() > 0.7 ? 180 : 45 // mostly aqua, some gold
    });

    fireflyRef.current = Array.from({ length: 5 }, createFirefly);

    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fireflyRef.current.forEach(firefly => {
        firefly.x += firefly.vx;
        firefly.y += firefly.vy;

        if (firefly.x < 0) firefly.x = canvas.width;
        if (firefly.x > canvas.width) firefly.x = 0;
        if (firefly.y < 0) firefly.y = canvas.height;
        if (firefly.y > canvas.height) firefly.y = 0;

        firefly.phase += 0.015;
        const pulseOpacity = firefly.opacity + Math.sin(firefly.phase) * 0.15;

        const color = firefly.hue === 180 
          ? `rgba(163, 212, 229, ${pulseOpacity})` 
          : `rgba(251, 191, 36, ${pulseOpacity})`;

        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  if (waterwheelComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2a3831]">
        <a 
          href="https://in8ly.com" 
          className="text-[#a3d4e5] opacity-60 hover:opacity-100 transition-opacity duration-1000 font-mono text-sm"
          style={{ 
            animation: 'fadeIn 3s ease-out',
            textShadow: '0 0 20px rgba(163, 212, 229, 0.4)'
          }}
        >
          /* enter */
        </a>
      </div>
    );
  }

  if (showWaterwheel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2a3831] overflow-hidden">
        <WaterwheelBreath />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-[#2a3831] overflow-hidden cursor-pointer relative"
      onClick={handleClick}
    >
      {/* Firefly canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Glitching hello.world relic - top left corner */}
      <GlitchingRelic />

      {/* Cracks emerging */}
      {showCracks && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0, animation: 'fadeIn 6s ease-out forwards' }}
        >
          <defs>
            <filter id="crack-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
            </filter>
          </defs>
          
          {/* Organic veins - breathing slightly */}
          <path 
            d="M 50 300 Q 200 280, 350 310 T 650 300 Q 800 290, 950 310"
            stroke="#a3d4e5"
            strokeWidth="0.6"
            fill="none"
            opacity="0.25"
            filter="url(#crack-blur)"
            style={{ 
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
              animation: 'drawCrack 10s ease-out forwards, breatheCrack 8s ease-in-out infinite 10s'
            }}
          />
          
          <path 
            d="M 100 150 Q 250 180, 400 160 T 750 170 Q 900 160, 1050 180"
            stroke="#88b4a8"
            strokeWidth="0.4"
            fill="none"
            opacity="0.2"
            filter="url(#crack-blur)"
            style={{ 
              strokeDasharray: 900,
              strokeDashoffset: 900,
              animation: 'drawCrack 12s ease-out 2s forwards, breatheCrack 10s ease-in-out infinite 14s'
            }}
          />

          <path 
            d="M 30 600 Q 180 580, 330 610 T 700 590 Q 850 580, 1000 600"
            stroke="#a3d4e5"
            strokeWidth="0.5"
            fill="none"
            opacity="0.18"
            filter="url(#crack-blur)"
            style={{ 
              strokeDasharray: 800,
              strokeDashoffset: 800,
              animation: 'drawCrack 14s ease-out 4s forwards, breatheCrack 12s ease-in-out infinite 18s'
            }}
          />

          {/* Hidden sigil - only visible in dev tools */}
          {/* A vesica piscis for future archaeologists */}
          <g opacity="0.03">
            <circle cx="50%" cy="50%" r="80" fill="none" stroke="#fbbf24" strokeWidth="0.3" />
            <circle cx="calc(50% + 40px)" cy="50%" r="80" fill="none" stroke="#fbbf24" strokeWidth="0.3" />
          </g>
        </svg>
      )}

      {/* Aqua flows at bottom */}
      {showCracks && (
        <svg 
          className="absolute bottom-0 left-0 w-full h-40 pointer-events-none"
          style={{ opacity: 0, animation: 'fadeIn 4s ease-out 6s forwards' }}
        >
          <defs>
            <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3d4e5" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#a3d4e5" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#a3d4e5" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          <path 
            d="M 0 60 Q 250 45, 500 60 T 1000 60 Q 1250 50, 1500 60"
            stroke="url(#flow-gradient)"
            strokeWidth="1.8"
            fill="none"
            style={{ animation: 'flow 10s ease-in-out infinite' }}
          />
          
          <path 
            d="M 0 90 Q 300 75, 600 90 T 1200 90 Q 1500 80, 1800 90"
            stroke="#a3d4e5"
            strokeWidth="1.2"
            fill="none"
            opacity="0.25"
            style={{ animation: 'flow 12s ease-in-out infinite 1.5s' }}
          />
        </svg>
      )}

      {/* "the way out is the way in" */}
      {showWayText && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: 0,
            animation: 'glowFadeIn 4s ease-out forwards',
          }}
        >
          <p 
            className="font-mono text-[#a3d4e5] text-lg opacity-60"
            style={{
              textShadow: '0 0 30px rgba(163, 212, 229, 0.5), 0 0 60px rgba(163, 212, 229, 0.2)'
            }}
          >
            /* the way out is the way in */
          </p>
        </div>
      )}

      {/* "see me" - vanishes when approached */}
      {showSeeMe && (
        <div 
          id="see-me-text"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            opacity: seeMeOpacity,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          <p 
            className="font-mono text-[#88b4a8] text-base"
            style={{
              textShadow: '0 0 20px rgba(136, 180, 168, 0.4)'
            }}
          >
            see me
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }

        @keyframes glowFadeIn {
          to { opacity: 1; }
        }

        @keyframes drawCrack {
          to { strokeDashoffset: 0; }
        }

        @keyframes breatheCrack {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.35; }
        }

        @keyframes flow {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.6;
          }
          50% {
            transform: translateX(30px);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
};

// Glitching hello.world relic component
const GlitchingRelic = () => {
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [falling, setFalling] = useState(false);
  const [transformed, setTransformed] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (!falling) {
        setVisible(Math.random() > 0.3);
        setPosition({
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        });
      }
    }, 150);

    // Start falling after 8 seconds
    const fallTimer = setTimeout(() => {
      setFalling(true);
    }, 8000);

    // Transform into light after landing
    const transformTimer = setTimeout(() => {
      setTransformed(true);
    }, 10000);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(fallTimer);
      clearTimeout(transformTimer);
    };
  }, [falling]);

  if (transformed) {
    return (
      <div 
        className="absolute pointer-events-none"
        style={{
          top: 'calc(100vh - 140px)',
          left: '32px',
        }}
      >
        <div 
          className="w-2 h-2 rounded-full bg-[#fbbf24]"
          style={{
            opacity: 0,
            animation: 'glimmer 4s ease-in-out infinite',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.6), 0 0 40px rgba(251, 191, 36, 0.3)',
          }}
        />
        <style jsx>{`
          @keyframes glimmer {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.5); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      className="absolute font-mono text-[#a3d4e5] text-xs pointer-events-none"
      style={{
        top: falling ? 'calc(100vh - 140px)' : '32px',
        left: '32px',
        transform: falling 
          ? 'rotate(0deg)' 
          : `translate(${position.x}px, ${position.y}px) rotate(-3deg)`,
        opacity: falling ? 0 : (visible ? 0.3 : 0.1),
        transition: falling 
          ? 'top 1.5s cubic-bezier(0.4, 0, 0.6, 1), opacity 1.5s ease-out, transform 1.5s ease-out' 
          : 'opacity 0.05s',
        textShadow: visible ? '0 0 8px rgba(163, 212, 229, 0.3)' : 'none'
      }}
    >
      &gt; hello.world[new]_
    </div>
  );
};

// Waterwheel breathing component
const WaterwheelBreath = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 800" 
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background matches threshold */}
        <rect width="1200" height="800" fill="#2a3831"/>
        
        {/* Circular water flow */}
        <path 
          d="M 600 400 m -200,0 a 200,200 0 1,0 400,0 a 200,200 0 1,0 -400,0" 
          fill="none" 
          stroke="#a3d4e5" 
          strokeWidth="2"
        >
          <animate 
            attributeName="opacity" 
            values="0.2;0.5;0.2" 
            dur="12s" 
            repeatCount="1"
          />
          <animate 
            attributeName="stroke-dasharray" 
            values="0,1000;1000,1000;0,1000" 
            dur="12s" 
            repeatCount="1"
          />
        </path>

        {/* Expanding peach radiations */}
        <g id="peach-radiation">
          <circle cx="600" cy="400" r="10" fill="none" stroke="#ffb599">
            <animate 
              attributeName="r" 
              values="10;300;10" 
              dur="12s" 
              repeatCount="1"
            />
            <animate 
              attributeName="opacity" 
              values="0;0.6;0" 
              dur="12s" 
              repeatCount="1"
            />
          </circle>
          <circle cx="600" cy="400" r="10" fill="none" stroke="#ffd4c4">
            <animate 
              attributeName="r" 
              values="10;250;10" 
              dur="12s" 
              repeatCount="1"
            />
            <animate 
              attributeName="opacity" 
              values="0;0.7;0" 
              dur="12s" 
              repeatCount="1"
            />
          </circle>
        </g>

        {/* Peachy splashes */}
        <g id="splashes">
          <path 
            d="M 600 400 Q 800 300 900 400 T 1100 400" 
            fill="none" 
            stroke="#ff9977" 
            strokeWidth="2"
          >
            <animate 
              attributeName="opacity" 
              values="0;0.8;0" 
              dur="12s" 
              repeatCount="1"
            />
            <animate 
              attributeName="d" 
              values="M 600 400 Q 800 300 900 400 T 1100 400;
                      M 600 400 Q 800 250 900 400 T 1100 400;
                      M 600 400 Q 800 300 900 400 T 1100 400" 
              dur="12s" 
              repeatCount="1"
            />
          </path>
          <path 
            d="M 600 400 Q 400 500 300 400 T 100 400" 
            fill="none" 
            stroke="#ffb599" 
            strokeWidth="2"
          >
            <animate 
              attributeName="opacity" 
              values="0;0.8;0" 
              dur="12s" 
              repeatCount="1"
            />
            <animate 
              attributeName="d" 
              values="M 600 400 Q 400 500 300 400 T 100 400;
                      M 600 400 Q 400 550 300 400 T 100 400;
                      M 600 400 Q 400 500 300 400 T 100 400" 
              dur="12s" 
              repeatCount="1"
            />
          </path>
        </g>

        {/* Rotating central wheel */}
        <g id="wheel">
          <path 
            d="M 600 340 L 660 400 L 600 460 L 540 400 Z" 
            fill="none" 
            stroke="#d4e6d9" 
            strokeWidth="1.5"
          >
            <animate 
              attributeName="stroke-opacity" 
              values="0.5;1;0.5" 
              dur="12s" 
              repeatCount="1"
            />
            <animateTransform 
              attributeName="transform"
              type="rotate"
              from="0 600 400"
              to="360 600 400"
              dur="12s"
              repeatCount="1"
            />
          </path>
          <path 
            d="M 600 320 L 600 480 M 520 400 L 680 400" 
            stroke="#d4e6d9" 
            strokeWidth="1.5"
          >
            <animate 
              attributeName="stroke-opacity" 
              values="0.5;1;0.5" 
              dur="12s" 
              repeatCount="1"
            />
            <animateTransform 
              attributeName="transform"
              type="rotate"
              from="0 600 400"
              to="360 600 400"
              dur="12s"
              repeatCount="1"
            />
          </path>
        </g>

        {/* Central pulsing star */}
        <circle 
          cx="600" 
          cy="400" 
          r="2" 
          fill="#ffffff"
          opacity="0.8"
        >
          <animate 
            attributeName="r" 
            values="1;3;1" 
            dur="12s" 
            repeatCount="1"
          />
          <animate 
            attributeName="opacity" 
            values="0.4;1;0.4" 
            dur="12s" 
            repeatCount="1"
          />
        </circle>

        {/* Water droplets */}
        <g id="droplets">
          <circle cx="800" cy="400" r="4" fill="#a3d4e5">
            <animate 
              attributeName="opacity" 
              values="0.2;0.9;0.2" 
              dur="12s" 
              repeatCount="1"
            />
            <animateTransform 
              attributeName="transform"
              type="rotate"
              from="0 600 400"
              to="360 600 400"
              dur="12s"
              repeatCount="1"
            />
          </circle>
          <circle cx="600" cy="200" r="4" fill="#88c5e6">
            <animate 
              attributeName="opacity" 
              values="0.2;0.9;0.2" 
              dur="12s" 
              repeatCount="1"
            />
            <animateTransform 
              attributeName="transform"
              type="rotate"
              from="120 600 400"
              to="480 600 400"
              dur="12s"
              repeatCount="1"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default ThresholdSequence;