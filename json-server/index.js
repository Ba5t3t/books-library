const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const http = require('http');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.get('/books', (req, res) => {
    try {
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
        );
        return res.status(200).json(db.books);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
        );
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => {
                return user.username === username && user.password === password
            },
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

server.use(router);

const HTTP_PORT = 8000;
const httpServer = http.createServer(server);

httpServer.listen(HTTP_PORT, () => {
    console.log(`server is running on ${HTTP_PORT} port`);
});