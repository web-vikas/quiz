import React, { useRef } from 'react';
import { Card, Typography, Button, List, Tag, Progress, Space, Divider } from 'antd';
import { DownloadOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import { Certificate } from './components/Certificate';

const { Title, Text } = Typography;

export const QuizResults = () => {
  const { state } = useLocation();
  const {
    score,
    totalQuestions,
    correctAnswers,
    userDetails,
    questionResults,
    attemptId,
    quizName = 'NA'
  } = state;
  const certificateRef = useRef(null);

  const downloadAsPDF = async (elementId, fileName) => {
    const element = document.getElementById(elementId);
    const canvas = await html2canvas(element,{
        useCORS: true,
    });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(fileName);
  };

  const downloadCertificate = () => {
    downloadAsPDF('certificate', `certificate-${attemptId}.pdf`);
  };

  const downloadResults = () => {
    downloadAsPDF('quiz-results', `quiz-results-${attemptId}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div id="quiz-results">
        <Card className="shadow-lg mb-4">
          <div className="text-center mb-6">
            <Title level={2}>Quiz Results</Title>
            <Text className="block text-gray-600">Attempt ID: {attemptId}</Text>
          </div>

          <Space className="w-full justify-center mb-6">
            <Progress
              type="circle"
              percent={score}
              format={(percent) => (
                <div className="text-center">
                  <div className="text-lg font-bold">{percent}%</div>
                  <div className="text-sm">Score</div>
                </div>
              )}
            />
            <div className="text-center mx-8">
              <Title level={3}>{correctAnswers}</Title>
              <Text>Correct Answers</Text>
            </div>
            <div className="text-center">
              <Title level={3}>{totalQuestions}</Title>
              <Text>Total Questions</Text>
            </div>
          </Space>

          <Divider />

          <div className="mb-4">
            <Title level={4}>Student Details</Title>
            <Space direction="vertical">
              <Text>
                <strong>Name:</strong> {userDetails.name}
              </Text>
              <Text>
                <strong>Class:</strong> {userDetails.class}
              </Text>
              <Text>
                <strong>School:</strong> {userDetails.schoolName}
              </Text>
            </Space>
          </div>

          <Divider />

          <Title level={4}>Question Details</Title>
          <List
            dataSource={questionResults}
            renderItem={(item, index) => (
              <List.Item>
                <Card className="w-full">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Text strong>
                        Question {index + 1}: {item.questionName}
                      </Text>
                      <div className="mt-2">
                        <Space direction="vertical">
                          <Text>
                            Your Answer:
                            <Tag color={item.isCorrect ? 'green' : 'red'} className="ml-2">
                              {item.userAnswer ? item.userAnswer.toUpperCase() : 'Not Answered'}
                            </Tag>
                          </Text>
                          <Text>
                            Correct Answer:
                            <Tag color="green" className="ml-2">
                              {item.correctAnswer.toUpperCase()}
                            </Tag>
                          </Text>
                        </Space>
                      </div>
                    </div>
                    {item.isCorrect ? (
                      <CheckCircleOutlined className="text-green-500 text-xl" />
                    ) : (
                      <CloseCircleOutlined className="text-red-500 text-xl" />
                    )}
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </div>
      <div className="mb-4" id="certificate" ref={certificateRef}>
        <Certificate
          name={userDetails.name}
          quizName={quizName}
          score={score}
          date={new Date().toLocaleDateString()}
        />
      </div>

      <div className="flex justify-center gap-4">
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={downloadResults}
          className="bg-blue-500"
        >
          Download PDF
        </Button>

        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={downloadCertificate}
          className="bg-purple-500"
        >
          Download Certificate
        </Button>
      </div>
    </div>
  );
};
