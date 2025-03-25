import { Form, Input, Button, Modal, Select } from 'antd'
import { Department } from '../../types'
import { useEffect } from 'react'

interface DepartmentFormModalProps {
  visible: boolean
  editingId: string | null
  initialValues?: Department
  onSubmit: (values: Department) => void
  onCancel: () => void
  loading: boolean
}

function DepartmentFormModal({
  visible,
  editingId,
  initialValues,
  onSubmit,
  onCancel,
  loading,
}: DepartmentFormModalProps) {
  const [form] = Form.useForm()

  // console.log('visible', visible)
  // console.log('editingId', editingId)
  // console.log('initialValues', initialValues)

  // Reset form và điền initialValues khi modal mở
  useEffect(() => {
    if (visible) {
      form.resetFields();
      // console.log('reset form')
      if (initialValues) {
        form.setFieldsValue(initialValues)
        // console.log('set fields value', initialValues)
      }
    }
  }, [visible, editingId, initialValues, form])

  return (
    <Modal
      title={editingId ? 'Edit Department' : 'Add Department'}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        className="mt-4"
        initialValues={initialValues}
      >
        <Form.Item
          label="Department Name"
          name="name"
          rules={[{ required: true, message: 'Please input the department name!' }]}
        >
          <Input placeholder="Enter department name" />
        </Form.Item>

        <Form.Item
          label="Code"
          name="code"
          rules={[{ required: true, message: 'Please input the department code!' }]}
        >
          <Input disabled={!!editingId} placeholder="Enter department code" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[]}
        >
          <Input.TextArea placeholder="Enter department description" rows={3} />
        </Form.Item>

        <Form.Item
          label="Manager ID"
          name="managerId"
        >
          <Select
            placeholder="Select manager (optional)"
            allowClear
            options={[
              { value: 'manager1', label: 'Manager 1' },
              { value: 'manager2', label: 'Manager 2' },
              // Thay bằng danh sách manager thực tế từ API nếu có
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            {editingId ? 'Update' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DepartmentFormModal