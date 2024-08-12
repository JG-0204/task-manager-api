import crypto from 'crypto';

import { createRequestBody, doesExist, getCurrentDate } from '../utils.js';

let tasks = [
  {
    id: crypto.randomUUID(),
    task: 'Task 1',
    description: 'Task 1 description',
    priority: 'low',
    dueDate: '8/16/24',
    dateAdded: '8/10/24',
    status: 'pending',
  },
  {
    id: crypto.randomUUID(),
    task: 'Task 2',
    description: 'Task 2 description',
    priority: 'low',
    dueDate: '8/16/24',
    dateAdded: '8/10/24',
    status: 'pending',
  },
  {
    id: crypto.randomUUID(),
    task: 'Task 3',
    description: 'Task 3 description',
    priority: 'low',
    dueDate: '8/16/24',
    dateAdded: '8/10/24',

    status: 'pending',
  },
  {
    id: crypto.randomUUID(),
    task: 'Task 4',
    description: 'Task 4 description',
    priority: 'low',
    dueDate: '8/16/24',
    dateAdded: '8/10/24',
    status: 'pending',
  },
  {
    id: crypto.randomUUID(),
    task: 'Task 5',
    description: 'Task 5 description',
    priority: 'low',
    dueDate: '8/16/24',
    dateAdded: '8/10/24',
    status: 'pending',
  },
  {
    id: crypto.randomUUID(),
    task: 'Task 6',
    description: 'Task 6 description',
    priority: 'low',
    dueDate: '8/16/24',
    dateAdded: '8/10/24',
    status: 'pending',
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
    res.end(JSON.stringify({ message: 'Task not found.' }));
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
      const currTask = tasks.find((task) => task.id === id);
      const updatedTask = Object.assign(currTask, JSON.parse(body));
      tasks = tasks.map((task) => (task.id !== id ? task : currTask));

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(updatedTask)),
      });
      res.end(JSON.stringify(updatedTask));
    });
  }
};

export const updateTaskStatusHandler = (req, res) => {
  const id = req.url.split('/')[3];

  if (!doesExist(tasks, id)) {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify({ message: 'Task not found.' }));
  } else {
    createRequestBody(req, res, (body, res) => {
      const currTask = tasks.find((task) => task.id === id);
      const updatedTask = Object.assign(currTask, JSON.parse(body));
      tasks = tasks.map((task) => (task.id !== id ? task : currTask));

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(updatedTask)),
      });
      res.end(JSON.stringify(updatedTask));
    });
  }
};

export const deleteTaskHandler = (req, res) => {
  const id = req.url.split('/')[3];

  if (!doesExist(tasks, id)) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Task not found.' }));
  } else {
    const index = tasks.findIndex((task) => task.id === id);

    tasks = tasks.toSpliced(index, 1);
    res.statusCode = 204;
    res.end(JSON.stringify({ message: 'Task successfully deleted.' }));
  }
};

export const addTaskHandler = (req, res) => {
  createRequestBody(req, res, (body, res) => {
    const newTask = JSON.parse(body);
    newTask.id = crypto.randomUUID();
    newTask.dateAdded = getCurrentDate();
    newTask.status = 'pending';
    tasks = tasks.concat(newTask);
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(newTask)),
    });
    res.end(JSON.stringify(newTask));
  });
};

export const notFoundHandler = (req, res) => {
  try {
    res.writeHead(404, 'Not found.');
    res.write(
      JSON.stringify({
        message: 'Route not found.',
      })
    );
  } catch (err) {
    return;
  }
};
