# axios-log

![npm](https://img.shields.io/npm/v/axios-log)
![npm](https://img.shields.io/npm/l/axios-log)
![npm](https://img.shields.io/circleci/build/github/pereslavtsev/axios-log)

> Easy way to log all Axios calls

## Install

You should install `axios-log` as a development dependency. Don't use that in production mode.

Using npm:
```
$ npm i axios
$ npm i -D axios-log
```
Using yarn:
```
$ yarn add axios
$ yarn add -D axios-log
```

## How to use

Logger can use as a `axios`'s interceptor ([Interceptors API](https://github.com/axios/axios#interceptors)).

### Request Logging
Example:
```javascript
const axios = require('axios').default;
const log = require('axios-log');

const api = axios.create();
api.interceptors.request.use(log.requestLogger);
```
Using modern ES6 syntax:
```javascript
import axios from 'axios';
import { requestLogger } from 'axios-log';

const api = axios.create();
api.interceptors.request.use(requestLogger);
```

Also if you have some else interceptors, you should use `requestLogger` use it after those.
```javascript
import axios from 'axios';
import { requestLogger } from 'axios-log';

const api = axios.create();
api.interceptors.request.use(someInterceptor1);
api.interceptors.request.use(someInterceptor2);
// ...you own interceptors
api.interceptors.request.use(requestLogger);
```

### Response Logging 
Example:
```javascript
import axios from 'axios';
import { responseLogger } from 'axios-log';

const api = axios.create();
api.interceptors.response.use(responseLogger);
```
