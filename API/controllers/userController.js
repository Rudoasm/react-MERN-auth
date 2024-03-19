import User from "../models/user.js";
import { errorHandler } from '../utilities/customerror.js';



export const test=(req, res) => {
    res.json({
      message: "Api working",
    });
  }

 
  
// delete user
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }

}