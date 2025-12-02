document.addEventListener('DOMContentLoaded', () => {
  const user = requireAuth();
  const list = document.getElementById('myGroupsList');

  function render() {
    list.innerHTML = '';
    const groups = myGroups(user.id);
    if (!groups.length) {
      list.innerHTML = '<div class="list-item">You have no groups yet. Create one or join using a code.</div>';
      return;
    }
    groups.forEach(g => {
      const li = document.createElement('div');
      li.className = 'list-item';
      const role = g.ownerId === user.id ? 'Owner' : 'Member';
      li.innerHTML = `
        <div>
          <h4>${g.name}</h4>
          <div class="muted">${g.subject} • Code: <span class="kbd">${g.code}</span> • ${role}</div>
        </div>
        <div>
          <a class="btn btn-secondary" href="group.html?id=${g.id}">Open</a>
        </div>
      `;
      list.appendChild(li);
    });
  }

  render();

  // Modal controls
  const backdrop = document.getElementById('createModalBackdrop');
  document.getElementById('openCreateModal').addEventListener('click', () => {
    backdrop.classList.add('show');
  });
  document.getElementById('cgCancel').addEventListener('click', () => {
    backdrop.classList.remove('show');
  });

  // Create group
  document.getElementById('cgCreate').addEventListener('click', () => {
    const name = document.getElementById('cgName').value.trim();
    const subject = document.getElementById('cgSubject').value.trim();
    const isPublic = document.getElementById('cgPublic').checked;
    if (!name || !subject) return toast('Enter name and subject');

    const group = createGroup({ name, subject, isPublic }, user.id);
    toast(`Created ${group.name} • Code ${group.code}`);
    backdrop.classList.remove('show');
    render();
  });
});
