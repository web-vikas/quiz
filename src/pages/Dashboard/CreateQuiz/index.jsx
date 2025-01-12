import { Button, Card, Space, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { UserWrapper } from 'src/components';
import AddQuestionModel from './components/AddQuestionModel';

export const CreateQuiz = () => {
  const [isQuestionModelVisible, setQuestionModelVisible] = useState(false);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <Button onClick={() => {

            console.log('hello');
            
          }}>
            
          Delete</Button>
        </Space>
      )
    }
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ];
  return (
    <UserWrapper>
      <Card>
        <div>
          <h2>Quiz</h2>
        </div>
        <div className="flex justify-end">
          <Button
            type="primary"
            onClick={() => {
              setQuestionModelVisible(true);
            }}
          >
            Add Quiz
          </Button>
        </div>
      </Card>
      <AddQuestionModel
        isQuestionModelVisible={isQuestionModelVisible}
        setIsQuestionVisible={setQuestionModelVisible}
      />
      <Card>
        <Table columns={columns} dataSource={data} />;
      </Card>
    </UserWrapper>
  );
};
