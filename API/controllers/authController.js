import User from "../models/user.js";
import bcryptjs from 'bcryptjs';
// for password encryption

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//   awaits makes js stay in this call as long as the job is done. await essentials async function
