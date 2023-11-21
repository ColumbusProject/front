import { Form } from 'semantic-ui-react'
import React, { useState } from 'react';
import axios from 'axios';


export default function create() {
    const [firstName, setFirstName] = useState('');  
    const [MiddleName, setMiddleName] = useState('');  
    const [LastName, setLastName] = useState('');  
    const postData = () => {
      // 
        axios.post(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`, {
          firstName,
          MiddleName,
          LastName,
      
      })



      console.log(firstName);
      console.log(MiddleName);
      console.log(LastName);
    }
    
  return (

    <div>
      <Form className="create-form">
        <Form.Group>
          <Form.Input label='First name' placeholder='First Name' width={6} />
          <Form.Input label='Middle Name' placeholder='Middle Name' width={4} />
          <Form.Input label='Last Name' placeholder='Last Name' width={6} />
        </Form.Group>
        <Form.Group>
          <Form.Input placeholder='2 Wide' width={2} />
          <Form.Input placeholder='12 Wide' width={12} />
          <Form.Input placeholder='2 Wide' width={2} />
        </Form.Group>
        <Form.Group>
          <Form.Input placeholder='8 Wide' width={8} />
          <Form.Input placeholder='6 Wide' width={6} />
          <Form.Input placeholder='2 Wide' width={2} />
        </Form.Group>
      </Form>
      
    </div>
  )
}
