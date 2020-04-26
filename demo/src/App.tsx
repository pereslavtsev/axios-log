import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { requestLogger, responseLogger } from 'axios-log';
import { Container, Button, Form } from 'react-bootstrap';

axios.interceptors.request.use(requestLogger);
axios.interceptors.response.use(responseLogger);

const mock = new MockAdapter(axios);

mock
  .onGet('/users')
  .reply(200, {
    users: [{ id: 1, name: 'John Smith' }],
  })
  .onPost('/users')
  .reply(201, { id: 1, name: 'John Smith' })
  .onPut('/users/1')
  .reply(202, { name: 'Smith John' })
  .onDelete('/users/1')
  .reply(204, true);

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
      </Form>
    </Container>
  );
}

export default App;
