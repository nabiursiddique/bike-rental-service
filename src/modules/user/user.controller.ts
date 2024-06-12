import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const userSignUp = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await UserServices.userSignUpIntoDB(user);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});

export const UserControllers = {
  userSignUp,
};
