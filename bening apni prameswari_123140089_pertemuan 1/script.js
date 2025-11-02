const STORAGE_KEY = 'tasks'
let tasks = []
const taskForm = document.getElementById('taskForm')
const taskName = document.getElementById('taskName')
const courseName = document.getElementById('courseName')
const deadline = document.getElementById('deadline')
const formError = document.getElementById('formError')
const resetBtn = document.getElementById('resetBtn')
const filterStatus = document.getElementById('filterStatus')
const filterCourse = document.getElementById('filterCourse')
const searchText = document.getElementById('searchText')
const sortBy = document.getElementById('sortBy')
const taskList = document.getElementById('taskList')
const taskCount = document.getElementById('taskCount')
const editModal = document.getElementById('editModal')
const editForm = document.getElementById('editForm')
const editId = document.getElementById('editId')
const editName = document.getElementById('editName')
const editCourse = document.getElementById('editCourse')
const editDeadline = document.getElementById('editDeadline')
const editError = document.getElementById('editError')
const cancelEdit = document.getElementById('cancelEdit')

loadTasks()
render()

function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    tasks = []
    return
  }
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) throw new Error()
    tasks = parsed.map(t => ({
      id: t.id || generateId(),
      title: String(t.title || '').trim(),
      course: String(t.course || '').trim(),
      deadline: t.deadline ? new Date(t.deadline).toISOString() : new Date().toISOString(),
      done: Boolean(t.done),
      createdAt: t.createdAt ? new Date(t.createdAt).toISOString() : new Date().toISOString()
    }))
  } catch {
    tasks = []
    localStorage.removeItem(STORAGE_KEY)
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    return true
  } catch {
    alert('Gagal menyimpan ke localStorage')
    return false
  }
}

function generateId() {
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8)
}

function validateTaskInput({ title, course, deadlineValue }) {
  if (!title || title.trim().length < 3) return { valid: false, message: 'Nama tugas minimal 3 karakter.' }
  if (!course || course.trim().length === 0) return { valid: false, message: 'Mata kuliah wajib diisi.' }
  if (!deadlineValue) return { valid: false, message: 'Deadline wajib diisi.' }
  const d = new Date(deadlineValue)
  if (Number.isNaN(d.getTime())) return { valid: false, message: 'Tanggal tidak valid.' }
  const now = new Date()
  if (d < new Date(now.getTime() - 60000)) return { valid: false, message: 'Deadline tidak boleh di masa lalu.' }
  return { valid: true }
}

function render() {
  const status = filterStatus.value
  const courseQ = filterCourse.value.trim().toLowerCase()
  const textQ = searchText.value.trim().toLowerCase()
  const sortOption = sortBy.value
  let visible = tasks.slice()
  if (status === 'pending') visible = visible.filter(t => !t.done)
  else if (status === 'completed') visible = visible.filter(t => t.done)
  if (courseQ) visible = visible.filter(t => t.course.toLowerCase().includes(courseQ))
  if (textQ) visible = visible.filter(t => t.title.toLowerCase().includes(textQ))
  visible.sort((a, b) => {
    if (sortOption === 'deadline_asc') return new Date(a.deadline) - new Date(b.deadline)
    if (sortOption === 'deadline_desc') return new Date(b.deadline) - new Date(a.deadline)
    if (sortOption === 'created_asc') return new Date(a.createdAt) - new Date(b.createdAt)
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
  taskList.innerHTML = ''
  if (visible.length === 0) {
    const p = document.createElement('p')
    p.className = 'empty'
    p.textContent = 'Tidak ada tugas.'
    taskList.appendChild(p)
  } else visible.forEach(task => taskList.appendChild(makeTaskCard(task)))
  const undone = tasks.filter(t => !t.done).length
  taskCount.textContent = `Belum selesai: ${undone} dari ${tasks.length} tugas`
}

function makeTaskCard(task) {
  const card = document.createElement('div')
  card.className = 'task-card'
  if (task.done) card.classList.add('done')
  const title = document.createElement('h4')
  title.textContent = task.title
  const meta = document.createElement('p')
  meta.textContent = `${task.course} • Deadline: ${formatDate(task.deadline)}`
  const actions = document.createElement('div')
  const toggleBtn = document.createElement('button')
  toggleBtn.textContent = task.done ? 'Batal' : 'Selesai'
  toggleBtn.onclick = () => toggleDone(task.id)
  const editBtn = document.createElement('button')
  editBtn.textContent = 'Edit'
  editBtn.onclick = () => openEditModal(task.id)
  const delBtn = document.createElement('button')
  delBtn.textContent = 'Hapus'
  delBtn.onclick = () => { if (confirm('Hapus tugas ini?')) deleteTask(task.id) }
  actions.append(toggleBtn, editBtn, delBtn)
  card.append(title, meta, actions)
  return card
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function addTask({ title, course, deadlineValue }) {
  const newTask = {
    id: generateId(),
    title: title.trim(),
    course: course.trim(),
    deadline: new Date(deadlineValue).toISOString(),
    done: false,
    createdAt: new Date().toISOString()
  }
  tasks.push(newTask)
  saveTasks()
  render()
}

function toggleDone(id) {
  const idx = tasks.findIndex(t => t.id === id)
  if (idx === -1) return
  tasks[idx].done = !tasks[idx].done
  saveTasks()
  render()
}

function deleteTask(id) {
  const idx = tasks.findIndex(t => t.id === id)
  if (idx === -1) return
  tasks.splice(idx, 1)
  saveTasks()
  render()
}

function openEditModal(id) {
  const t = tasks.find(x => x.id === id)
  if (!t) return
  editId.value = t.id
  editName.value = t.title
  editCourse.value = t.course
  editDeadline.value = toDatetimeLocal(t.deadline)
  editModal.style.display = 'block'
}

function closeEditModal() {
  editModal.style.display = 'none'
  editForm.reset()
  editError.textContent = ''
}

function saveEditChanges() {
  const id = editId.value
  const title = editName.value.trim()
  const course = editCourse.value.trim()
  const deadlineValue = editDeadline.value
  const v = validateTaskInput({ title, course, deadlineValue })
  if (!v.valid) {
    editError.textContent = v.message
    return
  }
  const idx = tasks.findIndex(t => t.id === id)
  if (idx === -1) return
  tasks[idx].title = title
  tasks[idx].course = course
  tasks[idx].deadline = new Date(deadlineValue).toISOString()
  saveTasks()
  closeEditModal()
  render()
}

function toDatetimeLocal(iso) {
  const d = new Date(iso)
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

taskForm.addEventListener('submit', e => {
  e.preventDefault()
  formError.textContent = ''
  const title = taskName.value
  const course = courseName.value
  const deadlineValue = deadline.value
  const validation = validateTaskInput({ title, course, deadlineValue })
  if (!validation.valid) {
    formError.textContent = validation.message
    return
  }
  addTask({ title, course, deadlineValue })
  taskForm.reset()
})

resetBtn.addEventListener('click', () => formError.textContent = '')
filterStatus.addEventListener('input', render)
filterCourse.addEventListener('input', render)
searchText.addEventListener('input', render)
sortBy.addEventListener('input', render)
editForm.addEventListener('submit', e => { e.preventDefault(); saveEditChanges() })
cancelEdit.addEventListener('click', closeEditModal)
window.addEventListener('click', e => { if (e.target === editModal) closeEditModal() })

