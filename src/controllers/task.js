import crypto from 'crypto';

import { createRequestBody, doesExist } from '../utils.js';

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

export const getTasksHandler = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(tasks)),
    });
    res.end(JSON.stringify(tasks));
};

export const getTaskHandler = (req, res) => {
    const id = req.url.split('/')[3];
    const task = tasks.find((task) => task.id === id);
    if (!doesExist(tasks, id)) {
        res.writeHead(404, {
            'Content-Type': 'application/json',
        });
        res.write(JSON.stringify({ message: 'Task not found.' }));
    } else {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(task)),
        });
        res.end(JSON.stringify(task));
    }
};

export const updateTaskHandler = (req, res) => {
    const id = req.url.split('/')[3];

    if (!doesExist(tasks, id)) {
        res.writeHead(404, {
            'Content-Type': 'application/json',
        });
        res.write(JSON.stringify({ message: 'Task not found.' }));
    } else {
        createRequestBody(req, res, (body, res) => {
            const currTask = JSON.parse(body);
            currTask.id = id;
            tasks = tasks.map((task) => (task.id !== id ? task : currTask));

            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(currTask)),
            });
            res.write(JSON.stringify(currTask));
        });
    }
};

export const deleteTaskHandler = (req, res) => {
    const id = req.url.split('/')[3];

    if (!doesExist(tasks, id)) {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: 'Task not found.' }));
    } else {
        const index = tasks.findIndex((task) => task.id === id);

        tasks = tasks.toSpliced(index, 1);
        res.statusCode = 204;
        res.end();
    }
};

export const addTaskHandler = (req, res) => {
    createRequestBody(req, res, (body, res) => {
        const newTask = JSON.parse(body);
        newTask.id = crypto.randomUUID();
        tasks = tasks.concat(newTask);
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(newTask)),
        });
        res.end(JSON.stringify(newTask));
    });
};

export const notFoundHandler = (req, res) => {
    res.writeHead(404, {
        'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ message: 'Route not found' }));
};
