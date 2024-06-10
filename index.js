import http from 'http';
import crypto from 'crypto';

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
        });
    }

    if (
        req.method === 'PUT' &&
        req.url.match(
            /\/tasks\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
        )
    ) {
        const id = req.url.split('/')[2];

        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        }).on('end', () => {
            const currTask = JSON.parse(body);
            currTask.id = id;
            tasks = tasks.map((task) => (task.id !== id ? task : currTask));
        });
    }

    res.end();
});

server.listen(5555, () => {
    console.log('Server listening from port 5555');
});
