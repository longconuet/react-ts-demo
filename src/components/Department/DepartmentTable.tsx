import { Button, Table, Space, Alert } from 'antd'
import { Department } from '../../types'

interface DepartmentTableProps {
  departments: Department[]
  isLoading: boolean
  pagination: {
    current: number
    pageSize: number
    total: number
  }
  onEdit: (record: Department) => void
  onDelete: (id: string) => void
  onPageChange: (page: number) => void
}

function DepartmentTable({
  departments,
  isLoading,
  pagination,
  onEdit,
  onDelete,
  onPageChange,
}: DepartmentTableProps) {
  const columns = [
    {
      title: 'No',
      key: 'no',
      render: (_: any, __: Department, index: number) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Department) => (
        <Space>
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={departments}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: onPageChange,
        }}
        className="bg-white shadow-md rounded-lg"
      />
    </>
  )
}

export default DepartmentTable