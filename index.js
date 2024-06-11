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

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
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
