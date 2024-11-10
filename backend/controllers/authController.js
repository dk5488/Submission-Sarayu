import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {admin1} from '../firebaseAdmin.js'


export const registerUser=async (req,res)=>{
    const { token,name } = req.body;

  try {
    const decodedToken = await admin1.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      
      user = await User.create({
        firebaseUid: uid,
        email,
        name
      });
    }

    res.status(200).json({
      message: 'User registered successfully',
      userId: user._id,  
    });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'User registration failed' });
  }
}


export const loginUser=async (req,res)=>{
    const { token } = req.body;

    try {
        
        const decodedToken = await admin1.auth().verifyIdToken(token);
        const { uid, email } = decodedToken;

        
        let user = await User.findOne({ firebaseUid: uid });

        

        
        res.status(200).json({
            message: "User logged in successfully",
            userId: user._id,
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({
            message: "User Not found",
        });
    }
    
}