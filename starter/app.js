const express = require('express');
const app = express();
const port = 3000;
const tasks = require('./routes/tasks');

// routes
app.get('/hello', (req, res) => {
  res.send('Task Manager App');
});

app.use('/api/v1/tasks', tasks);
//app.get('/api/v1/tasks') - get all the tasks
//app.post('/api/v1/tasks') - create a new task
//app.get('/api/v1/tasks/:id') - get a single task
//app.patch('/api/v1/tasks/:id') - update a task
//app.patch('/api/v1/tasks/:id') - update a task

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
