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
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;color:#e8e8f0;font-family:sans-serif;text-align:center;padding:24px;"><div><h1 style="font-size:28px;margin-bottom:16px;">🔒 Developer Tools Detected</h1><p style="color:rgba(255,255,255,0.5);">Please close developer tools to continue browsing.</p></div></div>';
      }
    } else {
      devopen = false;
    }
  };
  setInterval(check, 1000);
  window.addEventListener('resize', check);
})();
