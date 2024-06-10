import http from 'http';
import crypto from 'crypto';

import { urlMatcher, doesExist } from './utils.js';

let tasks = [
    {
        id: crypto.randomUUID(),
        task: 'Task 1',
        description: 'Task 1 description',
    },
    {
        id: crypto.randomUUID(),
        task: 'Task 2',
        description: 'Task 2 description',
    },
    {
        id: crypto.randomUUID(),
        task: 'Task 3',
        description: 'Task 3 description',
    },
    {
        id: crypto.randomUUID(),
        task: 'Task 4',
        description: 'Task 4 description',
    },
    {
        id: crypto.randomUUID(),
        task: 'Task 5',
        description: 'Task 5 description',
    },
    {
        id: crypto.randomUUID(),
        task: 'Task 6',
        description: 'Task 6 description',
    },
];

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/tasks') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(tasks)),
        }).end(JSON.stringify(tasks));
    }

    if (req.method === 'POST' && req.url === '/tasks') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        }).on('end', () => {
            const newTask = JSON.parse(body);
            tasks.push(newTask);
            res.statusCode = 200;
        });
    }

    if (req.method === 'PUT' && urlMatcher(req.url)) {
        const id = req.url.split('/')[2];

        if (!doesExist(tasks, id)) {
            res.statusCode = 404;
            res.write(JSON.stringify({ message: 'Task not found.' }));
        } else {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            }).on('end', () => {
                const currTask = JSON.parse(body);
                currTask.id = id;
                tasks = tasks.map((task) => (task.id !== id ? task : currTask));
                res.statusCode = 200;
            });
        }
    }

    if (req.method === 'DELETE' && urlMatcher(req.url)) {
        const id = req.url.split('/')[2];

        if (!doesExist(tasks, id)) {
            res.statusCode = 404;
            res.write(JSON.stringify({ message: 'Task not found.' }));
        } else {
            const index = tasks.findIndex((task) => task.id === id);

            tasks = tasks.toSpliced(index, 1);
            res.statusCode = 200;
        }
    }

    res.end();
});

server.listen(5555, () => {
    console.log('Server listening from port 5555');
});
