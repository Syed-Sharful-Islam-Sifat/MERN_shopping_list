import express from 'express'
import User from '../../models/User.js';
import bcrypt from 'bcryptjs'
import { jwtSecret } from '../../config/keys.js';
import jwt from 'jsonwebtoken'
const router = express.Router();
// @ route POST api/auth
// @ desc Auth user
// @access Public

router.post('/',(req,res)=>{
   const {email,password} = req.body;
   
   if(!email || !password){
    return res.status(400).json({msg: 'Please enter all fields'});
   }
   

   //Check for existing user
   User.findOne({email: email})
       .then(user=>{
          if(!user) return res.status(400).json({msg: "User does not exists"});
          const newUser = new User({
            email,
            password
          });


          // validate password
          
          bcrypt.compare(password,user.password)
             .then(isMatch=>{
                console.log(isMatch)
                if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'})
                // jwt.sign(
                //     {id: user.id},
                //     jwtSecret,
                //     {expiresIn: 3600},

                //     (err,token)=>{
                //         console.log(token)
                //         if(err) throw err
                      
                //         res.json({token,
                //           user:{
                //             id: user.id,
                //             name:user.name,
                //             email:user.email,
                //           }
                //         })
                //     }
                     
                //  )
             }).catch(err=>console.log(err))
       })
})


export default router




