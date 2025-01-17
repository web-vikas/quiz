import { Button, Form, Input, Modal } from 'antd';

const AddQuizModal = ({ x, setIsAddQuizModalVisible, createQuiz, form, loading }) => {
  return (
    <Modal
      title="Add New Quiz"
      open={x}
      onCancel={() => {
        setIsAddQuizModalVisible(false);
      }}
      footer={null}
      centered
    >
      <Form layout="vertical" form={form} onFinish={createQuiz}>
        <Form.Item
          name="quizName"
          label="Quiz Name"
          rules={[
            {
              required: true,
              message: 'Please input quiz name!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Add Quiz
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddQuizModal;
