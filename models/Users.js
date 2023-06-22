import { Schema, model } from 'mongoose';

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

export const Users = model('Users', UsersSchema);
