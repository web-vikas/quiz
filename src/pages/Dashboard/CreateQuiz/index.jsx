import { Button, Card, Form, message, Popconfirm, Space, Table, Tag } from 'antd';
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
import { ClipboardTypeIcon } from 'lucide-react';
import QuizMultiView from './components/QuizMultiView';
import GenerateQuestionModel from './components/GenerateQuestionModel';

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
  const [isGenerateModelVisible, setGenerateModelVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [GenerateQuestions, setGenerateQuestions] = useState([]);

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

  const deletedQuiz = async () => {
    try {
      dispatch(loadingStart());
      const res = await API.deleteQuizById(id);
      if (res) {
        navigate('/dashboard');
      }
    } catch (error) {
      handelError(error);
    } finally {
      dispatch(loadingStop());
    }
  };

  const deletedQuestion = async (question) => {
    try {
      dispatch(loadingStart());
      const res = await API.deleteQuestionByQuestionId(question._id);
      if (res) {
        fetchQuestions();
      }
    } catch (error) {
      handelError(error);
    } finally {
      dispatch(loadingStop());
    }
  };
  const GenerateQuizQuestion = async (values) => {
    console.log(values);
    try {
      setIsLoading(true);
      const payload = {
        quizTopic: values?.quizTopic,
        numberOfQuestions: values?.numberOfQuestions,
        difficulty: values?.difficulty,
        language: values?.language
      };
      const res = await API.GenerateQuestions(
        payload,
        'Question Generate Successfully.',
        'Generate..'
      );
      if (res) {
        console.log(res);
        setGenerateModelVisible(false);
        form.resetFields();
        setGenerateQuestions(res);
      }
    } catch (error) {
      handelError(error);
    }
  };
  const addAll = async () => {
    try {
      setIsLoading(true);
      const payload = {
        quizId: id,
        questions: GenerateQuestions
      };
      const res = await API.InsertQuestions(payload, 'Question Added Successfully.', 'Adding..');
      if (res) {
        fetchQuestions();
        // setGenerateModelVisible(false);
        // form.resetFields();
        setGenerateQuestions([]);
      }
    } catch (error) {
      handelError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const columns = [
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
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   width: 100
    //   // render: (question) => (
    //   //   <Space size="small">
    //   //     <Popconfirm
    //   //       placement="topRight"
    //   //       onConfirm={() => onDeleteQuestion(question)}
    //   //       title="Delete the question"
    //   //       description="Are you sure to delete this question?"
    //   //       okText="Yes"
    //   //       cancelText="No"
    //   //     >
    //   //       <Button danger>Delete</Button>
    //   //     </Popconfirm>
    //   //   </Space>
    //   // )
    // }
  ];
  return (
    <UserWrapper>
      <Card
        title="Quiz"
        className="mb-3"
        extra={
          <Space>
            <Popconfirm
              placement="topLeft"
              onConfirm={deletedQuiz}
              title="Delete the quiz"
              description="Are you sure to delete this quiz?"
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            {/* copy link button */}
            <Button
              type="primary"
              onClick={() => {
                const quizLink = window.location.origin + '/quiz/' + id;
                navigator.clipboard.writeText(quizLink);
                message.success('Quiz link copied successfully.');
              }}
            >
              <ClipboardTypeIcon size={16} /> Copy Quiz Link
            </Button>
          </Space>
        }
      >
        <div className="flex justify-between items-center">
          <div>
            <h2>{quizData?.quiz_name}</h2>
            <p>{moment(quizData?.createdAt).format('l')}</p>
          </div>
          <div>
            <Button
              className="bg-primary text-stone-50"
              onClick={() => setGenerateModelVisible(true)}
            >
              Generate Questions
            </Button>
          </div>
        </div>
      </Card>
      {GenerateQuestions.length > 0 ? (
        <Card
          title="Generated Questions"
          className="mb-3"
          extra={
            <Button type="primary" onClick={addAll}>
              Save all
            </Button>
          }
        >
          <div>
            <Table columns={columns} dataSource={GenerateQuestions} scroll={{ x: 200 }} />
          </div>
        </Card>
      ) : null}
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
        {/* <Table
          columns={columns}
          dataSource={questions}
          rowKey={'_id'}
          scroll={{ x: 200 }}
        /> */}
        <QuizMultiView
          quizData={quizData}
          questions={questions}
          onDeleteQuestion={deletedQuestion}
          onDeleteQuiz={deletedQuiz}
          id={id}
        />
      </Card>
      <AddQuestionModel
        isQuestionModelVisible={isQuestionModelVisible}
        setIsQuestionVisible={setQuestionModelVisible}
        createQuizQuestion={createQuizQuestion}
        loading={isLoading}
        form={form}
      />
      <GenerateQuestionModel
        isGenerateModelVisible={isGenerateModelVisible}
        setGenerateModelVisible={setGenerateModelVisible}
        GenerateQuizQuestion={GenerateQuizQuestion}
        loading={isLoading}
        form={form}
      />
    </UserWrapper>
  );
};
