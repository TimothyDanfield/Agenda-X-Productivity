import React from 'react';
import { Card, Typography } from 'antd';
import './aboutus.css'
const { Title } = Typography;

const AboutUs = () => {
  return (
    <Card className='main' style={{backgroundColor: '#F2F2F2', padding: '20px', borderRadius: '10px'}}>
      <Title style={{color: '#00A8E8', fontWeight: 'bold', textDecoration: 'underline'}} >About Team LiveWires</Title>
      <p style={{fontSize: '30px'}}>Team LiveWires is a team of three developers, Nathan Grandinette, Vesper Wetzel and Timothy Danfield. They are working together to create a productivity app that will help people stay organized and productive.</p> <br/>
      <p style={{fontSize: '16px'}}>The app will provide users with a range of features such as task management, calendar integration, and reminders. It will also have an intuitive user interface that makes it easy to use. With this project, Nathan, Vesper and Timothy are aiming to make it easier for people to stay on top of their tasks and get more done.</p> 
    </Card> 
  );
};
export default AboutUs;