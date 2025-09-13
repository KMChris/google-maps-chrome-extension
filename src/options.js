document.addEventListener('DOMContentLoaded', () => {
  const t = (key) => (chrome && chrome.i18n ? chrome.i18n.getMessage(key) : '') || '';

  const titleEl = document.getElementById('title');
  const labelEl = document.getElementById('label_disableOverlay');
  const checkboxEl = document.getElementById('disableOverlay');
  const saveBtn = document.getElementById('saveBtn');
  const toast = document.getElementById('toast');

  if (titleEl) titleEl.textContent = t('optionsTitle');
  if (labelEl) labelEl.textContent = t('option_disableOverlay_label');
  if (saveBtn) saveBtn.textContent = t('options_save');
  document.title = t('optionsTitle');

  chrome.storage.sync.get({ disableOverlay: true }, (res) => {
    if (checkboxEl) checkboxEl.checked = Boolean(res.disableOverlay);
  });

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const disableOverlay = !!checkboxEl?.checked;
      chrome.storage.sync.set({ disableOverlay }, () => {
        if (toast) {
          toast.textContent = t('options_saved_toast');
          toast.style.opacity = '1';
          setTimeout(() => (toast.style.opacity = '0'), 1200);
        }
      });
    });
  }
});
