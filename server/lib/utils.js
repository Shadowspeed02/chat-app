import jwt from 'jsonwebtoken';

// function to generate a token for user
export const generateToken = (userID)=>{
    const token = jwt.sign({userID}, process.env.JWT_SECRET);
    return token;
}