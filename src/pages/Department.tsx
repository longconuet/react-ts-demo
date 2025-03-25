import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../stores/authStore'
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment } from '../api'
import type { Department } from '../types'
import Layout from '../layout/Layout'
import DepartmentTable from '../components/Department/DepartmentTable'
import DepartmentFormModal from '../components/Department/DepartmentFormModal'
import { Button, message, Modal, Spin } from 'antd'

const { confirm } = Modal

function Department() {
  const { logout } = useAuthStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: response, refetch, isLoading, isError, error }  = useQuery({
    queryKey: ['departments', pageNumber],
    queryFn: async () => {
      return await fetchDepartments({ pageNumber, pageSize: 3 })
    }
  })

  useEffect(() => {
    if (isError && error) {
      message.error(error instanceof Error ? error.message : 'Failed to fetch departments')
    }
  }, [isError, error])

  const departments = response?.data || []
  const pagination = {
    current: response?.pageNumber || 1,
    pageSize: response?.pageSize || 3,
    total: response?.totalCount || 0,
  }

  const createMutation = useMutation({
    mutationFn: async (data: Omit<Department, 'id'>) => {
      await createDepartment(data)
    },
    onSuccess: () => {
      refetch()
      setIsModalOpen(false)
      message.success('Department created successfully!')
    },
    onError: (error: Error) => {
      message.error(error.message)
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: Omit<Department, 'code'>) => {
      await updateDepartment(data)
    },
    onSuccess: () => {
      refetch()
      setEditingId(null)
      setIsModalOpen(false)
      message.success('Department updated successfully!')
    },
    onError: (error: Error) => {
      message.error(error.message)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteDepartment(id)
    },
    onSuccess: () => {
      refetch()
      message.success('Department deleted successfully!')
    },
    onError: (error: Error) => {
      message.error(error.message)
    },
  })

  const handleAddOrEdit = (values: Department) => {
    if (editingId) {
      updateMutation.mutate({ ...values, id: editingId })
    } else {
      const { id, ...data } = values
      createMutation.mutate(data)
    }
  }

  const handleEdit = (record: Department) => {
    setEditingId(record.id)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    confirm({
      title: 'Delete Department',
      content: 'Are you sure you want to delete this department?',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteMutation.mutate(id)
      },
      onCancel() { },
    })
  }

  return (
    <Layout title="Departments" onLogout={logout}>
      {isLoading ? (
        <Spin size="large" tip="Loading departments...">
          <div className="text-center mt-10 min-h-[200px]" />
        </Spin>
      ) : (
        <>
          <div className="mb-6">
            <Button
              type="primary"
              onClick={() => {
                setEditingId(null)
                setIsModalOpen(true)
              }}
              disabled={isLoading}
            >
              Add Department
            </Button>
          </div>

          <DepartmentTable
            departments={departments}
            isLoading={isLoading}
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
        </>
      )}
    </Layout>
  )
}

export default Department