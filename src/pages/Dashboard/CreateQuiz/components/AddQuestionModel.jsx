import { Form, Modal, Input, Button } from 'antd';
import React from 'react';

const AddQuestionModel = ({ isQuestionModelVisible, setIsQuestionVisible }) => {
  const handelAddNewQuestion = (values) => {
    console.log(values);
  };
  return (
    <Modal
      title="Add New Question"
      open={isQuestionModelVisible}
      onCancel={() => {
        setIsQuestionVisible(false);
      }}
      footer={null}
      centered
    >
      <Form layout='vertical' >
        <Form.Item
          name="ques_name"
          label="Question Name"
          rules={[{ required: true, message: 'Please input question name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item layout='horizontal'
          name="ques_name_a"
          label=" A"
          rules={[{ required: true, message: 'Please input question name!' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item layout='horizontal'
          name="ques_name_b"
          label=" B"
          rules={[{ required: true, message: 'Please input question name!' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item layout='horizontal'
          name="ques_name_c"
          label=" C"
          rules={[{ required: true, message: 'Please input question name!' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item layout='horizontal'
          name="ques_name_d"
          label=" D"
          rules={[{ required: true, message: 'Please input question name!' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item layout='vertical'
          name="ques_name_correct_ans"
          label="Correct Anstwer"
          rules={[{ required: true, message: 'Please input question name!' }]}
          >
            <Input/>
          </Form.Item>

        <Form.Item className='flex  justify-end'>
          <Button  type='primary'>Submit</Button>
        </Form.Item> 
      </Form>
    </Modal>
  );
};

export default AddQuestionModel;
