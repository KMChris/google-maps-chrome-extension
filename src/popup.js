document.addEventListener('DOMContentLoaded', () => {
  const t = (key) => (chrome && chrome.i18n ? chrome.i18n.getMessage(key) : '') || '';

  const titleEl = document.getElementById('title');
  const labelEl = document.getElementById('label_disableOverlay');
  const checkboxEl = document.getElementById('disableOverlay');
  const about1El = document.getElementById('about1');
  const about2El = document.getElementById('about2');

  if (titleEl) titleEl.textContent = t('extensionName') || 'Google Maps Links';
  if (labelEl) labelEl.textContent = t('option_disableOverlay_label') || 'Disable overlay button on maps';
  if (about1El) about1El.textContent = t('extensionDescription');
  if (about2El) about2El.textContent = '';
  document.title = t('extensionName') || 'Google Maps Links';

  if (checkboxEl) {
    chrome.storage.sync.get({ disableOverlay: true }, (res) => {
      checkboxEl.checked = Boolean(res.disableOverlay);
    });

    checkboxEl.addEventListener('change', (e) => {
      chrome.storage.sync.set({ disableOverlay: e.target.checked });
    });
  }
});
