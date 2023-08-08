import express from 'express'
import User from '../../models/User.js';
import bcrypt from 'bcryptjs'
import { jwtSecret } from '../../config/keys.js';
import jwt from 'jsonwebtoken'
const router = express.Router();
// @ route POST api/users
// @ desc Register new user
// @access Public

router.post('/',(req,res)=>{
   const {name,email,password} = req.body;
   
   if(!name|| !email || !password){
    return res.status(400).json({msg: 'Please enter all fields'});
   }
   

   //Check for existing user
   User.findOne({email: email})
       .then(user=>{
          if(user) return res.status(400).json({msg: "User already exists"});
          const newUser = new User({
            name,
            email,
            password
          });


          // create salt & hash
          bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
               if(err)throw err;
               newUser.password = hash
               newUser.save()
                  .then(user=>{
                    
                     jwt.sign(
                        {id: user.id},
                        jwtSecret,
                        {expiresIn: 3600},

                        (err,token)=>{
                            console.log(token)
                            if(err) throw err
                          
                            res.json({token,
                              user:{
                                id: user.id,
                                name:user.name,
                                email:user.email,
                              }
                            })
                        }
                         
                     )
                    
                  })
            })
          })
       })
})


export default router




