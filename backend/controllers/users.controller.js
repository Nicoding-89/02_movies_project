import bcrypt from 'bcrypt';
import * as usersModel from '../models/users.model.js';
import errors from '../middlewares/errorHandler.js';

export const registerUser = async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  if (password.length < 6) {
    return errors.e400(req, res, { message: 'Password must be at least 6 characters long.' });
  };

  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await usersModel.createNewUser(username, firstName, lastName, email, hashedPassword);
    if (result) {
      return res.status(200).json({ message: 'User created successfully.' });
    } else {
      return errors.e500(req, res, { message: 'User could not be created.' });
    };
  } catch (error) {
    return errors.e500(req, res, { message: 'Oops! Something went wrong. Please try again later.' });
  };
};