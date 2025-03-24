import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../stores/authStore'
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment } from '../api'
import { Department } from '../types'

function DepartmentPage() {
  const { isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  // Fetch departments
  const { data: departments, refetch } = useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
    enabled: isAuthenticated,
  })

  // Create department
  const createMutation = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      refetch()
      setName('')
    },
  })

  // Update department
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) => updateDepartment(id, data),
    onSuccess: () => {
      refetch()
      setName('')
      setEditingId(null)
    },
  })

  // Delete department
  const deleteMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => refetch(),
  })

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [isAuthenticated, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: { name } })
    } else {
      createMutation.mutate({ name })
    }
  }

  const handleEdit = (dep: Department) => {
    setEditingId(dep.id)
    setName(dep.name)
  }

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Departments</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Department name"
              className="flex-1 px-3 py-2 border rounded"
              required
            />
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
          </div>
        </form>

        <div className="bg-white rounded-lg shadow">
          {departments?.map((dep) => (
            <div
              key={dep.id}
              className="flex justify-between items-center p-4 border-b last:border-b-0"
            >
              <span>{dep.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(dep)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(dep.id)}
                  disabled={deleteMutation.isPending}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DepartmentPage