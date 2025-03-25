import { useState } from 'react'
import { useQuery, useMutation, UseQueryResult } from '@tanstack/react-query'
import { useAuthStore } from '../stores/authStore'
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment } from '../api'
import type { Department, PaginatedResponse } from '../types'
import Layout from '../layout/Layout'
import DepartmentTable from '../components/Department/DepartmentTable'
import DepartmentFormModal from '../components/Department/DepartmentFormModal'
import { Button, message } from 'antd'

function Department() {
  const { logout } = useAuthStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: response, refetch, isLoading }: UseQueryResult<PaginatedResponse<Department>, Error> = useQuery({
    queryKey: ['departments', pageNumber],
    queryFn: () => fetchDepartments({ pageNumber: pageNumber, pageSize: 10 }),
    onError: (error: Error) => {
      setError(error.message)
      message.error(error.message)
    },
  })

  const departments = response?.data || []
  const pagination = {
    current: response?.pageNumber || 1,
    pageSize: response?.pageSize || 10,
    total: response?.totalCount || 0,
  }

  const createMutation = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      refetch()
      setIsModalOpen(false)
      message.success('Department created successfully!')
    },
    onError: (error: Error) => {
      setError(error.message)
      message.error(error.message)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) => updateDepartment(id, data),
    onSuccess: () => {
      refetch()
      setEditingId(null)
      setIsModalOpen(false)
      message.success('Department updated successfully!')
    },
    onError: (error: Error) => {
      setError(error.message)
      message.error(error.message)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      refetch()
      message.success('Department deleted successfully!')
    },
    onError: (error: Error) => {
      setError(error.message)
      message.error(error.message)
    },
  })

  const handleAddOrEdit = (values: { name: string }) => {
    setError(null)
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: values })
    } else {
      createMutation.mutate(values)
    }
  }

  const handleEdit = (record: Department) => {
    setEditingId(record.id)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  return (
    <Layout title="Departments" onLogout={logout}>
      <div className="mb-6">
        <Button
          type="primary"
          onClick={() => {
            setEditingId(null)
            setIsModalOpen(true)
          }}
        >
          Add Department
        </Button>
      </div>

      <DepartmentTable
        departments={departments}
        isLoading={isLoading}
        error={error}
        pagination={pagination}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={setPageNumber}
      />

      <DepartmentFormModal
        visible={isModalOpen}
        editingId={editingId}
        initialValues={editingId ? departments.find((d) => d.id === editingId) : undefined}
        onSubmit={handleAddOrEdit}
        onCancel={() => setIsModalOpen(false)}
        loading={createMutation.isPending || updateMutation.isPending}
      />
    </Layout>
  )
}

export default Department