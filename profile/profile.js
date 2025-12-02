document.addEventListener('DOMContentLoaded', () => {
  const user = requireAuth();

  const pfName = document.getElementById('pfName');
  const pfEmail = document.getElementById('pfEmail');
  const pfPicInput = document.getElementById('pfPicInput');
  const pfPicPreview = document.getElementById('pfPicPreview');

  // Load existing values
  pfName.value = user.name || '';
  pfEmail.value = user.email || '';

  // Load saved profile picture if available
  if (user.picDataUrl) {
    pfPicPreview.src = user.picDataUrl;
    pfPicPreview.style.display = 'block';
  }

  // Handle picture upload
  pfPicInput.addEventListener('change', () => {
    const file = pfPicInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      pfPicPreview.src = reader.result;
      pfPicPreview.style.display = 'block';

      // Save picture in localStorage with user
      const updated = { ...user, picDataUrl: reader.result };
      sbSet(SB_KEYS.USER, updated);
    };
    reader.readAsDataURL(file);
  });

  // Save profile (name + keep picture if exists)
  document.getElementById('pfSave').addEventListener('click', () => {
    const updated = { 
      ...user, 
      name: pfName.value.trim() || user.name,
      picDataUrl: pfPicPreview.src || user.picDataUrl
    };
    sbSet(SB_KEYS.USER, updated);
    toast('Profile saved');
  });

  // Logout
  document.getElementById('pfLogout').addEventListener('click', () => {
    localStorage.removeItem(SB_KEYS.USER);
    toast('Logged out');
    setTimeout(() => window.location.href = '../auth/auth.html', 500);
  });
});
