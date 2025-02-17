# Code Citations

## Timestamp Formatting
Source: https://github.com/ttu-ttu/ebook-reader/
License: BSD-3-Clause
Used for: Current time display formatting

```javascript
().toLocaleString('en-US', { 
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
}).replace(',', '');
```

## Animation Components
Source: GreenSock Animation Platform
License: Standard GSAP License
Used for: iOS-specific phoenix animations

## SVG Animations
Source: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate
License: CC-BY-SA 2.5
Used for: Breathing circles and cardinal points

## TailwindCSS Configuration
Source: TailwindCSS Documentation
License: MIT License
Used for: Base styling configuration

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Your custom theme config
    }
  }
}
```