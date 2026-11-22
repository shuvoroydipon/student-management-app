import { useEffect, useState } from 'react'

const DEPARTMENTS = ['CSE', 'EEE', 'BBA', 'English', 'Mathematics', 'Physics']

const EMPTY_FORM = { name: '', email: '', phone: '', department: '' }

export default function StudentForm({ onSave, editingStudent, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  // Fill the form when editing a student
  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name,
        email: editingStudent.email,
        phone: editingStudent.phone,
        department: editingStudent.department,
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [editingStudent])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Student name is required.'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.'
    } else if (!/^[0-9+\- ]{11,15}$/.test(form.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (11-15 digits).'
    }
    if (!form.department) newErrors.department = 'Please select a department.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSave({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      department: form.department,
    })
    setForm(EMPTY_FORM)
  }

  return (
    <section className="card form-card">
      <h2>{editingStudent ? '✏️ Edit Student' : '➕ Add New Student'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label>
            Student Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Arif Hossain"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. arif@example.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label>
            Phone Number
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. 01712345678"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>

          <label>
            Department
            <select name="department" value={form.department} onChange={handleChange}>
              <option value="">Select Department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.department && <span className="error">{errors.department}</span>}
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingStudent ? 'Update Student' : 'Add Student'}
          </button>
          {editingStudent && (
            <button type="button" className="btn btn-outline" onClick={onCancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
