import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

export const Certificate = ({ name, quizName, score, date }) => {
  return (
    <Card
      className="certificate"
      style={{
        width: '100%',
        height: '600px',
        backgroundImage: 'url("https://certify-certificate.netlify.app/assets/dummy2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
        textAlign: 'center'
      }}
    >
     
      <Title level={1} style={{ marginBottom: '60px' }}>
        {name}
      </Title>
      
      {/* <Text style={{ fontSize: '18px' }}>Date: {date}</Text> */}
    </Card>
  );
};
