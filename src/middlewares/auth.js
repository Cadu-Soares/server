import  jwt  from "jsonwebtoken";
import {promisify} from "util";

import authConfig from "../config/auth";

export default async (req, res, next) => {
  const authHader = req.headers.authorization;

  if(!authHader) {
    return res.status(401).json({error: 'Token was not provided.'});
  }
  const [, token] = authHader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  }catch (err) {
    return res.status(401).json({error:"Invalid token."})
    
  }

  const authenticated = true;

    if (authenticated) {
      return next();
    } else {
      return res.status(401).json();
    }
}

