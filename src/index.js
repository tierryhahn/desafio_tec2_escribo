const express = require('express');
const bodyParser = require('body-parser');
const { signUp, signIn } = require('./controllers/authController');
const { getUser } = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());

// Rotas
app.post('/signup', signUp);
app.post('/signin', signIn);
app.get('/user', getUser);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
