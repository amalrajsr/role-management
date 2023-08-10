import jwt from 'jsonwebtoken'
import AppError from '../utils/error.js';
export const authChecker = async (req, res,next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new AppError(401,'Authorization token required') 
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err) => {
      if (err) {
        throw new AppError(400,'Invalid token')
      }
      next();
    });
  } catch (error) {
    next(error)
  }
};

