import errors from '../middlewares/errorHandler.js';
import * as usersModel from '../models/users.model.js'
import validateEmail from '../utils/validateEmail.js';

const verifySignup = async (req, res, next) => {
  let { email, username, firstName, lastName, password } = req.body;

  username = username.trim();
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  password = password.trim();

  req.body = { username, firstName, lastName, email, password };

  if (!username || !firstName || !lastName || !email || !password) {
    return errors.e400(req, res, { message: 'All fields are required.' });
  };

  if (!validateEmail(email)) {
    return errors.e400(req, res, { message: 'Invalid email format.' });
  };

  if (password.length < 6) {
    return errors.e400(req, res, { message: 'Password must be at least 6 characters long.' });
  };

  try {
    const emailExists = await usersModel.findUserByEmail(email);
    const usernameExists = await usersModel.findUserByUsername(username);

    if (emailExists && usernameExists) {
      return errors.e409(req, res, { message: 'Username and email already exist.' });
    } else if (emailExists) {
      return errors.e409(req, res, { message: 'Email already exists.' });
    } else if (usernameExists) {
      return errors.e409(req, res, { message: 'Username exists.' });
    };
  } catch (error) {
    console.error(error);
    return errors.e500(req, res, { message: 'Oops! Something went wrong. Please try again later.' });
  };

  next();
};

export default verifySignup;