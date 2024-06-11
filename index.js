import http from 'http';

import { urlMatcher } from './src/utils.js';

import {
    getTasksHandler,
    addTaskHandler,
    updateTaskHandler,
    deleteTaskHandler,
    notFoundHandler,
} from './src/controllers/task.js';

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/api/tasks') {
        getTasksHandler(req, res);
    } else if (req.method === 'POST' && req.url === '/api/tasks') {
        addTaskHandler(req, res);
    } else if (req.method === 'PUT' && urlMatcher(req.url)) {
        updateTaskHandler(req, res);
    } else if (req.method === 'DELETE' && urlMatcher(req.url)) {
        deleteTaskHandler(req, res);
    } else {
        notFoundHandler(req, res);
    }
});

server.listen(5555, () => {
    console.log('Server listening from port 5555');
});
