class Storage {
  static save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  static load(key, fallback = []) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
  }
  static saveSetting(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  static loadSetting(key, fallback) { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
}

class Task {
  constructor(name, done = false, id = Date.now()) { this.id = id; this.name = name; this.done = done; }
}

class Schedule {
  constructor(text, id = Date.now()) { this.id = id; this.text = text; }
}

const $ = id => document.getElementById(id);

const sanitizeTasks = raw => {
  if (!Array.isArray(raw)) return [];
  return raw.map(item => {
    if (!item) return null;
    const name = (item.name ?? item.title ?? item.text ?? '').toString().trim();
    const done = typeof item.done === 'boolean' ? item.done : false;
    const id = item.id ?? Date.now() + Math.floor(Math.random() * 1000);
    return name ? new Task(name, done, id) : null;
  }).filter(x => x !== null);
};

const sanitizeSched = raw => {
  if (!Array.isArray(raw)) return [];
  return raw.map(item => {
    if (!item) return null;
    const text = (item.text ?? item.title ?? item.name ?? '').toString().trim();
    const id = item.id ?? Date.now() + Math.floor(Math.random() * 1000);
    return text ? new Schedule(text, id) : null;
  }).filter(x => x !== null);
};

let tasks = sanitizeTasks(Storage.load('tasks', []));
let schedules = sanitizeSched(Storage.load('schedules', []));
let currentFilter = 'all';

const saveAll = () => {
  Storage.save('tasks', tasks);
  Storage.save('schedules', schedules);
};

const renderStats = () => {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const active = total - done;
  $('totalTasks').textContent = total;
  $('activeTasks').textContent = active;
  $('doneTasks').textContent = done;
  const pct = total ? Math.round((done / total) * 100) : 0;
  $('progressBar').style.width = `${pct}%`;
  $('progressText').textContent = `${pct}% selesai`;
};

const renderTasks = (filter = 'all') => {
  const container = $('taskList');
  let list = tasks;
  if (filter === 'active') list = tasks.filter(t => !t.done);
  if (filter === 'done') list = tasks.filter(t => t.done);
  if (!list.length) {
    container.innerHTML = '<div class="muted">Belum ada tugas</div>';
    renderStats();
    return;
  }
  container.innerHTML = list.map(t => `
    <div class="list-item" data-id="${t.id}">
      <div class="item-left">
        <div class="checkbox" onclick="toggleDone(${t.id})">${t.done ? '✓' : ''}</div>
        <div>
          <div class="title" style="text-decoration:${t.done ? 'line-through' : 'none'}">${t.name}</div>
        </div>
      </div>
      <div class="actions">
        <button onclick="editTask(${t.id})">✎</button>
        <button onclick="deleteTask(${t.id})">🗑</button>
      </div>
    </div>
  `).join('');
  renderStats();
};

const renderSchedules = () => {
  const container = $('scheduleList');
  if (!schedules.length) { container.innerHTML = '<div class="muted">Belum ada jadwal</div>'; return; }
  container.innerHTML = schedules.map(s => `
    <div class="list-item" data-id="${s.id}">
      <div>
        <div class="title">${s.text}</div>
      </div>
      <div class="actions">
        <button onclick="editSchedule(${s.id})">✎</button>
        <button onclick="deleteSchedule(${s.id})">🗑</button>
      </div>
    </div>
  `).join('');
};

const addTask = () => {
  const v = $('taskInput').value?.trim() ?? '';
  if (!v) return alert('Masukkan nama tugas.');
  tasks.unshift(new Task(v));
  $('taskInput').value = '';
  saveAll();
  renderTasks(currentFilter);
};

const editTask = id => {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  const nv = prompt('Edit tugas:', t.name);
  if (nv === null) return;
  const v = nv.trim();
  if (!v) return alert('Nama tugas tidak boleh kosong.');
  t.name = v;
  saveAll();
  renderTasks(currentFilter);
};

const deleteTask = id => {
  const i = tasks.findIndex(t => t.id === id);
  if (i === -1) return;
  if (!confirm('Hapus tugas ini?')) return;
  tasks.splice(i, 1);
  saveAll();
  renderTasks(currentFilter);
};

const toggleDone = id => {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.done = !t.done;
  saveAll();
  renderTasks(currentFilter);
};

const addSchedule = () => {
  const v = $('scheduleInput').value?.trim() ?? '';
  if (!v) return alert('Masukkan jadwal.');
  schedules.unshift(new Schedule(v));
  $('scheduleInput').value = '';
  saveAll();
  renderSchedules();
};

const editSchedule = id => {
  const s = schedules.find(x => x.id === id);
  if (!s) return;
  const nv = prompt('Edit jadwal (Matkul • Hari • Jam):', s.text);
  if (nv === null) return;
  const v = nv.trim();
  if (!v) return alert('Isi jadwal tidak boleh kosong.');
  s.text = v;
  saveAll();
  renderSchedules();
};

const deleteSchedule = id => {
  const i = schedules.findIndex(s => s.id === id);
  if (i === -1) return;
  if (!confirm('Hapus jadwal ini?')) return;
  schedules.splice(i, 1);
  saveAll();
  renderSchedules();
};

const weatherCodeToText = code => {
  const m = {
    0: 'Cerah', 1: 'Cerah berawan', 2: 'Berawan', 3: 'Tutup awan',
    45: 'Kabut', 48: 'Kabut es', 51: 'Hujan gerimis ringan', 53: 'Hujan gerimis sedang',
    55: 'Hujan gerimis lebat', 61: 'Hujan ringan', 63: 'Hujan sedang', 65: 'Hujan lebat',
    71: 'Salju ringan', 73: 'Salju sedang', 75: 'Salju lebat', 80: 'Hujan lokal',
    81: 'Hujan lokal kuat', 82: 'Hujan lokal sangat kuat'
  };
  return m[code] || 'Cuaca';
};

const loadWeatherBandarLampung = async () => {
  const lat = -5.4345;
  const lon = 105.2610;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius&timezone=Asia%2FJakarta`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    const cw = data?.current_weather;
    if (!cw) throw new Error('No current_weather');
    const temp = Math.round(cw.temperature);
    const text = weatherCodeToText(cw.weathercode);
    $('weatherInfo').textContent = `${temp}°C • ${text}`;
  } catch {
    $('weatherInfo').textContent = 'Tidak tersedia';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  renderSchedules();
  renderStats();
  $('addTaskBtn').addEventListener('click', addTask);
  $('taskInput').addEventListener('keydown', e => e.key === 'Enter' && addTask());
  $('addScheduleBtn').addEventListener('click', addSchedule);
  $('scheduleInput').addEventListener('keydown', e => e.key === 'Enter' && addSchedule());
  document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks(currentFilter);
  }));
  const dark = Storage.loadSetting('darkMode', false);
  $('darkToggle').checked = dark;
  document.body.classList.toggle('dark', dark);
  $('darkToggle').addEventListener('change', e => { document.body.classList.toggle('dark', e.target.checked); Storage.saveSetting('darkMode', e.target.checked); });
  loadWeatherBandarLampung();
  setInterval(loadWeatherBandarLampung, 10 * 60 * 1000);
});

window.editTask = editTask;
window.deleteTask = deleteTask;
window.toggleDone = toggleDone;
window.editSchedule = editSchedule;
window.deleteSchedule = deleteSchedule;