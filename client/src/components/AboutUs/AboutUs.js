import React from 'react';
import { Card, Typography } from 'antd';
import './aboutus.css'
const { Title } = Typography;

const AboutUs = () => {
  return (
    <div className='about'>
    <Card className='aboutus' >
   
      <Title className='titleaboutus'  >About Team LiveWires</Title>
      <p className='text' >Team LiveWires is a team of three developers, Nathan Grandinette and Timothy Danfield. They are working together to create a productivity app that will help people stay organized and productive.</p> <br/>
      <p className='text' >The app will provide users with a range of features such as task management, calendar integration, and reminders. It will also have an intuitive user interface that makes it easy to use. With this project, Nathan, Vesper and Timothy are aiming to make it easier for people to stay on top of their tasks and get more done.</p> 
    </Card> 
</div>
  );
};
export default AboutUs;