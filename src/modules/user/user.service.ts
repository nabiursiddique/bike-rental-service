/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from 'express';
import { User } from './user.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

//* get profile from db
const getProfileFromDB = async (req: Request) => {
  // getting the user from req, we have set user in req in auth from jwt payload
  const user = req.user;

  // now we will find the user in db using email
  const isUserExists = await User.findOne({ email: user.email });

  // throwing error if we don't find the user
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // removing the password field in response
  const removeFields = isUserExists.toObject();
  const { password, ...remainingData } = removeFields;

  return remainingData;
};

//* update profile into db
const updateProfileIntoDB = async (req: Request) => {
  // Restrict user from updating email & password
  if (req.body.email || req.body.password) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Updating email & password is forbidden',
    );
  }

  // getting profile info from request
  const user = req.user;

  // checking if user exists
  const isUserExists = await User.findOne({ email: user.email });

  // throwing error if we don't find the user
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // updating profile info in db using email
  const result = await User.findOneAndUpdate({ email: user.email }, req.body, {
    new: true,
  });

  // throwing error if we could not update user
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error in updating profile info');
  }

  // removing the password field in response
  const removePassword = result?.toObject();
  const { password, createdAt, updatedAt, ...remainingData } = removePassword;

  return remainingData;
};

export const userServices = {
  getProfileFromDB,
  updateProfileIntoDB,
};
