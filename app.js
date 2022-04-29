require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler')
const taskRouter = require('./routes/tasks');
const userRouter = require('./routes/users');

const connection = require('./database/connection');

async function connect() {
  try{
    await connection();
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Running on ${PORT}`));
  }catch(error){
    console.log(error);
  }
}
connect();

app.use(express.json());

app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use(errorHandler)
