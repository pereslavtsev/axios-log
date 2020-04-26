import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { requestLogger, responseLogger } from 'axios-log';

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
