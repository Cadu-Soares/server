import jwt from "jsonwebtoken";

import User from "../models/User";
import {chekPassword} from "../services/auth";

import authConfig from "../config/auth"

class SessionsController {
  async create(req, res) {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});

    if(!user) {
      return res.status(401).json({error:"User or password invalid."});
    }
    if (!chekPassword(user, password)) {
      return res.status(401).json({error:"User or password invalid."});
    }
    const {id} = user;
    return res.json({
      user: {
        id, email
      },
      token: jwt.sign({id}, authConfig.secret, {
        expireIn: authConfig.expireIn,
      })
    });
  }
}

export default new SessionsController();