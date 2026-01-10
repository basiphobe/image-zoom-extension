// Default configuration for Image Zoom Extension
// This file is shared between content.js and options.js

const DEFAULT_SETTINGS = {
  // Zoom behavior
  zoomStep: 0.1,        // 10% zoom per scroll tick (0.05-0.3)
  minScale: 0.5,        // Minimum 50% of original size (0.1-1.0)
  maxScale: 5.0,        // Maximum 500% of original size (2.0-10.0)
  
  // Animation
  transitionDuration: 100,  // Smooth transition in ms (0-500)
  
  // Visual effects
  enableDropShadow: true,
  enableContrastBoost: true,
  enableSaturationBoost: true,
  enableHoverOutline: true,
  
  // Interaction
  enableDoubleClickReset: true,
  enablePanDrag: true,
  enableDoubleClickZoom: false,  // Double-click to start zooming (new feature)
  enableMarchingAnts: true,  // Show animated outline when zoom mode is active
  enableBlinkAtOriginal: true,  // Blink border when returning to original size
  marchingAntsColor: '#3b82f6',  // Border color (hex)
  marchingAntsStyle: 'dashed',  // Border style: 'dashed', 'dotted', 'solid'
  marchingAntsWidth: 3,  // Border width in pixels (1-10)
  
  // Activation key
  activationKey: 'Control'  // Options: 'Control', 'Alt', 'Shift', 'Meta'
};

// Export for both content script and options page
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DEFAULT_SETTINGS;
}
