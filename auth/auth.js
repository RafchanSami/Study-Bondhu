document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.add('hidden'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.remove('hidden');
    });
  });

  document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-pass').value.trim();
    if (!email || !pass) return toast('Please enter email and password');

    const user = { id: uid(), name: email.split('@')[0], email };
    sbSet(SB_KEYS.USER, user);
    toast('Logged in');
    setTimeout(() => window.location.href = '../dashboard/dashboard.html', 500);
  });

  document.getElementById('signup-btn').addEventListener('click', () => {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const pass = document.getElementById('signup-pass').value.trim();
    const pass2 = document.getElementById('signup-pass2').value.trim();

    if (!name || !email || !pass || !pass2) return toast('Fill all fields');
    if (pass !== pass2) return toast('Passwords do not match');

    const user = { id: uid(), name, email };
    sbSet(SB_KEYS.USER, user);
    toast('Account created');
    setTimeout(() => window.location.href = '../dashboard/dashboard.html', 500);
  });
});
