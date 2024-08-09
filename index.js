import http from 'http';

import { urlMatcher } from './src/utils.js';

import {
  getTasksHandler,
  getTaskHandler,
  addTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
  notFoundHandler,
} from './src/controllers/task.js';

function handleCors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    res.writeHead(200, 'OK');
    res.end();
    return;
  }
}

const PORT = process.env.PORT;

const server = http.createServer(async (req, res) => {
  handleCors(req, res);

  const { method, url } = req;

  if (method === 'GET' && url === '/api/tasks') {
    getTasksHandler(req, res);
  } else if (method === 'GET' && urlMatcher(url)) {
    getTaskHandler(req, res);
  } else if (method === 'POST' && url === '/api/tasks') {
    addTaskHandler(req, res);
  } else if (method === 'PUT' && urlMatcher(url)) {
    updateTaskHandler(req, res);
  } else if (method === 'DELETE' && urlMatcher(url)) {
    deleteTaskHandler(req, res);
  } else {
    notFoundHandler(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
