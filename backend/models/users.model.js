import { pool } from '../config/db.config.js'

export const createNewUser = async (username, firstName, lastName, email, password) => {
  const query = {
    text: `
      INSERT INTO users (username, first_name, last_name, email, password_hash)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`,
    values: [username, firstName, lastName, email, password]
  };

  try {
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      return result.rows[0].username;
    };
    return null;
  } catch (error) {
    console.error(error, 'Error creating new user.');
    throw error;
  };
};

export const findUserByEmail = async (email) => {
  const query = {
    text: `
      SELECT email FROM users WHERE email = $1;
    `,
    values: [email]
  };

  try {
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      return result.rows[0].email;
    };
    return null;

  } catch (error) {
    console.error(error, "Error finding user's email.");
    throw error;
  };
};

export const findUserByUsername = async (username) => {
  const query = {
    text: `
      SELECT username FROM users WHERE username = $1;
    `,
    values: [username]
  };

  try {
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      return result.rows[0].username;
    };
    return false;

  } catch (error) {
    console.error(error, 'Error finding username.');
    throw error;
  };
};