//check username and password in post(login) request
//if exist create new JWT
//send back to frontend
//setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const CustomApiError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomApiError('Please provide username and password', 400);
  }
  // just for demo, normally provided by mongo db
  const id = new Date().getDate();
  //just for demo, in production use long complex and unguessable string for JWT_SECRET to sign our tokens
  // keep payload small for best ux
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  }); // no confidential data
  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomApiError('No token provided', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded); //{ id: 6, username: 'john', iat: 1657120224, exp: 1659712224 }

    const luckyNo = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNo}`,
    });
  } catch (error) {
    throw new CustomApiError('Not authorized to access this route', 400);
  }
};

module.exports = {
  login,
  dashboard,
};
