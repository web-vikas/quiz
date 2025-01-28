import { Form, Modal, Input, Button, Select, Radio } from 'antd';
import React from 'react';

const GenerateQuestionModel = ({
  isGenerateModelVisible,
  setGenerateModelVisible,
  GenerateQuizQuestion,
  isLoading,
  form
}) => {
  return (
    <Modal
      title="Generate Question"
      open={isGenerateModelVisible}
      onCancel={() => {
        setGenerateModelVisible(false);
      }}
      footer={null}
      centered
    >
      <Form layout="vertical" form={form} onFinish={GenerateQuizQuestion}>
        <Form.Item
          name="quizTopic"
          label="Topic Name"
          rules={[{ required: true, message: 'Please input question name!' }, { min: 5 }]}
        >
          <Input placeholder="Enter your topic" />
        </Form.Item>
        <Form.Item
          layout="vertical"
          name="numberOfQuestions"
          label="Number of Questions"
          rules={[
            { required: true, message: 'Please input number of questions!' },
            { max: 2 },
            { min: 1 }
          ]}
        >
          <Input placeholder="enter number of questions" type="number" maxLength={2} />
        </Form.Item>
        <Form.Item
          name="difficulty"
          label="Difficulty Level"
          rules={[{ required: true, message: 'Please select a priority level!' }]}
        >
          <Radio.Group>
            <Radio value="high">High</Radio>
            <Radio value="medium">Medium</Radio>
            <Radio value="low">Low</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="language"
          label="Language"
          rules={[{ required: true, message: 'Please select a language!' }]}
        >
          <Radio.Group>
            <Radio value="hindi">Hindi</Radio>
            <Radio value="english">English</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GenerateQuestionModel;
