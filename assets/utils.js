// Simple localStorage helpers
const SB_KEYS = {
  USER: 'sb_user',
  GROUPS: 'sb_groups',        // all groups catalog (public + private)
  MEMBERSHIPS: 'sb_memberships' // groups user has joined or created
};

function sbGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : (fallback ?? null);
  } catch {
    return fallback ?? null;
  }
}

function sbSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function initSampleData() {
  const hasGroups = sbGet(SB_KEYS.GROUPS);
  if (!hasGroups) {
    const sample = [
      { id: uid(), name: 'Algebra Basics', subject: 'Math', code: 'ALG123', isPublic: true, ownerId: null, members: [] },
      { id: uid(), name: 'English Grammar', subject: 'English', code: 'ENG456', isPublic: true, ownerId: null, members: [] },
      { id: uid(), name: 'Physics II', subject: 'Science', code: 'PHY789', isPublic: false, ownerId: null, members: [] }
    ];
    sbSet(SB_KEYS.GROUPS, sample);
  }
  const hasMemberships = sbGet(SB_KEYS.MEMBERSHIPS);
  if (!hasMemberships) sbSet(SB_KEYS.MEMBERSHIPS, []);
}

function requireAuth(redirect = '../auth/auth.html') {
  const user = sbGet(SB_KEYS.USER);
  if (!user) window.location.href = redirect;
  return user;
}

// Add member to group and membership list
function joinGroupById(groupId, userId) {
  const groups = sbGet(SB_KEYS.GROUPS, []);
  const memberships = sbGet(SB_KEYS.MEMBERSHIPS, []);
  const group = groups.find(g => g.id === groupId);
  if (!group) throw new Error('Group not found');

  if (!group.members.includes(userId)) group.members.push(userId);
  if (!memberships.find(m => m.groupId === groupId)) {
    memberships.push({ groupId, role: 'member', joinedAt: Date.now() });
  }

  sbSet(SB_KEYS.GROUPS, groups);
  sbSet(SB_KEYS.MEMBERSHIPS, memberships);
  return group;
}

// Create new group
function createGroup({ name, subject, isPublic }, ownerId) {
  const groups = sbGet(SB_KEYS.GROUPS, []);
  const code = (name.slice(0,3) + Math.floor(100 + Math.random()*900)).toUpperCase();
  const group = { id: uid(), name, subject, code, isPublic, ownerId, members: [ownerId] };
  groups.push(group);

  const memberships = sbGet(SB_KEYS.MEMBERSHIPS, []);
  memberships.push({ groupId: group.id, role: 'owner', joinedAt: Date.now() });

  sbSet(SB_KEYS.GROUPS, groups);
  sbSet(SB_KEYS.MEMBERSHIPS, memberships);
  return group;
}

// Find group by join code
function findGroupByCode(code) {
  const groups = sbGet(SB_KEYS.GROUPS, []);
  return groups.find(g => g.code.toUpperCase() === code.toUpperCase());
}

// Fetch groups user belongs to
function myGroups(userId) {
  const groups = sbGet(SB_KEYS.GROUPS, []);
  const memberships = sbGet(SB_KEYS.MEMBERSHIPS, []);
  const myIds = new Set(memberships.map(m => m.groupId));
  return groups.filter(g => myIds.has(g.id));
}

// Public catalog (excluding already joined)
function publicGroupsNotJoined(userId) {
  const groups = sbGet(SB_KEYS.GROUPS, []);
  const mine = myGroups(userId).map(g => g.id);
  return groups.filter(g => g.isPublic && !mine.includes(g.id));
}

// UI helper: toast
function toast(msg) {
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.position = 'fixed';
  el.style.bottom = '20px';
  el.style.left = '50%';
  el.style.transform = 'translateX(-50%)';
  el.style.background = '#0ea5e9';
  el.style.color = '#fff';
  el.style.padding = '10px 16px';
  el.style.borderRadius = '12px';
  el.style.boxShadow = '0 8px 20px rgba(14,165,233,0.25)';
  el.style.zIndex = 9999;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

// Initialize sample data on first load
document.addEventListener('DOMContentLoaded', initSampleData);
