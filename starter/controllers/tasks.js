const getAllTasks = (req, res) => {
  res.send('all tasks from the file');
};

const createTask = (req, res) => {
  res.send('created a task');
};

const getTask = (req, res) => {
  res.send('get single task');
};

const deleteTask = (req, res) => {
  res.send('delete a task');
};

const updateTask = (req, res) => {
  res.send('update a task');
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
