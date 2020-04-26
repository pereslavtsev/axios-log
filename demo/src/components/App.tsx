import React from 'react';
import axios from 'axios';
import { Accordion, Container, Button, Form } from 'react-bootstrap';

import styles from './App.module.css'
import screenshotImg from '../screenshot.gif'

function App() {
  const handleGet = React.useCallback(async () => await axios.get('/users'), []);
  const handlePost = React.useCallback(async () => await axios.post('/users'), []);
  const handlePut = React.useCallback(async () => await axios.put('/users/1'), []);
  const handleDelete = React.useCallback(async () => await axios.delete('/users/1'), []);
  return (
    <Container fluid>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Common methods:</Form.Label>
          <br />
          <Button variant="success" onClick={handleGet}>
            GET
          </Button>{' '}
          <Button variant="warning" onClick={handlePost}>
            POST
          </Button>{' '}
          <Button variant="primary" onClick={handlePut}>
            PUT
          </Button>{' '}
          <Button variant="danger" onClick={handleDelete}>
            DELETE
          </Button>
        </Form.Group>
        <Accordion>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            See demo
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <img className={styles.demo} src={screenshotImg} alt="demo" />
          </Accordion.Collapse>
        </Accordion>
      </Form>
    </Container>
  );
}

export default App;
