const getUserProfile = async (req, res) => {
  const { user } = req;

  return res.json({ user });
};

module.exports = {
  getUserProfile,
};
