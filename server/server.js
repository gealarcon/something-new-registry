const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const cors = require('cors');
const authController = require('./controllers/authControllers');
const dotenv = require('dotenv').config();

const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

//Added for Heroku deployment:
app.use('/build', express.static(path.join(__dirname, '../build')));

//Route Handlers:
//localhost:8080/api/auth/signup
app.use('/api/auth', authRouter);

//localhost:8080/api/products/getproducts
app.use('/api/products', productRouter);

app.get('/api/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

//if guest knows it already, checks for the username in DB
app.get('/:coupleusername', authController.checkUsername, (req, res) => {
  res.status(200).json(res.locals.coupleInfo);
});

//Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

//Page Not Found Route
app.get('*', (req, res) => {
  res.sendStatus(418);
});

//Websocket Stuff

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('clicked product', (msg) => {
    socket.emit('send product clicked to all', { msg });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(PORT, () => console.log('Server Running On Port ' + PORT));
