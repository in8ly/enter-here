import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

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