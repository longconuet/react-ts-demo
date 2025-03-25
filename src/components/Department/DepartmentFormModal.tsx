import { Form, Input, Button, Modal } from 'antd'

interface DepartmentFormModalProps {
  visible: boolean
  editingId: string | null
  initialValues?: { name: string }
  onSubmit: (values: { name: string }) => void
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
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {editingId ? 'Update' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DepartmentFormModal