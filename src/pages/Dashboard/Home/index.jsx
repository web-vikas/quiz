import { Button, Card, Empty, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserWrapper } from 'src/components';
import AddQuizModal from './components/AddQuizModal';
import { useErrorLog } from 'src/hooks';
import { API } from 'src/services';
import { useDispatch } from 'react-redux';
import { loadingStart, loadingStop } from 'src/redux/action';
import moment from 'moment';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const handelError = useErrorLog('pages/dashboard/home');
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [quizzes, setQuizzes] = useState([]);
  const [isAddQuizModalVisible, setIsAddQuizModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const createQuiz = async (values) => {
    try {
      setLoading(true);
      const res = await API.CreateNewQuiz(values, 'Quiz Created Successfully', 'Creating Quiz...');
      if (res) {
        form.resetFields();
        setIsAddQuizModalVisible(false);
      }
    } catch (error) {
      handelError(error);
    } finally {
      setLoading(false);
      init();
    }
  };

  const init = async () => {
    try {
      dispatch(loadingStart());
      const res = await API.GetAllQuizzes();
      if (res) {
        setQuizzes(res?.data);
      }
    } catch (error) {
      handelError(error);
    } finally {
      dispatch(loadingStop());
    }
  };

  return (
    <UserWrapper>
      <Card
        title="Quiz"
        extra={
          <Button
            type="primary"
            size="middle"
            onClick={() => {
              setIsAddQuizModalVisible(true);
            }}
          >
            Create New Quiz
          </Button>
        }
      >
        {quizzes?.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {quizzes.map((quiz) => (
              <Link to="/dashboard/quiz" state={{ id: quiz._id }} key={quiz._id} className="shadow-md p-4 rounded-md">
                <h3>{quiz.quiz_name}</h3>
                <p>{moment(quiz.createdAt).format('DD-MM-YYYY hh:mm A')}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col gap-6">
            <Empty />
            <Button
              type="primary"
              size="middle"
              onClick={() => {
                setIsAddQuizModalVisible(true);
              }}
            >
              Create New Quiz
            </Button>
          </div>
        )}
      </Card>
      <AddQuizModal
        x={isAddQuizModalVisible}
        setIsAddQuizModalVisible={setIsAddQuizModalVisible}
        createQuiz={createQuiz}
        form={form}
        loading={loading}
      />
    </UserWrapper>
  );
};
