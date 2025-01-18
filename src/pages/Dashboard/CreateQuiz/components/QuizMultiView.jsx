import { useState } from 'react';
import { Button, Card, List, Space, Table, Radio, Popconfirm, message } from 'antd';
import { ClipboardIcon, TableIcon, ListTodoIcon, Grid3X3 } from 'lucide-react';

const QuizMultiView = ({ quizData, questions, onDeleteQuestion, onDeleteQuiz, id }) => {
  const [viewType, setViewType] = useState('list');

  const columns = [
    {
      title: '#',
      dataIndex: '_id',
      key: '_id',
      width: 50,
      render: (_id) => <p>{_id.slice(-4)}</p>
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
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (question) => (
        <Space size="small">
          <Popconfirm
            placement="topRight"
            onConfirm={() => onDeleteQuestion(question)}
            title="Delete the question"
            description="Are you sure to delete this question?"
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const renderListItem = (item) => (
    <List.Item
      key={item._id}
      actions={[
        <Popconfirm
          placement="topRight"
          onConfirm={() => onDeleteQuestion(item)}
          title="Delete the question"
          description="Are you sure to delete this question?"
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ]}
    >
      <List.Item.Meta
        title={item.question_name}
        description={
          <Space direction="vertical">
            <div>A: {item.option_a}</div>
            <div>B: {item.option_b}</div>
            <div>C: {item.option_c}</div>
            <div>D: {item.option_d}</div>
            <div className="font-bold">Correct Answer: {item.correct_answer}</div>
          </Space>
        }
      />
    </List.Item>
  );

  const renderGridItem = (item) => (
    <Card
      key={item._id}
      className="h-full"
      actions={[
        <Popconfirm
          placement="topRight"
          onConfirm={() => onDeleteQuestion(item)}
          title="Delete the question"
          description="Are you sure to delete this question?"
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ]}
    >
      <Card.Meta
        title={item.question_name}
        description={
          <Space direction="vertical">
            <div>A: {item.option_a}</div>
            <div>B: {item.option_b}</div>
            <div>C: {item.option_c}</div>
            <div>D: {item.option_d}</div>
            <div className="font-bold">Correct Answer: {item.correct_answer}</div>
          </Space>
        }
      />
    </Card>
  );

  const copyQuizLink = () => {
    const quizLink = window.location.origin + '/quiz/' + id;
    navigator.clipboard.writeText(quizLink);
    message.success('Quiz link copied successfully.');
  };

  return (
    <div className="space-y-4">
      <div>
        <Space>
          <Radio.Group value={viewType} onChange={(e) => setViewType(e.target.value)}>
            <Radio.Button value="table">
              <div className="flex items-center justify-center h-full w-full">
                <TableIcon size={18} />
              </div>
            </Radio.Button>
            <Radio.Button value="list">
              <div className="flex items-center justify-center h-full w-full">
                <ListTodoIcon size={18} />
              </div>
            </Radio.Button>
            <Radio.Button value="grid">
              <div className="flex items-center justify-center h-full w-full">
                <Grid3X3 size={18} />
              </div>
            </Radio.Button>
          </Radio.Group>
        </Space>
      </div>
      <div>
        {viewType === 'table' && (
          <div className='overflow-scroll'>
            <Table columns={columns} dataSource={questions} rowKey="_id" scroll={{ x: 400 }} />
          </div>
        )}

        {viewType === 'list' && (
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={questions}
            renderItem={renderListItem}
          />
        )}

        {viewType === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {questions.map(renderGridItem)}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizMultiView;
