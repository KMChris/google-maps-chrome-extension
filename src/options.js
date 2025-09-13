document.addEventListener('DOMContentLoaded', () => {
  const t = (key) => (chrome && chrome.i18n ? chrome.i18n.getMessage(key) : '') || '';

  const titleEl = document.getElementById('title');
  const labelEl = document.getElementById('label_showOverlay');
  const checkboxEl = document.getElementById('showOverlay');
  const saveBtn = document.getElementById('saveBtn');
  const toast = document.getElementById('toast');

  if (titleEl) titleEl.textContent = t('optionsTitle');
  if (labelEl) labelEl.textContent = t('option_showOverlay_label') || 'Show overlay button on maps';
  if (saveBtn) saveBtn.textContent = t('options_save');
  document.title = t('optionsTitle');

  const switchWrap = labelEl?.previousElementSibling; // .switch
  if (switchWrap && switchWrap.classList.contains('has-tooltip')) {
    switchWrap.setAttribute('data-tooltip', t('toggleOverlay_tooltip') || 'Shows an extra button on maps to directly open results in Google Maps');
    const placeTooltip = () => {
      const rect = switchWrap.getBoundingClientRect();
      const vpW = window.innerWidth;
      const vpH = window.innerHeight;
      const margin = 8;
      const estTooltipW = Math.min(480, vpW - 24);

      const spaceAbove = rect.top;
      const spaceBelow = vpH - rect.bottom;
      const placement = spaceAbove > spaceBelow ? 'top' : 'bottom';
      switchWrap.setAttribute('data-placement', placement);

      const top = Math.min(rect.bottom + margin, vpH - margin);
      const bottom = Math.max(vpH - rect.top + margin, margin);
      switchWrap.style.setProperty('--tooltip-top', `${top}px`);
      switchWrap.style.setProperty('--tooltip-bottom', `${bottom}px`);

      const centerX = rect.left + rect.width / 2;
      let left = centerX;
      let align = 'center';
      const half = estTooltipW / 2;
      if (centerX - half < margin) {
        left = Math.max(rect.left, margin);
        align = 'left';
      } else if (centerX + half > vpW - margin) {
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

  chrome.storage.sync.get({ showOverlay: false }, (res) => {
    if (checkboxEl) checkboxEl.checked = Boolean(res.showOverlay);
  });

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const showOverlay = !!checkboxEl?.checked;
      chrome.storage.sync.set({ showOverlay }, () => {
        if (toast) {
          toast.textContent = t('options_saved_toast');
          toast.style.opacity = '1';
          setTimeout(() => (toast.style.opacity = '0'), 1200);
        }
      });
    });
  }
});
