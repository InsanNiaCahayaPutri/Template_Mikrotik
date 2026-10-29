const passwordInput = document.querySelector('#password');
const toggleButton = document.querySelector('.show-password');
const usernameInput = document.querySelector('#username');
const usernameLabel = document.querySelector('#username-label');
const passwordField = document.querySelector('.password-box');
const passwordLabel = document.querySelector('.password-label');
const tabs = document.querySelectorAll('.login-tab');
const loginForm = document.querySelector('form[name="login"]');

function setLoginMode(mode) {
  const voucher = mode === 'voucher';
  document.body.dataset.loginMode = mode;
  tabs.forEach((tab) => {
    const active = tab.dataset.mode === mode;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  document.querySelector('#login-fields').setAttribute('aria-labelledby', `${mode}-tab`);
  passwordField.hidden = voucher;
  passwordLabel.hidden = voucher;
  passwordInput.required = !voucher;
  usernameLabel.textContent = voucher ? 'Kode voucher' : 'Username';
  usernameInput.placeholder = voucher ? 'Masukkan kode voucher' : 'Masukkan username';
  if (voucher) passwordInput.value = usernameInput.value;
}

tabs.forEach((tab) => tab.addEventListener('click', () => setLoginMode(tab.dataset.mode)));
usernameInput?.addEventListener('input', () => {
  if (document.body.dataset.loginMode === 'voucher') passwordInput.value = usernameInput.value;
});

toggleButton?.addEventListener('click', () => {
  const reveal = passwordInput.type === 'password';
  passwordInput.type = reveal ? 'text' : 'password';
  toggleButton.textContent = reveal ? 'Sembunyikan' : 'Lihat';
  toggleButton.setAttribute('aria-label', reveal ? 'Sembunyikan password' : 'Tampilkan password');
  toggleButton.setAttribute('aria-pressed', String(reveal));
});

setLoginMode('member');

// A RouterOS page opened from disk has unresolved MikroTik variables. Keep
// those template directives out of the browser preview and simulate success.
const previewMode = loginForm?.getAttribute('action')?.includes('$(') ?? false;
if (previewMode) {
  document.body.classList.add('preview-mode');
  loginForm.removeAttribute('onsubmit');
  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let textNode;
  while ((textNode = textWalker.nextNode())) {
    textNode.nodeValue = textNode.nodeValue.replace(/\$\((?:if\b[^)]*|endif)\)/g, '');
  }
  document.querySelector('.login-error')?.remove();
  document.querySelector('.trial-link')?.remove();
  document.querySelector('.photo-credit')?.setAttribute('title', 'Ilustrasi laut khusus Template 2');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const safeUsername = username.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
    const card = document.querySelector('.login-card');
    const start = Date.now();
    card.innerHTML = `
      <div class="state-icon online-icon" aria-hidden="true">✓</div>
      <p class="network-name">INSANMOY CONNECT</p>
      <h1>Kamu sudah terhubung</h1>
      <p class="login-description">Selamat datang, <strong>${safeUsername}</strong>.</p>
      <div class="connection-details">
        <div><span>Status</span><b><i class="online-dot"></i> Online</b></div>
        <div><span>Username</span><b>${safeUsername}</b></div>
        <div><span>IP address</span><b>192.168.88.100</b></div>
        <div><span>Durasi</span><b class="session-time">00:00:00</b></div>
      </div>
      <button class="connect-button disconnect-button" type="button">Logout</button>
      <p class="demo-notice">Ini simulasi pratinjau. Login sungguhan diverifikasi oleh MikroTik.</p>
    `;
    const timer = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const hours = String(Math.floor(elapsed / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
      const seconds = String(elapsed % 60).padStart(2, '0');
      const time = card.querySelector('.session-time');
      if (time) time.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
    card.querySelector('.disconnect-button').addEventListener('click', () => {
      clearInterval(timer);
      card.innerHTML = `
        <div class="state-icon" aria-hidden="true">✓</div>
        <p class="network-name">INSANMOY CONNECT</p>
        <h1>Kamu sudah logout</h1>
        <p class="login-description">Sesi pratinjau sudah berakhir.</p>
        <button class="connect-button" type="button">Masuk kembali</button>
        <p class="demo-notice">Ini simulasi pratinjau. Login sungguhan diverifikasi oleh MikroTik.</p>
      `;
      card.querySelector('button').addEventListener('click', () => window.location.reload());
    });
  });
}

