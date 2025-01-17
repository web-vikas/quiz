import React, { useEffect, useState } from 'react';
import { Input, Radio, Card, Button, Typography, Space, Progress, Layout } from 'antd';
import { UserOutlined, BookOutlined, BankOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useErrorLog } from 'src/hooks';
import { API } from 'src/services';
import { Loader } from 'src/components';
import { useDispatch } from 'react-redux';
import { loadingStart, loadingStop } from 'src/redux/action';

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

export const QuizPage = () => {
  const { quizId = '' } = useParams();
  const navigate = useNavigate();
  const handelError = useErrorLog('pages/takQuiz');
  const dispatch = useDispatch();

  // Quiz Data State
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  // User Details State
  const [userDetails, setUserDetails] = useState({
    name: '',
    class: '',
    schoolName: ''
  });

  // Quiz Progress State
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!quizId) navigate('/');
    else init();
  }, [quizId]);

  const init = async () => {
    try {
      setLoading(true);
      const res = await API.getQuestionsAndQuizInfoByQuizId(quizId);
      if (res) {
        setQuizData(res?.data);
        const initialAnswers = {};
        res.data.questions.forEach((question) => {
          initialAnswers[question._id] = '';
        });
        setAnswers(initialAnswers);
      } else {
        navigate('/');
      }
    } catch (error) {
      handelError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserDetailChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateUserDetails = () => {
    const newErrors = {};
    if (!userDetails.name.trim()) newErrors.name = 'Name is required';
    if (!userDetails.class.trim()) newErrors.class = 'Class is required';
    if (!userDetails.schoolName.trim()) newErrors.schoolName = 'School name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const startQuiz = () => {
    if (validateUserDetails()) {
      setShowQuiz(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      dispatch(loadingStart());
      const submissionData = {
        quizId,
        userDetails,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          selectedAnswer: answer
        }))
      };

      const res = await API.SubmitQuizAndGetScore(submissionData);
      if (res) {
        navigate(`/result`, {
          state: { ...res.data }
        });
      }
    } catch (error) {
      handelError(error);
    } finally {
      dispatch(loadingStop());
    }
  };

  if (loading) return <Loader />;
  if (!quizData) return null;

  const renderUserDetailsForm = () => (
    <Card title="Enter Your Details" className="shadow-lg rounded-lg">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Input
            prefix={<UserOutlined />}
            placeholder="Your name"
            value={userDetails.name}
            size="large"
            onChange={(e) => handleUserDetailChange('name', e.target.value)}
            status={errors.name ? 'error' : ''}
          />
          {errors.name && <Text type="danger">{errors.name}</Text>}
        </div>

        <div>
          <Input
            prefix={<BookOutlined />}
            placeholder="Your class"
            value={userDetails.class}
            size="large"
            onChange={(e) => handleUserDetailChange('class', e.target.value)}
            status={errors.class ? 'error' : ''}
          />
          {errors.class && <Text type="danger">{errors.class}</Text>}
        </div>

        <div>
          <Input
            prefix={<BankOutlined />}
            placeholder="Your school name"
            value={userDetails.schoolName}
            size="large"
            onChange={(e) => handleUserDetailChange('schoolName', e.target.value)}
            status={errors.schoolName ? 'error' : ''}
          />
          {errors.schoolName && <Text type="danger">{errors.schoolName}</Text>}
        </div>

        <Button type="primary" onClick={startQuiz} size="large" block>
          Start Quiz
        </Button>
      </Space>
    </Card>
  );

  const renderQuiz = () => {
    const currentQuestionData = quizData.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

    return (
      <Card className="shadow-lg rounded-lg">
        <Progress percent={progress} showInfo={false} strokeColor="#1890ff" trailColor="#f0f0f0" />
        <Title level={4} className="mt-4">
          Question {currentQuestion + 1} of {quizData.questions.length}
        </Title>
        <Text strong className="text-lg">
          {currentQuestionData.question_name}
        </Text>
        <div className="mt-4">
          <Radio.Group
            className="w-full"
            size="large"
            value={answers[currentQuestionData._id]}
            onChange={(e) => handleAnswerChange(currentQuestionData._id, e.target.value)}
          >
            <Space direction="vertical" className="w-full">
              {['a', 'b', 'c', 'd'].map((option) => (
                <Radio
                  key={option}
                  value={option}
                  size="large"
                  className="w-full p-2 border border-gray-200 rounded hover:bg-gray-50"
                >
                  {currentQuestionData[`option_${option.toLowerCase()}`]}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>
        <div className="flex justify-between mt-4">
          <Button onClick={prevQuestion} disabled={currentQuestion === 0} size="large">
            Previous
          </Button>
          {currentQuestion < quizData.questions.length - 1 ? (
            <Button type="primary" onClick={nextQuestion} size="large">
              Next
            </Button>
          ) : (
            <Button
              size="large"
              type="primary"
              onClick={handleSubmitQuiz}
              className="bg-green-500 hover:bg-green-600"
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Header className="bg-white shadow-md">
        <Title level={2} className="text-blue-600 m-0 py-4">
          {quizData.quiz_name}
        </Title>
      </Header>
      <Content className="p-8">
        <div className="max-w-2xl mx-auto">
          {!showQuiz ? renderUserDetailsForm() : renderQuiz()}
        </div>
      </Content>
      <Footer className="text-center bg-white">
        Quiz ©{new Date().getFullYear()} Created by Vikas Patel
      </Footer>
    </Layout>
  );
};
