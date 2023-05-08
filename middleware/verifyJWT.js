const verifyJWT = (req, res, next) => {
  const someUser = {
    _id: '213123123123123123',
    name: 'UserName',
  }

  console.log('verify jwt');

  // req.user = someUser;

  next();
}

module.exports = { verifyJWT };