// Image Zoom Extension - Content Script
// Allows zooming images with Ctrl + Mouse Wheel

(function() {
  'use strict';

  // Track zoom state for each image
  const imageZoomState = new WeakMap();
  
  // Track drag state
  let dragState = {
    isDragging: false,
    currentImage: null,
    startX: 0,
    startY: 0,
    initialPanX: 0,
    initialPanY: 0
  };
  
  // Configuration
  const CONFIG = {
    zoomStep: 0.1,        // 10% zoom per scroll tick
    minScale: 0.5,        // Minimum 50% of original size
    maxScale: 5.0,        // Maximum 500% of original size
    transitionDuration: 100  // Smooth transition in ms
  };

  // Initialize zoom state for an image
  function initImageZoom(img) {
    if (!imageZoomState.has(img)) {
      imageZoomState.set(img, {
        scale: 1.0,
        panX: 0,
        panY: 0,
        originalTransform: img.style.transform || '',
        isZooming: false
      });
    }
  }

  // Apply zoom to image
  function applyZoom(img, scale, panX, panY) {
    const state = imageZoomState.get(img);
    if (!state) return;

    state.scale = scale;
    
    // Update pan values if provided
    if (panX !== undefined) state.panX = panX;
    if (panY !== undefined) state.panY = panY;
    
    // Preserve any existing transforms and add our scale and translate
    const baseTransform = state.originalTransform;
    const scaleTransform = `scale(${state.scale})`;
    const translateTransform = `translate(${state.panX}px, ${state.panY}px)`;
    
    if (baseTransform && !baseTransform.includes('scale') && !baseTransform.includes('translate')) {
      img.style.transform = `${baseTransform} ${translateTransform} ${scaleTransform}`;
    } else {
      img.style.transform = `${translateTransform} ${scaleTransform}`;
    }

    // Add class for styling
    if (scale !== 1.0) {
      img.classList.add('image-zoom-active');
      state.isZooming = true;
    } else {
      img.classList.remove('image-zoom-active');
      state.isZooming = false;
      // Reset pan when zoom is reset
      state.panX = 0;
      state.panY = 0;
    }
  }

  // Handle wheel event on images
  function handleWheel(e) {
    // Only proceed if Ctrl is held
    if (!e.ctrlKey) return;

    const target = e.target;
    
    // Check if target is an image
    if (target.tagName !== 'IMG') return;

    // Prevent default zoom behavior
    e.preventDefault();
    e.stopPropagation();

    // Initialize zoom state if needed
    initImageZoom(target);
    const state = imageZoomState.get(target);

    // Calculate new scale
    const delta = e.deltaY > 0 ? -CONFIG.zoomStep : CONFIG.zoomStep;
    let newScale = state.scale + delta;

    // Clamp to min/max
    newScale = Math.max(CONFIG.minScale, Math.min(CONFIG.maxScale, newScale));

    // Apply the zoom
    applyZoom(target, newScale);
  }

  // Reset zoom when Ctrl is released while hovering
  function handleKeyUp(e) {
    if (e.key === 'Control') {
      // Optional: Reset zoom when Ctrl is released
      // Uncomment below to enable auto-reset behavior
      /*
      document.querySelectorAll('img.image-zoom-active').forEach(img => {
        const state = imageZoomState.get(img);
        if (state) {
          applyZoom(img, 1.0);
        }
      });
      */
    }
  }

  // Handle mouse leave - optional reset
  function handleMouseLeave(e) {
    if (e.target.tagName === 'IMG') {
      const state = imageZoomState.get(e.target);
      if (state && state.isZooming && !e.ctrlKey) {
        // Optional: Reset when mouse leaves
        // applyZoom(e.target, 1.0);
      }
    }
  }

  // Double-click to reset zoom
  function handleDoubleClick(e) {
    if (e.target.tagName === 'IMG' && e.ctrlKey) {
      e.preventDefault();
      initImageZoom(e.target);
      applyZoom(e.target, 1.0);
    }
  }

  // Handle mouse down to start dragging
  function handleMouseDown(e) {
    const target = e.target;
    
    // Only allow dragging on zoomed images
    if (target.tagName !== 'IMG') return;
    
    const state = imageZoomState.get(target);
    if (!state || state.scale <= 1.0) return;
    
    e.preventDefault();
    
    dragState.isDragging = true;
    dragState.currentImage = target;
    dragState.startX = e.clientX;
    dragState.startY = e.clientY;
    dragState.initialPanX = state.panX;
    dragState.initialPanY = state.panY;
    
    // Change cursor and disable transition during drag
    target.style.cursor = 'grabbing';
    target.style.transition = 'none';
  }

  // Handle mouse move for dragging
  function handleMouseMove(e) {
    if (!dragState.isDragging || !dragState.currentImage) return;
    
    e.preventDefault();
    
    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;
    
    const newPanX = dragState.initialPanX + deltaX;
    const newPanY = dragState.initialPanY + deltaY;
    
    const state = imageZoomState.get(dragState.currentImage);
    if (state) {
      applyZoom(dragState.currentImage, state.scale, newPanX, newPanY);
    }
  }

  // Handle mouse up to stop dragging
  function handleMouseUp(e) {
    if (dragState.isDragging && dragState.currentImage) {
      // Restore cursor and transition
      dragState.currentImage.style.cursor = 'grab';
      dragState.currentImage.style.transition = '';
    }
    
    dragState.isDragging = false;
    dragState.currentImage = null;
  }

  // Set up event listeners
  document.addEventListener('wheel', handleWheel, { passive: false });
  document.addEventListener('keyup', handleKeyUp);
  document.addEventListener('dblclick', handleDoubleClick);
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  
  // Optional: uncomment to enable mouse leave reset
  // document.addEventListener('mouseleave', handleMouseLeave, true);

  console.log('Image Zoom extension loaded');
})();
