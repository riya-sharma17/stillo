import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import { SUCCESS_RESPONSE, ERROR_RESPONSE } from "../utils/message";

//GET CURRENT USER
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    return res.status(200).json({
      message: SUCCESS_RESPONSE.USER_FETCHED,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// LIST USERS (ADMIN ONLY)
export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query as any;

    page = Number(page);
    limit = Number(limit);

    const query: any = {};

    if (search) {
      query.$or = [
        { phoneNumber: { $regex: search, $options: "i" } },
      ];
    }

    const total = await userModel.countDocuments(query);

    const users = await userModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      message: SUCCESS_RESPONSE.USERS_FETCHED,
      data: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE OWN ACCOUNT
export const deleteMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user?._id) {
      return res.status(401).json({
        message: ERROR_RESPONSE.UNAUTHORIZED,
      });
    }

    await userModel.findByIdAndDelete(user._id);

    return res.status(200).json({
      message: SUCCESS_RESPONSE.USER_DELETED,
    });
  } catch (error) {
    next(error);
  }
};