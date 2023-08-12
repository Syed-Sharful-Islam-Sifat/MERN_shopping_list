import express from 'express'
import User from '../../models/User.js';
import bcrypt from 'bcryptjs'
import { jwtSecret } from '../../config/keys.js';
import jwt from 'jsonwebtoken';
import auth from '../../middleware/auth.js';

const router = express.Router();
// @ route POST api/auth
// @ desc Auth user
// @access Public

router.post('/login',async (req,res)=>{
   const {email,password} = req.body;
   
   if(!email|| !password){
    return res.status(400).json({msg: 'Please enter all fields'});
   }

   console.log(email,password);

   try{
      const user = await User.findOne({ email });
      console.log(user)
      if(!user)throw Error('User does not exist');
      console.log(password,user.password,password.type===user.password.type)
      const isMatch = await bcrypt.compare(password,user.password);

      console.log('isMatch',isMatch)

      if(!isMatch)throw Error('Invalid credendtials')

      const token = jwt.sign({ id: user._id}, jwtSecret , {
        expiresIn: 3600
      })

      if(!token)throw Error('Could not sign the token');
       console.log(isMatch)
      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      })
   }catch(err){
    res.status(400).json({msg: err.message})
   }


})

router.post('/register',async (req,res)=>{
  console.log('req',req.body)
   const {name,email,password} = req.body;

 
   
   if(!name|| !email || !password){
    return res.status(400).json({msg: 'Please enter all fields'});
   }
   

   //Check for existing user
   try{
      const user = await User.findOne({email})

      if(user)throw Error('user with same email already exists');
      const salt = await bcrypt.genSalt(10);
      if(!salt)throw Error('Something wrong with the bcrypt');

      const hash = await bcrypt.hash(password,salt);

      const newUser = new User({
        name,
        email,
        password: hash
      });

      const savedUser  = await newUser.save();

      if(!savedUser)throw Error('Something went wrong  saving the user');

      const token = jwt.sign({id: savedUser._id,} , jwtSecret , {
        expiresIn: 3600
      })

      res.status(200).json({
        token , 
        user:{
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email
        }
      })
   }catch(err){
    res.status(400).json({msg:err.message})
   }
})




// @route GET api/auth/user
// @desc GET user data
// @ access private

router.get('/user',auth,async(req,res)=>{
    
     try{
       
        const user = await User.findById(req.user.id).select('-password');
        if(!user)throw Error('User does not exist');
        res.json(user)
     }catch(err){
          res.status(400).json({msg: err.message});
     }
})


export default router




