import jwt from 'jsonwebtoken';
import {
  invalidCredentialsError,
  notAuthenticatedError,
} from '../services/errorService.js';

const authUserController = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      notAuthenticatedError();
    }

    let tokenInfo; //si viene el token

    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (error) {
      invalidCredentialsError();
    }

    req.user = tokenInfo;

    next();
  } catch (error) {
    next(error);
  }
};

export default authUserController;

//este authuser lo implementamos también en los links
