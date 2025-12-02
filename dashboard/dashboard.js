document.addEventListener('DOMContentLoaded', () => {
  const user = requireAuth();

  // ✅ Load profile picture in nav
  const navPic = document.getElementById('navProfilePic');
  if (navPic) {
    if (user && user.picDataUrl) {
      navPic.src = user.picDataUrl;
    } else {
      navPic.src = "../assets/unknown.png";
    }
  }

  // ✅ Load my groups
  const groups = myGroups(user.id);
  const list = document.getElementById('myGroupsList');
  if (!groups.length) {
    list.innerHTML = '<div class="list-item">No groups yet. Create or join one.</div>';
  } else {
    groups.forEach(g => {
      const li = document.createElement('div');
      li.className = 'list-item';
      li.innerHTML = `
        <div>
          <h4>${g.name}</h4>
          <small class="muted">${g.subject} • Code: <span class="kbd">${g.code}</span></small>
        </div>
        <div>
          <a class="btn btn-secondary" href="../groups/group.html?id=${g.id}">Open</a>
        </div>
      `;
      list.appendChild(li);
    });
  }

  // ✅ Join by code
  document.getElementById('dashJoinBtn').addEventListener('click', () => {
    const code = document.getElementById('dashJoinCode').value.trim();
    if (!code) return toast('Enter a group code');
    const group = findGroupByCode(code);
    if (!group) return toast('No group found with that code');
    joinGroupById(group.id, user.id);
    toast(`Joined ${group.name}`);
    setTimeout(() => window.location.href = `../groups/group.html?id=${group.id}`, 600);
  });

  // ✅ Fake upcoming sessions list
  const upcoming = [
    { title: 'Algebra Q&A', when: 'Tomorrow 7:00 PM', group: 'Algebra Basics' },
    { title: 'Essay Review', when: 'Wed 5:30 PM', group: 'English Grammar' }
  ];
  const ses = document.getElementById('upcomingSessions');
  upcoming.forEach(s => {
    const li = document.createElement('li');
    li.className = 'list-item';
    li.innerHTML = `<div>${s.title} <span class="tag">${s.when}</span></div><div class="muted">${s.group}</div>`;
    ses.appendChild(li);
    const user = sbGet(SB_KEYS.USER);
const navPic = document.getElementById('navProfilePic');
if (navPic) {
  navPic.src = user?.picDataUrl || "../assets/unknown.png";
}
  });
});
