document.addEventListener('DOMContentLoaded', () => {
  const t = (key) => (chrome && chrome.i18n ? chrome.i18n.getMessage(key) : '') || '';

  const titleEl = document.getElementById('title');
  const labelEl = document.getElementById('label_showOverlay');
  const checkboxEl = document.getElementById('showOverlay');
  const about1El = document.getElementById('about1');
  const about2El = document.getElementById('about2');

  if (titleEl) titleEl.textContent = t('extensionName') || 'Google Maps Links';
  if (labelEl) labelEl.textContent = t('option_showOverlay_label') || 'Show overlay button on maps';
  const switchWrap = labelEl?.previousElementSibling; // .switch
  if (switchWrap && switchWrap.classList.contains('has-tooltip')) {
    switchWrap.setAttribute('data-tooltip', t('toggleOverlay_tooltip') || 'Show an extra button over maps to open results directly in Google Maps');
    // Set placement dynamically to avoid clipping in popup
    const placeTooltip = () => {
      const rect = switchWrap.getBoundingClientRect();
      const vpW = window.innerWidth;
      const vpH = window.innerHeight;
      const margin = 8;
      const estTooltipW = Math.min(280, vpW - 24);

      // Vertical placement
      const spaceAbove = rect.top;
      const spaceBelow = vpH - rect.bottom;
      const placement = spaceAbove > spaceBelow ? 'top' : 'bottom';
      switchWrap.setAttribute('data-placement', placement);

      // Compute top/bottom CSS var positions in viewport
      const top = Math.min(rect.bottom + margin, vpH - margin);
      const bottom = Math.max(vpH - rect.top + margin, margin);
      switchWrap.style.setProperty('--tooltip-top', `${top}px`);
      switchWrap.style.setProperty('--tooltip-bottom', `${bottom}px`);

      // Horizontal alignment
      // Start centered and adjust if overflow left/right
      const centerX = rect.left + rect.width / 2;
      let left = centerX; // will be used as fixed left with translate
      let align = 'center';
      const half = estTooltipW / 2;
      if (centerX - half < margin) {
        // stick to left
        left = Math.max(rect.left, margin);
        align = 'left';
      } else if (centerX + half > vpW - margin) {
        // stick to right
        left = Math.min(rect.right, vpW - margin);
        align = 'right';
      }
      switchWrap.style.setProperty('--tooltip-left', `${left}px`);
      switchWrap.setAttribute('data-align', align);
      switchWrap.style.setProperty('--tooltip-max-width', `${estTooltipW}px`);
    };
    placeTooltip();
    window.addEventListener('resize', placeTooltip);
  }
  if (about1El) about1El.textContent = t('aboutText1') || t('extensionDescription');
  if (about2El) about2El.textContent = t('aboutText2') || '';
  document.title = t('extensionName') || 'Google Maps Links';

  if (checkboxEl) {
    chrome.storage.sync.get({ showOverlay: false }, (res) => {
      checkboxEl.checked = Boolean(res.showOverlay);
    });

    checkboxEl.addEventListener('change', (e) => {
      const showOverlay = !!e.target.checked;
      chrome.storage.sync.set({ showOverlay });
    });
  }
});
