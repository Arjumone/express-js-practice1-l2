import type { Request, Response } from "express";
import { userService } from "./users/user.service";

  const createUser =async (req: Request, res: Response) => {
  // console.log(req.body)
  // const body = req.body;
  try {
   const result = await userService.createUserIntoDB(req.body)
    res.status(200).json({
      success: true,
      message: "User Created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

///get user
 const getAllUser = async (req: Request, res: Response) => {
  try {
    const result =await userService.getAllUserFromDB()
    res.status(200).json({
      success: true,
      message: "Users retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

const getSingleUser =async (req: Request, res: Response) => {
  try {
     const { id } = req.params;
   const result =await userService.getSingleUserFromDB(id as string)

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found ",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrived successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result =await userService.updateUserFromDB(req.body,id as string)
    // console.log(result)

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found ",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }}
 

  const deleteUser = async (req: Request, res: Response) => {
  try {
     const { id } = req.params;

    const result = await userService.deleteUserFromDB(id as string)

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found ",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

export const userController= {createUser,getAllUser,getSingleUser,updateUser,deleteUser}