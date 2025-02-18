# Project Notes - Enter Here

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

### Next Steps
1. Record animation using OBS
2. Place in `/public` folder
3. Enhance text sequences
4. Test responsive behavior

### Future Integration
- Connect to Waterwheel Nexus landing page
- Add subtle navigation
- Optimize load times

## Design Notes
- Transitions mirror shamanic journey
- Code as ceremony
- Liminal space as threshold
- Between what was & what will be

## References
- Original "When Ick Met Spark" story
- Waterwheel Nexus framework
- Exit Matters workshop connections