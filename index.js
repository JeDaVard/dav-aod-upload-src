require('dotenv').config()
const http = require('http');
const express = require('express');

const uploadRouter = require('./routes/uploads');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;

app.use('/', uploadRouter);

server.listen(port, () => {
    console.info(`Server is up on ${port}`);
});
