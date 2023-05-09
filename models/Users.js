const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
  userName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  deleted: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

const UserModel = model('Users', UsersSchema);

module.exports = {
  Users: UserModel
};
