# Project Notes - Enter Here

## Development Philosophy
- Code as creative expression
- Technical depth reflects transformation theme
- "Recoding the future" through hands-on development
- Building bridges between tech and healing work

## Style Guide
### Code Block Format
```javascript
// filepath: /components/Example.js
import React from 'react';

// ...existing code...
```

### Environment Setup
- IDE: Visual Studio Code
- OS: Windows
- Terminal: PowerShell in VS Code
- Framework: Next.js with React

### Documentation Standards
- Use Markdown for all documentation
- Include file paths when referencing code
- Keep code blocks focused and clean
- Include purpose/context comments

## Animation Components

### Liminal Space Animation
- **Resolution**: 1920x1080 (16:9)
- **Frame Rate**: 30fps
- **Format**: MP4 with H.264
- **Duration**: 10-15s loop

### OBS Recording Settings
```yaml
Output: 1920x1080
Format: MP4 (h.264)
Rate Control: CBR
Bitrate: 2500 Kbps
Keyframe Interval: 2
CPU Usage Preset: Fast
Profile: High
Color Format: NV12
```

## Video Recording Specifications

### OBS Settings
- Resolution: 1920x1080 (16:9)
- Frame Rate: 30fps
- Format: MP4 (H.264)
- Bitrate: 2500 Kbps
- Duration: 10-15 seconds
- Quality Preset: Fast
- Profile: High

### iOS Compatibility
- Format remains MP4 (H.264) - works on all devices
- No size change needed - will scale responsively
- Video attributes will be added after recording

### Recording Steps
1. Open OBS
2. Set up window capture for animation
3. Record 15-second loop
4. Save to `/public` folder as `liminal-animation.mp4`
5. Test locally before deployment

## Project Structure

### Current Implementation
```javascript
components/
  ├── WelcomeSequence.js    // Main sequence component
  └── BreathingAnimation.js  // Original animation (archived)
pages/
  └── index.js              // Entry point
public/
  └── liminal-animation.mp4 // Coming soon
```

## Next Steps
1. Continue with current codebase
2. Record animation in OBS
3. Integrate video component
4. Deploy via Vercel

### Future Integration
- Connect to Waterwheel Nexus landing page
- Add subtle navigation
- Optimize load times

## Cross-Platform Testing

### iOS Requirements
- Text rendering: ✅ Working
- Video playback:
  ```html
  <video 
    autoPlay 
    loop 
    muted 
    playsInline
    playsinline="true"
    webkit-playsinline="true"
    className="w-full rounded-lg shadow-lg"
  >
  ```
- Add iOS-specific attributes for smooth video autoplay
- Test on:
  - iPhone Safari
  - iPhone Chrome
  - iPad Safari

### Video Optimization for iOS
- Format: MP4 (H.264)
- Resolution: 1920x1080 scaled down
- File size: Under 5MB
- Duration: 10-15s loop
- Ensure quick loading on mobile data

### Current Status
- Text animations: Working on iOS
- Welcome sequence: Working on iOS
- Video integration: Pending OBS recording
- Subtle animations: Will be part of video

### Next Steps
1. Record OBS animation
2. Test video playback on iOS Safari
3. Optimize if needed for mobile data
4. Document any iOS-specific workarounds

## Design Notes
- Transitions mirror shamanic journey
- Code as ceremony
- Liminal space as threshold
- Between what was & what will be

## References
- Original "When Ick Met Spark" story
- Waterwheel Nexus framework
- Exit Matters workshop connections

# Development Journey

## Commit Style Guide
```git
# Technical + Transformative Format
<type>: <description> - <transformative context>

# Examples
docs: integrate coding standards - recoding possibility
feat: add liminal animation - between worlds
fix: resolve timing sequence - healing connection
```

## Current Status
- Philosophy integrated with technical docs ✨
- Clear path forward established 🛠️
- Meaningful commit messages reflecting journey 🌟

## Next Commit Pattern
```powershell
# In VS Code terminal
git add .
git commit -m "type: clear intention - transformative context"
```

Remember: Each commit tells part of the transformation story

## Open Source Philosophy
- Documentation as public art
- Code comments as poetry
- Commit messages as transformation markers
- Technical specs meeting spiritual practice

### For Fellow Tech Explorers
```javascript
// Welcome to this liminal space between
// technical precision and transformative practice
// Feel free to fork this journey
// Or create your own path of recoding possibility
```

### Building in Public
- Repository serves as both documentation and inspiration
- Each commit tells part of the transformation story
- Technical choices reflect deeper intentions
- Open invitation for community engagement

## Bridging Generations Through Code

### Tech Legacy
- Code as modern storytelling
- Documentation as digital wisdom sharing
- Git commits as breadcrumbs for future explorers
- Open source as community teaching

### For Next Generation Developers
```javascript
// Dear future coders,
// This repository stands as a bridge
// Between technical mastery and heart-centered creation
// May you find your own path in these digital forests
```

### Family Tech Connection
- Coding as shared language
- Technical precision meets maternal wisdom
- Building bridges across generations
- Repository as living legacy

## Development Values
- Clean code = Clear communication
- Comments = Teaching moments
- Documentation = Love letters to future developers
- Git history = Family tree of ideas