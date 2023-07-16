import { response } from 'express';
import jwt from'jsonwebtoken';
import dotenv from'dotenv';
import User from '../model/user.js';
import bcrypt from'bcrypt';
import Token from '../model/token.js';

dotenv.config();
 export const signupUser=async(request,response)=>{
    try{
        // 12345
        // sdhfudhfkjdhvkcfj{12345}nfj4j
       // const salt=await bcrypt.genSalt();
        const hashedPAssword=await bcrypt.hash(request.body.password,10);
        const user={username:request.body.username, name:request.body.name, password:hashedPAssword};
         
        // validating the data
        const newUSer=new User(user);
        // saving the data
        await newUSer.save();
        return response.status(200).json({msg:'signup successful'})
     }
    catch(error){
return response.status(500).json({msg:'Error while signup the user'})
    }
    
}

export const loginUser=async(request,response)=>{
    // check whether username exists in the database or not
    let user=await User.findOne({username:request.body.username});
    if(!user){
        return response.status(400).json({msg:'USername does not match'});
    }
    try{
       let match= await bcrypt.compare(request.body.password, user.password);
        if(match)
        {
          const accessToken=jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn:'15m'});
          const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
         const newToken=new Token({token:refreshToken})
        await newToken.save();

    return response.status(200).json({accessToken:accessToken , refreshToken:refreshToken , name:user.name, username:user.username});

        }
        //if username mathches , the compare password , first decrypt the password then compare the password entered in frontend

else{
   return  response.status(400).json({msg:'Password does not match'});
}
    }
    catch(error)
    {
return response.status(500).json({msg:'Error while login in user'});
    }
}

