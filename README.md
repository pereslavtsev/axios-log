# axios-log

![npm](https://img.shields.io/npm/v/axios-log)
![npm](https://img.shields.io/npm/l/axios-log)
![npm](https://img.shields.io/circleci/build/github/pereslavtsev/axios-log)

> Easy way to log all Axios calls

![Alt text](demo/src/screenshot.gif?raw=true 'Screenshot')

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

## Contributing

 1. **Clone** the project to your own machine;
 2. **Checkout** a new branch from `master`;
 3. **Run** a demo project:
    1. Install all package dependencies via npm: `npm i`<br/>or using yarn: `yarn`;
    2. Build the bundle in development mode: `npm run dev` or `yarn dev`;
    3. Link a current bundle location: `npm link`;
    4. Open a new terminal tab and change directory to demo: `cd demo`.<br/>
       There is a simple React-based app, but you can use any other repo for testing;
    5. Install demo dependencies in the same way as the library;
    6. Link `axios-log` package via `npm link axios-log`;
    7. Run the demo project via `npm start` or `yarn start`.<br/>
       Now any change from library source code will be applied in the demo project;
 3. **Commit** changes to your own branch;
 4. **Push** your work back up to your fork;
 5. Submit a **Pull request** so that we can review your changes.
