import { NextFunction, Request, Response } from 'express';
import { appCommonTypes } from '../@types/app-common';
import AppLogger from '../utils/AppLogger';
import AsyncWrapper = appCommonTypes.AsyncWrapper;
import CustomAPIError from '../exceptions/CustomAPIError';
import HttpStatus from '../helpers/HttpStatus';
import UserRepository from '../repository/UserRepository';
import { verify } from 'jsonwebtoken';
import CustomJwtPayload = appCommonTypes.CustomJwtPayload;
import settings from '../config/settings';

const userRepository = new UserRepository();

const logger = AppLogger.init(authenticateRouteWrapper.name).logger;

export default function authenticateRouteWrapper(handler: AsyncWrapper) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      logger.error(`malformed authorization: 'Bearer' missing`);
      return next(CustomAPIError.response(HttpStatus.UNAUTHORIZED.value, HttpStatus.UNAUTHORIZED.code));
    }

    let authorization = '';
    if (token.startsWith('Bearer')) {
      authorization = token.split(' ')[1].trim();
    } else {
      authorization = token
    }
  
    try {
      const key = <string>settings.jwtAccessToken.key;
      const decodedToken = verify(authorization, key) as CustomJwtPayload;
      const user = await userRepository.findById(decodedToken.userId);

      if (!user) {
        logger.error(`User not found: ${decodedToken.userId}`);
        return next(CustomAPIError.response(HttpStatus.UNAUTHORIZED.value, HttpStatus.UNAUTHORIZED.code));
      }

      req.user = user;
      await handler(req, res, next);
    } catch (error: any) {
      logger.error(`Authentication error: ${error.message}`);
      return next(CustomAPIError.response(error, HttpStatus.INTERNAL_SERVER_ERROR.code));
    }
  };
}
