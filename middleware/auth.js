import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/keys.js";
function auth(req,res,next){
    const token = req.header('x-auth-token');
     console.log('middleware token: ',token);
    // Check for token
    
    if(!token){
     return res.status(401).json({msg:'No token, authrization denied'})
    }

    try{

        // verify token
        const decoded = jwt.verify(token,jwtSecret);
    
        //Add user from payload
    
        req.user = decoded;
        next();
    }catch(err){
        res.status(400).json({msg:'Token is not valid'})
    }

}

export default auth