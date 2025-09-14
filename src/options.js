document.addEventListener('DOMContentLoaded', () => {
  const t = (key) => (chrome && chrome.i18n ? chrome.i18n.getMessage(key) : '') || '';

  const titleEl = document.getElementById('title');
  const labelEl = document.getElementById('label_showOverlay');
  const checkboxEl = document.getElementById('showOverlay');

  if (titleEl) titleEl.textContent = t('optionsTitle');
  if (labelEl) labelEl.textContent = t('option_showOverlay_label') || 'Show overlay button on maps';
  document.title = t('optionsTitle');

  chrome.storage.sync.get({ showOverlay: false }, (res) => {
    if (checkboxEl) checkboxEl.checked = Boolean(res.showOverlay);
  });

  if (checkboxEl) {
    checkboxEl.addEventListener('change', () => {
      const showOverlay = !!checkboxEl.checked;
      chrome.storage.sync.set({ showOverlay });
    });
  }
});
