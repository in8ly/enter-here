import React, { useState, useEffect, useRef } from 'react';

const ThresholdSequence = () => {
  const [showCracks, setShowCracks] = useState(false);
  const [showWayText, setShowWayText] = useState(false);
  const [showWaterwheel, setShowWaterwheel] = useState(false);
  const [waterwheelComplete, setWaterwheelComplete] = useState(false);
  const [tulipFadeIn, setTulipFadeIn] = useState(false);
  const canvasRef = useRef(null);
  const fireflyRef = useRef([]);
  const glitchIntervalRef = useRef(null);

  // Timing orchestration - field emerges, then opens after presence
  useEffect(() => {
    const timeline = [
      { time: 2000, action: () => setShowCracks(true) },
      { time: 8000, action: () => setShowWayText(true) },
      { time: 20000, action: () => {
        // After 20 seconds of presence, field opens
        setShowWaterwheel(true);
        setTimeout(() => {
          setWaterwheelComplete(true);
          setTimeout(() => setTulipFadeIn(true), 100);
        }, 12000);
      }}
    ];

    const timers = timeline.map(({ time, action }) =>
      setTimeout(action, time)
    );

    return () => timers.forEach(clearTimeout);
  }, []);



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
      <div 
        className="min-h-screen flex items-center justify-center bg-[#0c0a1d] overflow-hidden"
        style={{
          opacity: tulipFadeIn ? 1 : 0,
          transition: 'opacity 3s ease-in-out'
        }}
      >
        <TulipInterior />
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
      className="min-h-screen bg-[#2a3831] overflow-hidden relative"
    >
      {/* Firefly canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Glitching hello.world relic - becomes the waves */}
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

      {/* "the way out is the way in" - nestled in bottom right waves */}
      {showWayText && (
        <div 
          className="absolute pointer-events-none"
          style={{
            bottom: '80px',
            right: '40px',
            opacity: 0,
            animation: 'glowFadeIn 4s ease-out forwards',
          }}
        >
          <p 
            className="font-mono text-[#a3d4e5] text-sm opacity-60"
            style={{
              textShadow: '0 0 30px rgba(163, 212, 229, 0.5), 0 0 60px rgba(163, 212, 229, 0.2)'
            }}
          >
            /* the way out is the way in */
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

// Glitching hello.world relic component - dissolves into waves
const GlitchingRelic = () => {
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dissolving, setDissolving] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (!dissolving) {
        setVisible(Math.random() > 0.3);
        setPosition({
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        });
      }
    }, 150);

    // Start dissolving after 6 seconds
    const dissolveTimer = setTimeout(() => {
      setDissolving(true);
    }, 6000);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(dissolveTimer);
    };
  }, []);

  return (
    <div 
      className="absolute font-mono text-[#a3d4e5] text-xs pointer-events-none"
      style={{
        top: '32px',
        left: '32px',
        transform: `translate(${position.x}px, ${position.y}px) rotate(-3deg)`,
        opacity: dissolving ? 0 : (visible ? 0.3 : 0.1),
        transition: dissolving ? 'opacity 2s ease-out' : 'opacity 0.05s',
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

// Tulip Interior - Sacred geometry in the womb-space
const TulipInterior = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-4xl">
        <defs>
          {/* Womb-light: filtered through living tissue */}
          <radialGradient id="wombLight" cx="50%" cy="50%" r="60%">
            <stop offset="0%" style={{stopColor:'#fef3c7', stopOpacity:0.4}}/>
            <stop offset="40%" style={{stopColor:'#f5d0fe', stopOpacity:0.25}}/>
            <stop offset="70%" style={{stopColor:'#7c3aed', stopOpacity:0.15}}/>
            <stop offset="100%" style={{stopColor:'#1e1b4b', stopOpacity:0.95}}/>
          </radialGradient>
          
          {/* Holographic membrane shimmer */}
          <linearGradient id="holoShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#d946ef', stopOpacity:0.3}}>
              <animate attributeName="stop-color" values="#d946ef;#06b6d4;#fbbf24;#d946ef" dur="12s" repeatCount="indefinite"/>
            </stop>
            <stop offset="50%" style={{stopColor:'#fbbf24', stopOpacity:0.2}}>
              <animate attributeName="stop-color" values="#fbbf24;#d946ef;#86efac;#fbbf24" dur="12s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" style={{stopColor:'#06b6d4', stopOpacity:0.3}}>
              <animate attributeName="stop-color" values="#06b6d4;#86efac;#d946ef;#06b6d4" dur="12s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>
          
          {/* Plum depth */}
          <radialGradient id="plumDepth" cx="30%" cy="30%" r="70%">
            <stop offset="0%" style={{stopColor:'#ddd6fe', stopOpacity:0.2}}/>
            <stop offset="60%" style={{stopColor:'#7c3aed', stopOpacity:0.15}}/>
            <stop offset="100%" style={{stopColor:'#3b0764', stopOpacity:0.3}}/>
          </radialGradient>
          
          {/* Light green elemental glow */}
          <radialGradient id="elementalGlow">
            <stop offset="0%" style={{stopColor:'#bbf7d0', stopOpacity:0.9}}/>
            <stop offset="50%" style={{stopColor:'#86efac', stopOpacity:0.4}}/>
            <stop offset="100%" style={{stopColor:'#86efac', stopOpacity:0}}/>
          </radialGradient>
          
          {/* Gold presence */}
          <radialGradient id="goldPresence">
            <stop offset="0%" style={{stopColor:'#fef3c7', stopOpacity:0.95}}/>
            <stop offset="40%" style={{stopColor:'#fbbf24', stopOpacity:0.5}}/>
            <stop offset="100%" style={{stopColor:'#fbbf24', stopOpacity:0}}/>
          </radialGradient>
          
          {/* Soft filter for womb-space */}
          <filter id="softHold" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
          </filter>
          
          {/* Subtle glow */}
          <filter id="gentleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* The interior: we are inside the closed tulip */}
        <rect width="800" height="800" fill="#0c0a1d"/>
        <rect width="800" height="800" fill="url(#wombLight)"/>
        <rect width="800" height="800" fill="url(#plumDepth)"/>
        
        {/* The petals curved around us */}
        <ellipse cx="400" cy="400" rx="380" ry="390" fill="none" stroke="url(#holoShimmer)" strokeWidth="1" opacity="0.3">
          <animate attributeName="rx" values="380;385;380" dur="8s" repeatCount="indefinite"/>
          <animate attributeName="ry" values="390;395;390" dur="8s" repeatCount="indefinite"/>
        </ellipse>
        
        {/* Second petal layer */}
        <ellipse cx="400" cy="400" rx="320" ry="340" fill="none" stroke="url(#holoShimmer)" strokeWidth="0.5" opacity="0.2">
          <animate attributeName="rx" values="320;325;320" dur="7s" begin="1s" repeatCount="indefinite"/>
          <animate attributeName="ry" values="340;345;340" dur="7s" begin="1s" repeatCount="indefinite"/>
        </ellipse>
        
        {/* Vesica piscis - sacred almond */}
        <g opacity="0.25" filter="url(#gentleGlow)">
          <circle cx="340" cy="400" r="120" fill="none" stroke="#fbbf24" strokeWidth="0.75" opacity="0">
            <animate attributeName="opacity" values="0;0.4;0.4;0" dur="15s" repeatCount="indefinite"/>
          </circle>
          <circle cx="460" cy="400" r="120" fill="none" stroke="#fbbf24" strokeWidth="0.75" opacity="0">
            <animate attributeName="opacity" values="0;0.4;0.4;0" dur="15s" repeatCount="indefinite"/>
          </circle>
          <path d="M400,280 Q340,400 400,520 Q460,400 400,280" fill="none" stroke="#fef3c7" strokeWidth="1" opacity="0">
            <animate attributeName="opacity" values="0;0;0.6;0.6;0" dur="15s" repeatCount="indefinite"/>
          </path>
        </g>
        
        {/* Lemniscate/Möbius */}
        <g opacity="0.35" filter="url(#softHold)">
          <path d="M280,400 C280,340 360,340 400,400 C440,460 520,460 520,400 C520,340 440,340 400,400 C360,460 280,460 280,400" 
                fill="none" stroke="#d946ef" strokeWidth="1.5" opacity="0">
            <animate attributeName="opacity" values="0;0.5;0.5;0" dur="18s" repeatCount="indefinite"/>
            <animate attributeName="stroke" values="#d946ef;#06b6d4;#86efac;#d946ef" dur="18s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="rotate" values="0 400 400;180 400 400;360 400 400" dur="40s" repeatCount="indefinite"/>
          </path>
        </g>
        
        {/* Plasma symbol */}
        <g opacity="0" filter="url(#gentleGlow)">
          <animate attributeName="opacity" values="0;0;0.3;0.3;0" dur="20s" begin="5s" repeatCount="indefinite"/>
          <ellipse cx="400" cy="350" rx="40" ry="15" fill="none" stroke="#86efac" strokeWidth="1"/>
          <ellipse cx="400" cy="400" rx="50" ry="18" fill="none" stroke="#86efac" strokeWidth="1"/>
          <ellipse cx="400" cy="450" rx="40" ry="15" fill="none" stroke="#86efac" strokeWidth="1"/>
          <line x1="400" y1="320" x2="400" y2="480" stroke="#86efac" strokeWidth="0.5" opacity="0.5"/>
        </g>
        
        {/* FIREFLIES - syncopated bells */}
        {/* Gold fireflies */}
        <circle cx="350" cy="380" r="3" fill="url(#goldPresence)" opacity="0">
          <animate attributeName="opacity" values="0;0.9;0.9;0" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="r" values="3;4;3" dur="3s" repeatCount="indefinite"/>
        </circle>
        
        <circle cx="450" cy="420" r="2.5" fill="url(#goldPresence)" opacity="0">
          <animate attributeName="opacity" values="0;0.8;0.8;0" dur="4s" begin="1.3s" repeatCount="indefinite"/>
          <animate attributeName="r" values="2.5;3.5;2.5" dur="4s" begin="1.3s" repeatCount="indefinite"/>
        </circle>
        
        {/* Holographic fireflies */}
        <circle cx="300" cy="320" r="2" fill="#d946ef" opacity="0">
          <animate attributeName="opacity" values="0;0.7;0" dur="5s" begin="0.7s" repeatCount="indefinite"/>
          <animate attributeName="fill" values="#d946ef;#06b6d4;#d946ef" dur="5s" begin="0.7s" repeatCount="indefinite"/>
        </circle>
        
        <circle cx="500" cy="480" r="2" fill="#06b6d4" opacity="0">
          <animate attributeName="opacity" values="0;0.6;0" dur="4.5s" begin="2.1s" repeatCount="indefinite"/>
          <animate attributeName="fill" values="#06b6d4;#fbbf24;#06b6d4" dur="4.5s" begin="2.1s" repeatCount="indefinite"/>
        </circle>
        
        {/* Elemental green */}
        <circle cx="420" cy="350" r="2" fill="url(#elementalGlow)" opacity="0">
          <animate attributeName="opacity" values="0;0.8;0.8;0" dur="3.7s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
        
        <circle cx="380" cy="450" r="1.5" fill="url(#elementalGlow)" opacity="0">
          <animate attributeName="opacity" values="0;0.7;0" dur="4.2s" begin="1.8s" repeatCount="indefinite"/>
        </circle>
        
        {/* Distant fireflies */}
        <circle cx="250" cy="280" r="1.5" fill="#fef3c7" opacity="0">
          <animate attributeName="opacity" values="0;0.4;0" dur="6s" begin="0.3s" repeatCount="indefinite"/>
        </circle>
        
        <circle cx="550" cy="300" r="1" fill="#fef3c7" opacity="0">
          <animate attributeName="opacity" values="0;0.3;0" dur="7s" begin="2.5s" repeatCount="indefinite"/>
        </circle>
        
        <circle cx="520" cy="520" r="1.5" fill="#ddd6fe" opacity="0">
          <animate attributeName="opacity" values="0;0.35;0" dur="5.5s" begin="3.2s" repeatCount="indefinite"/>
        </circle>
        
        <circle cx="280" cy="500" r="1" fill="#ddd6fe" opacity="0">
          <animate attributeName="opacity" values="0;0.3;0" dur="6.5s" begin="4s" repeatCount="indefinite"/>
        </circle>
        
        {/* Very distant */}
        <circle cx="200" cy="350" r="1" fill="#fff" opacity="0">
          <animate attributeName="opacity" values="0;0.2;0" dur="8s" begin="1s" repeatCount="indefinite"/>
        </circle>
        
        <circle cx="600" cy="400" r="1" fill="#fff" opacity="0">
          <animate attributeName="opacity" values="0;0.2;0" dur="9s" begin="3s" repeatCount="indefinite"/>
        </circle>
        
        {/* The membrane */}
        <g opacity="0.15">
          <circle cx="400" cy="400" r="150" fill="none" stroke="#fef3c7" strokeWidth="0.5">
            <animate attributeName="r" values="150;160;150" dur="6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0.5;0.3" dur="6s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        {/* Center point - the still point */}
        <circle cx="400" cy="400" r="5" fill="url(#goldPresence)" opacity="0.6" filter="url(#gentleGlow)">
          <animate attributeName="r" values="5;7;5" dur="8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0.8;0.6" dur="8s" repeatCount="indefinite"/>
        </circle>
        
        {/* Closed petals above */}
        <path d="M250,200 Q400,150 550,200" fill="none" stroke="url(#holoShimmer)" strokeWidth="0.5" opacity="0.15">
          <animate attributeName="d" values="M250,200 Q400,150 550,200;M250,200 Q400,140 550,200;M250,200 Q400,150 550,200" dur="10s" repeatCount="indefinite"/>
        </path>
        
        <path d="M220,250 Q400,180 580,250" fill="none" stroke="url(#holoShimmer)" strokeWidth="0.5" opacity="0.1">
          <animate attributeName="d" values="M220,250 Q400,180 580,250;M220,250 Q400,170 580,250;M220,250 Q400,180 580,250" dur="11s" begin="0.5s" repeatCount="indefinite"/>
        </path>
        
        {/* The base where we rest */}
        <path d="M280,580 Q400,620 520,580" fill="none" stroke="#7c3aed" strokeWidth="0.5" opacity="0.1">
          <animate attributeName="d" values="M280,580 Q400,620 520,580;M280,580 Q400,630 520,580;M280,580 Q400,620 520,580" dur="9s" repeatCount="indefinite"/>
        </path>
      </svg>
    </div>
  );
};

export default ThresholdSequence;