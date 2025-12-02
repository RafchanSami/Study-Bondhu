document.addEventListener('DOMContentLoaded', () => {
  const user = requireAuth();

  const publicList = document.getElementById('publicList');
  const searchInput = document.getElementById('searchInput');
  const subjectFilter = document.getElementById('subjectFilter');

  function renderPublic() {
    publicList.innerHTML = '';
    let groups = publicGroupsNotJoined(user.id);
    const term = searchInput.value.trim().toLowerCase();
    const subj = subjectFilter.value;

    if (term) {
      groups = groups.filter(g =>
        g.name.toLowerCase().includes(term) || g.subject.toLowerCase().includes(term)
      );
    }
    if (subj) {
      groups = groups.filter(g => g.subject.toLowerCase() === subj.toLowerCase());
    }

    if (!groups.length) {
      publicList.innerHTML = '<div class="list-item">No public groups found.</div>';
      return;
    }

    groups.forEach(g => {
      const li = document.createElement('div');
      li.className = 'list-item';
      li.innerHTML = `
        <div>
          <h4>${g.name}</h4>
          <div class="muted">${g.subject} • Code: <span class="kbd">${g.code}</span></div>
        </div>
        <div>
          <button class="btn btn-secondary" data-id="${g.id}">Join</button>
        </div>
      `;
      publicList.appendChild(li);
    });

    publicList.querySelectorAll('button[data-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const groupId = btn.getAttribute('data-id');
        const group = joinGroupById(groupId, user.id);
        toast(`Joined ${group.name}`);
        renderPublic();
      });
    });
  }

  searchInput.addEventListener('input', renderPublic);
  subjectFilter.addEventListener('change', renderPublic);
  renderPublic();

  // Join via code
  document.getElementById('joinByCodeBtn').addEventListener('click', () => {
    const code = document.getElementById('codeInput').value.trim();
    if (!code) return toast('Enter a group code');
    const group = findGroupByCode(code);
    if (!group) return toast('No group found with that code');
    joinGroupById(group.id, user.id);
    toast(`Joined ${group.name}`);
    setTimeout(() => window.location.href = `group.html?id=${group.id}`, 600);
  });
});
