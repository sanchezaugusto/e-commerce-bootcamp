
import { Request, Response } from "express";
import { userService } from "./service";
import User from "./model";


const { getUser, getUsers, getUserByMail, createUser, loginUser } = userService;

class UserController {
  async getUsers(req: Request, res: Response) {
    const email = req.query.email as string;
    if (email) {
      try {
        const user = await getUserByMail(email);
        return res.status(200).json(user);
      } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
      }
    } else {
      try {
        const users = await getUsers();
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
      }
    }
  }
  async getUser(req: Request, res: Response) {

    const id = req.query.id as string;
    try {
      const user = await getUser(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: "User not found" });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await createUser(req.body);
      console.log(user)
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { token, userPayload } = await loginUser(req.body);

      return res.status(200).json(userPayload);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }


  // async loginUser(req: Request, res: Response) {
  //   try {
  //     const token = await loginUser(req.body);
  //     console.log(token)
  //     console.log(req.body)
  //     return res.header("authtoken", token).status(200).json("Login successful");
  //   } catch (error) {
  //     return res.status(400).json({ error: (error as Error).message });
  //   }
  // }


  async deleteUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: "User not found" });
    }
  }
  
  
  async editUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: "User not found" });
    }
  }
}

export const userController = new UserController();
