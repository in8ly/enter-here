import React, { useState, useEffect } from 'react';

const WelcomeSequence = () => {
  const [text, setText] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [showTimestamp, setShowTimestamp] = useState(false);

  // Update timestamp every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Text animation sequence
  useEffect(() => {
    const fullText = '> hello.world[new]_';
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setShowTimestamp(true), 1000);
    }
  }, [text]);

  return (
    <div className="min-h-screen bg-shadow-depth">
      {/* Introduction Section */}
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl space-y-4 font-mono">
          <p className="text-lavender-mist opacity-60">
            {text}
            <span className="animate-blink">|</span>
          </p>
          {showTimestamp && (
            <p className="text-ethereal-blue opacity-40 animate-fade-in">
              /* {currentTime} GMT */
            </p>
          )}
        </div>
      </div>

      {/* Video Section */}
      <div className="h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="aspect-w-16 aspect-h-9 bg-forest-shadow rounded-lg">
            {/* Video placeholder */}
            <div className="flex items-center justify-center text-lavender-mist opacity-40">
              /* Vision of Liminal Space */
            </div>
          </div>
        </div>
      </div>

      {/* Closing Invitation */}
      <div className="h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl space-y-8 font-mono">
          <div className="text-[#88b4e6] opacity-60">
            initiate_transformation {`{`}
            <div className="pl-8 text-[#a3d4e5]">
              state: "liminal_space";<br/>
              context: "between_worlds";<br/>
              intention: "healing_connection";
            </div>
            {`}`}
          </div>
          <p className="text-center text-golden-spark opacity-40">
            /* between what was & what will be */
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSequence;