document.addEventListener('DOMContentLoaded', () => {
  const t = (key) => (chrome && chrome.i18n ? chrome.i18n.getMessage(key) : '') || '';

  const titleEl = document.getElementById('title');
  const labelEl = document.getElementById('label_showOverlay');
  const checkboxEl = document.getElementById('showOverlay');
  const about1El = document.getElementById('about1');
  const about2El = document.getElementById('about2');

  if (titleEl) titleEl.textContent = t('extensionName') || 'Google Maps Links';
  if (labelEl) labelEl.textContent = t('option_showOverlay_label') || 'Show overlay button on maps';
  // Tooltip removed
  if (about1El) about1El.innerHTML = t('aboutText1') || t('extensionDescription');
  if (about2El) about2El.innerHTML = t('aboutText2') || '';
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
