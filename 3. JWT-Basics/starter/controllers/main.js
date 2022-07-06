const login = async (req, res) => {
  res.send('Fake Login/Register/Signup Route');
};

const dashboard = async (req, res) => {
  const luckyNo = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello John Doe`,
    secret: `Here is ur auth data, ur lucky no is: ${luckyNo}`,
  });
};

module.exports = { login, dashboard };
