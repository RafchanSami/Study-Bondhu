document.addEventListener('DOMContentLoaded', () => {
  const user = requireAuth();

  const params = new URLSearchParams(window.location.search);
  const groupId = params.get('id');
  const groups = sbGet(SB_KEYS.GROUPS, []);
  const group = groups.find(g => g.id === groupId);
  if (!group) {
    toast('Group not found');
    return;
  }

  document.getElementById('groupName').textContent = group.name;
  document.getElementById('groupMeta').textContent = `${group.subject} • Code ${group.code}`;

  // Tabs
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

  const ns = (suffix) => `sb_group_${group.id}_${suffix}`;

  // Chat
  const chatListEl = document.getElementById('chatList');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');

  function renderChat() {
    const msgs = sbGet(ns('chat'), []);
    chatListEl.innerHTML = '';
    msgs.forEach(m => {
      const li = document.createElement('div');
      li.className = 'list-item';
      li.innerHTML = `<div><strong>${m.author}</strong><div class="muted">${new Date(m.ts).toLocaleString()}</div></div><div>${m.text}</div>`;
      chatListEl.appendChild(li);
    });
    chatListEl.scrollTop = chatListEl.scrollHeight;
  }
  renderChat();

  chatSend.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (!text) return;
    const msgs = sbGet(ns('chat'), []);
    msgs.push({ text, author: user.name || user.email, ts: Date.now() });
    sbSet(ns('chat'), msgs);
    chatInput.value = '';
    renderChat();
  });

  // Materials
  const matList = document.getElementById('materialsList');
  const matTitle = document.getElementById('matTitle');
  const matLink = document.getElementById('matLink');
  const matAdd = document.getElementById('matAdd');

  function renderMaterials() {
    const items = sbGet(ns('materials'), []);
    matList.innerHTML = '';
    if (!items.length) {
      matList.innerHTML = '<div class="list-item">No materials yet.</div>';
      return;
    }
    items.forEach(it => {
      const li = document.createElement('div');
      li.className = 'list-item';
      li.innerHTML = `<div><strong>${it.title}</strong><div class="muted">${new Date(it.ts).toLocaleDateString()}</div></div><div>${it.link}</div>`;
      matList.appendChild(li);
    });
  }
  renderMaterials();

  matAdd.addEventListener('click', () => {
    const title = matTitle.value.trim();
    const link = matLink.value.trim();
    if (!title || !link) return toast('Enter title and link/note');
    const items = sbGet(ns('materials'), []);
    items.push({ title, link, ts: Date.now(), by: user.id });
    sbSet(ns('materials'), items);
    matTitle.value = '';
    matLink.value = '';
    renderMaterials();
  });

  // Whiteboard
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  let drawing = false;
  canvas.addEventListener('mousedown', e => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });
  canvas.addEventListener('mousemove', e => {
    if (!drawing) return;
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  });
  window.addEventListener('mouseup', () => drawing = false);
  document.getElementById('wbClear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Schedule
  const scheduleList = document.getElementById('scheduleList');
  const sessTitle = document.getElementById('sessTitle');
  const sessWhen = document.getElementById('sessWhen');
  const sessAdd = document.getElementById('sessAdd');

  function renderSchedule() {
    const items = sbGet(ns('schedule'), []);
    scheduleList.innerHTML = '';
    if (!items.length) {
      scheduleList.innerHTML = '<div class="list-item">No sessions yet.</div>';
      return;
    }
    items.forEach(s => {
      const li = document.createElement('div');
      li.className = 'list-item';
      li.innerHTML = `<div><strong>${s.title}</strong></div><div class="tag">${s.when}</div>`;
      scheduleList.appendChild(li);
    });
  }
  renderSchedule();

  sessAdd.addEventListener('click', () => {
    const title = sessTitle.value.trim();
    const when = sessWhen.value.trim();
    if (!title || !when) return toast('Enter session title and time');
    const items = sbGet(ns('schedule'), []);
    items.push({ title, when, ts: Date.now(), by: user.id });
    sbSet(ns('schedule'), items);
    sessTitle.value = '';
    sessWhen.value = '';
    renderSchedule();
  });
  // 🎥 Start Video Button
  const startBtn = document.getElementById("videoStart");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      // এখানে বসবে তোমার কোড
      window.open("video.html", "_blank");
    });
  }

  
  }

);
