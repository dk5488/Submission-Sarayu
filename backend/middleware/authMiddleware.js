import admin1 from 'firebase-admin';
import User from '../models/UserModel.js'; 
import mongoose from 'mongoose';



const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Token in authMiddleware: ",authHeader)
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

    console.log("actual Token in authMiddleware: ",token)
  try {
    const decodedToken = await admin1.auth().verifyIdToken(token);
    const uid = decodedToken.uid; 

    
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      return res.status(404).json({
        success:false,
        message:"User Not found"
      })
    }

    
    req.userId = user._id;
    next();
  } catch (error) {
    console.log("Auth middleware error:", error);
    res.status(400).json({ error: "Invalid token" });
  }
};

export default authMiddleware;





























/*const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Token in authMiddleware:", authHeader);

 
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied" });
  }

  
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

    console.log("Actual token: ",token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Auth middleware error: ", error);
    res.status(400).json({ error: "Invalid token" });
  }
};

export default authMiddleware;*/
