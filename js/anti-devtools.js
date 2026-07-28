document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && e.key === 'u'.toUpperCase())) {
    e.preventDefault();
  }
});
(function() {
  let devopen = false;
  const check = () => {
    const w = window.outerWidth - window.innerWidth;
    const h = window.outerHeight - window.innerHeight;
    if (w > 200 || h > 200) {
      if (!devopen) {
        devopen = true;
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;color:#e8e8f0;font-family:sans-serif;text-align:center;padding:24px;"><div><svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#f7931a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:16px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><h1 style="font-size:28px;margin-bottom:16px;color:#e8e8f0;">Developer Tools Detected</h1><p style="color:rgba(255,255,255,0.5);">Please close developer tools to continue browsing.</p></div></div>';
      }
    } else {
      devopen = false;
    }
  };
  setInterval(check, 1000);
  window.addEventListener('resize', check);
})();
