import { Button, Card, Form, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserWrapper } from 'src/components';
import AddQuestionModel from './components/AddQuestionModel';
import { useLocation, useNavigate } from 'react-router-dom';
import { useErrorLog } from 'src/hooks';
import { API } from 'src/services';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { loadingStart, loadingStop } from 'src/redux/action';
import { parseMongoId } from 'src/services/core';

export const CreateQuiz = () => {
  const handelError = useErrorLog('pages/dashboard/createQuiz');
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id = '' } = state;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuestionModelVisible, setQuestionModelVisible] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (id) {
      init();
    } else {
      navigate('/dashboard');
    }
  }, []);

  const init = async () => {
    try {
      const res = await API.getQuizById(id);
      if (res) {
        setQuizData(res?.data);
        fetchQuestions();
      }
    } catch (error) {
      handelError(error);
    }
  };

  const createQuizQuestion = async (values) => {
    try {
      setIsLoading(true);
      const payload = {
        quizId: id,
        questionName: values?.ques_name,
        a: values?.ques_name_a,
        b: values?.ques_name_b,
        c: values?.ques_name_c,
        d: values?.ques_name_d,
        correctAns: values?.ques_name_correct_ans
      };
      const res = await API.CreateNewQuestion(payload, 'Question Added Successfully.', 'Adding..');
      if (res) {
        fetchQuestions();
        setQuestionModelVisible(false);
        form.resetFields();
      }
    } catch (error) {
      handelError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      dispatch(loadingStart());
      const res = await API.getQuestionsByQuizId(id);
      if (res) setQuestions(res?.data);
    } catch (error) {
      handelError(error);
    } finally {
      dispatch(loadingStop());
    }
  };

  const columns = [
    {
      title: '#',
      dataIndex: '_id',
      key: '_id',
      width: 50,
      render: (_id) => <p>{parseMongoId(_id)}</p>
    },
    {
      title: 'Question',
      dataIndex: 'question_name',
      key: 'question_name',
      width: 300
    },
    {
      title: 'Option A',
      dataIndex: 'option_a',
      key: 'option_a',
      width: 150
    },
    {
      title: 'Option B',
      dataIndex: 'option_b',
      key: 'option_b',
      width: 150
    },
    {
      title: 'Option C',
      dataIndex: 'option_c',
      key: 'option_c',
      width: 150
    },
    {
      title: 'Option D',
      dataIndex: 'option_d',
      key: 'option_d',
      width: 150
    },
    {
      title: 'Correct Answer',
      dataIndex: 'correct_answer',
      key: 'correct_answer',
      width: 150
    }
  ];

  return (
    <UserWrapper>
      <Card title="Quiz" className="mb-3">
        <div>
          <h2>{quizData?.quiz_name}</h2>
          <p>{moment(quizData?.createdAt).format('l')}</p>
        </div>
      </Card>
      <Card
        extra={
          <Button
            type="primary"
            onClick={() => {
              setQuestionModelVisible(true);
            }}
          >
            Add Question
          </Button>
        }
      >
        <Table columns={columns} dataSource={questions} />
      </Card>
      <AddQuestionModel
        isQuestionModelVisible={isQuestionModelVisible}
        setIsQuestionVisible={setQuestionModelVisible}
        createQuizQuestion={createQuizQuestion}
        loading={isLoading}
        form={form}
      />
    </UserWrapper>
  );
};
