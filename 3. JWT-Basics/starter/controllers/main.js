//check username and password in post(login) request
//if exist create new JWT
//send back to frontend
//setup authentication so only the request with JWT can access the dashboard

const login = async (req, res) => {
  console.log(req.body);
  res.send('Fake Login/Register/Signup Route');
};

const dashboard = async (req, res) => {
  const luckyNo = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, John`,
    secret: `Here is your authorized data, your lucky number is ${luckyNo}`,
  });
};

module.exports = {
  login,
  dashboard,
};
