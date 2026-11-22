import { useEffect, useMemo, useState } from 'react'
import StudentForm from './components/StudentForm'
import StudentList from './components/StudentList'

const STORAGE_KEY = 'student-management-students'

const SAMPLE_STUDENTS = [
  { id: 1, name: 'Arif Hossain', email: 'arif@example.com', phone: '01712345678', department: 'CSE' },
  { id: 2, name: 'Nusrat Jahan', email: 'nusrat@example.com', phone: '01823456789', department: 'BBA' },
  { id: 3, name: 'Tanvir Ahmed', email: 'tanvir@example.com', phone: '01934567890', department: 'EEE' },
]

function loadStudents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // ignore — fall back to sample data
  }
  return SAMPLE_STUDENTS
}

export default function App() {
  const [students, setStudents] = useState(loadStudents)
  const [search, setSearch] = useState('')
  const [editingStudent, setEditingStudent] = useState(null)
  const [message, setMessage] = useState('')

  // Bonus: save student data in LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
  }, [students])

  // Success message disappears after a few seconds
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(''), 3000)
    return () => clearTimeout(timer)
  }, [message])

  // Add a new student, or update the one being edited
  const handleSave = (data) => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? { ...data, id: s.id } : s)),
      )
      setMessage(`✅ ${data.name} updated successfully!`)
      setEditingStudent(null)
    } else {
      const newStudent = { ...data, id: Date.now() }
      setStudents((prev) => [newStudent, ...prev])
      setMessage(`✅ ${data.name} added successfully!`)
    }
  }

  const handleEdit = (student) => {
    setEditingStudent(student)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    const student = students.find((s) => s.id === id)
    if (window.confirm(`Delete ${student?.name} from the list?`)) {
      setStudents((prev) => prev.filter((s) => s.id !== id))
      setMessage(`🗑️ ${student?.name} deleted.`)
      if (editingStudent?.id === id) setEditingStudent(null)
    }
  }

  // Search students by name
  const visibleStudents = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return students
    return students.filter((s) => s.name.toLowerCase().includes(q))
  }, [students, search])

  return (
    <div className="app">
      <header className="header">
        <h1>🎓 Student Management App</h1>
        <p>Add, view, search, edit and delete student information.</p>
      </header>

      <main className="container">
        {message && <div className="message">{message}</div>}

        <StudentForm
          onSave={handleSave}
          editingStudent={editingStudent}
          onCancelEdit={() => setEditingStudent(null)}
        />

        <section className="list-section">
          <div className="list-header">
            <h2>
              Student List{' '}
              <span className="count-badge">Total: {students.length}</span>
            </h2>
            <input
              type="text"
              placeholder="🔍 Search students by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <StudentList
            students={visibleStudents}
            search={search}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>

      <footer className="footer">
        Student Management App • Developed by Dipon.DEV
      </footer>
    </div>
  )
}
