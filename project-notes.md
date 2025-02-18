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

### Next Steps
1. Record animation using OBS
2. Place in `/public` folder
3. Enhance text sequences
4. Test responsive behavior

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