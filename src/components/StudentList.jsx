export default function StudentList({ students, search, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <p className="empty">
        {search.trim()
          ? `No student found matching "${search}".`
          : 'No students yet. Add your first student using the form above.'}
      </p>
    )
  }

  return (
    <div className="table-wrap">
      <table className="student-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td className="student-name">{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <span className="dept-badge">{student.department}</span>
              </td>
              <td className="actions">
                <button className="btn btn-edit" onClick={() => onEdit(student)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
