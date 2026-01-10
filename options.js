// Options Page Logic
(function() {
  'use strict';

  // Get all form elements
  const form = document.getElementById('settings-form');
  const resetBtn = document.getElementById('reset-btn');
  const statusDiv = document.getElementById('status');

  // Range inputs with value displays
  const rangeInputs = {
    zoomStep: { input: document.getElementById('zoomStep'), display: document.getElementById('zoomStepValue'), format: (v) => `${Math.round(v * 100)}%` },
    minScale: { input: document.getElementById('minScale'), display: document.getElementById('minScaleValue'), format: (v) => `${Math.round(v * 100)}%` },
    maxScale: { input: document.getElementById('maxScale'), display: document.getElementById('maxScaleValue'), format: (v) => `${Math.round(v * 100)}%` },
    transitionDuration: { input: document.getElementById('transitionDuration'), display: document.getElementById('transitionDurationValue'), format: (v) => `${v}ms` },
    marchingAntsWidth: { input: document.getElementById('marchingAntsWidth'), display: document.getElementById('marchingAntsWidthValue'), format: (v) => `${v}px` }
  };

  // Checkbox inputs
  const checkboxInputs = {
    enableDropShadow: document.getElementById('enableDropShadow'),
    enableContrastBoost: document.getElementById('enableContrastBoost'),
    enableSaturationBoost: document.getElementById('enableSaturationBoost'),
    enableHoverOutline: document.getElementById('enableHoverOutline'),
    enablePanDrag: document.getElementById('enablePanDrag'),
    enableDoubleClickReset: document.getElementById('enableDoubleClickReset'),
    enableDoubleClickZoom: document.getElementById('enableDoubleClickZoom'),
    enableMarchingAnts: document.getElementById('enableMarchingAnts'),
    enableBlinkAtOriginal: document.getElementById('enableBlinkAtOriginal')
  };

  // Select inputs
  const selectInputs = {
    activationKey: document.getElementById('activationKey'),
    marchingAntsStyle: document.getElementById('marchingAntsStyle')
  };

  // Color inputs
  const colorInputs = {
    marchingAntsColor: {
      picker: document.getElementById('marchingAntsColor'),
      text: document.getElementById('marchingAntsColorText')
    }
  };

  // Sync color picker and text input
  colorInputs.marchingAntsColor.picker.addEventListener('input', (e) => {
    colorInputs.marchingAntsColor.text.value = e.target.value;
  });

  colorInputs.marchingAntsColor.text.addEventListener('input', (e) => {
    const value = e.target.value;
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      colorInputs.marchingAntsColor.picker.value = value;
    }
  });

  // Update value displays for range inputs
  function updateRangeDisplays() {
    for (const [key, config] of Object.entries(rangeInputs)) {
      const value = parseFloat(config.input.value);
      config.display.textContent = config.format(value);
    }
  }

  // Add input listeners for live updates
  for (const config of Object.values(rangeInputs)) {
    config.input.addEventListener('input', updateRangeDisplays);
  }

  // Load settings from storage
  async function loadSettings() {
    try {
      const result = await browser.storage.sync.get('settings');
      const settings = { ...DEFAULT_SETTINGS, ...result.settings };

      // Update range inputs
      for (const [key, config] of Object.entries(rangeInputs)) {
        config.input.value = settings[key];
      }

      // Update checkbox inputs
      for (const [key, input] of Object.entries(checkboxInputs)) {
        input.checked = settings[key];
      }

      // Update select inputs
      for (const [key, input] of Object.entries(selectInputs)) {
        input.value = settings[key];
      }

      // Update color inputs
      for (const [key, inputs] of Object.entries(colorInputs)) {
        inputs.picker.value = settings[key];
        inputs.text.value = settings[key];
      }

      updateRangeDisplays();
    } catch (error) {
      console.error('Error loading settings:', error);
      showStatus('Error loading settings', false);
    }
  }

  // Save settings to storage
  async function saveSettings(e) {
    if (e) e.preventDefault();

    try {
      const settings = {};

      // Get range input values
      for (const [key, config] of Object.entries(rangeInputs)) {
        settings[key] = parseFloat(config.input.value);
      }

      // Get checkbox values
      for (const [key, input] of Object.entries(checkboxInputs)) {
        settings[key] = input.checked;
      }

      // Get select values
      for (const [key, input] of Object.entries(selectInputs)) {
        settings[key] = input.value;
      }

      // Get color values
      for (const [key, inputs] of Object.entries(colorInputs)) {
        settings[key] = inputs.picker.value;
      }

      await browser.storage.sync.set({ settings });
      showStatus('Settings saved successfully!', true);
    } catch (error) {
      console.error('Error saving settings:', error);
      showStatus('Error saving settings', false);
    }
  }

  // Reset to default settings
  async function resetToDefaults(e) {
    e.preventDefault();
    
    if (!confirm('Are you sure you want to reset all settings to defaults?')) {
      return;
    }

    try {
      await browser.storage.sync.set({ settings: DEFAULT_SETTINGS });
      await loadSettings();
      showStatus('Settings reset to defaults', true);
    } catch (error) {
      console.error('Error resetting settings:', error);
      showStatus('Error resetting settings', false);
    }
  }

  // Show status message
  function showStatus(message, isSuccess) {
    statusDiv.textContent = message;
    statusDiv.className = isSuccess ? 'status success' : 'status error';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      statusDiv.classList.add('hidden');
    }, 3000);
  }

  // Event listeners
  form.addEventListener('submit', saveSettings);
  resetBtn.addEventListener('click', resetToDefaults);

  // Load settings on page load
  loadSettings();
})();
