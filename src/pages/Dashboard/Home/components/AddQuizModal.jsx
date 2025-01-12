import { Button, Form, Input, Modal } from 'antd';

const AddQuizModal = ({ x, setIsAddQuizModalVisible }) => {
  const handelAddNewQuiz = (values) => {
    console.log('handelAddNewQu', values);
  };

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
      <Form layout="vertical" onFinish={handelAddNewQuiz}>
        <Form.Item
          name="quiz_name"
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
          <Button htmlType="submit" type="primary">
            Add Quiz
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddQuizModal;
