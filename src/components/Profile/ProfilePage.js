import React, { useState } from 'react';
import { Form, Input, Button, Image } from 'antd';

const ProfilePage = () => {
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update password and image url here

    setPassword('');
    setImageUrl('');
    setSecurityQuestionAnswer('');
  };

  return (
    <div>
  <Form onSubmit={handleSubmit}>
    <Form.Field>
      <label>New Password</label>
      <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    </Form.Field>

    <Form.Field>
      <label>Profile Image URL</label>
      <Input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
    </Form.Field>

    <Form.Field>
      <label>What is the name of the street you grew up on?</label>

      <Input type="text" value={securityQuestionAnswer} onChange={e => setSecurityQuestionAnswer(e.target.value)} />  		 
    </Form.Field>

    <Button type="submit">Update Profile</Button>  	 
  </Form>
  {imageUrl && (<Image src={imageUrl} size="small" centered />)}
</div>
  )
}

export default ProfilePage;
  