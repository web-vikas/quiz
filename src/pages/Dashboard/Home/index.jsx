import { Button, Card, Empty } from 'antd';
import React, { useState } from 'react';
import { UserWrapper } from 'src/components';
import AddQuizModal from './components/AddQuizModal';

export const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isAddQuizModalVisible, setIsAddQuizModalVisible] = useState(false);
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
          quizzes.map((quiz) => (
            <div key={quiz.id}>
              <h3>{quiz.title}</h3>
            </div>
          ))
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
      />
    </UserWrapper>
  );
};
