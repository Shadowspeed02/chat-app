// import { generateToken } from "../lib/utils.js";
// import User from "../models/userModel.js";
// import bcrypt from "bcryptjs";
// import cloudinary from "../lib/cloudinary.js"

// export const signup = async (req, res)=> {
//     const { email, fullName, password, bio } = req.body;

//     try {
//         if( !email || !fullName || !password ) {
//             return res.json({success: false, message: "Missing Details" });
//         }
//         const user = await User.findOne({ email });

//         if(user) {
//            return res.json({success: false, message: "Account alredy exists" });  
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = await User.create({
//             fullName, email, password: hashedPassword, bio
//         });

//         const token = generateToken(newUser._id);

//         return res.json({success: true, userData: newUser, token, message: "Account created successfully"})

// }    catch (error)
//     {
//         console.log(error);
//          res.json({success: false, message: error.message})
//      }
// }

// // controller to login the user
// // ...existing code...

// export const login = async (req, res)=> {
//     try{
//         const { email, password } = req.body;
//         const userData = await User.findOne({ email });

//         if (!userData) {
//             return res.json({success: false, message: "User not found"});
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, userData.password);
//         if(!isPasswordCorrect){
//             return res.json({success: false, message: "Invalid Credentials"});
//         }

//         const token = generateToken(userData._id);
//         return res.json({success: true, userData, token, message: "Login successful"});
        
//     }
//     catch (error) {
//          console.log(error);
//        return  res.json({success: false, message: error.message})
//     }
// }

// // controller to update user profile details
// export const updateProfile = async (req, res) => {
//     try {
//         const { profilePic, fullName, bio } = req.body;
//         const user = req.user._id;
//         let updatedUser;

//         if(!profilePic){
//             updatedUser = await User.findByIdAndUpdate(user, { fullName, bio }, { new: true });
//         }
//         else{
//             const upload = await cloudinary.uploader.upload(profilePic)
//             updatedUser = await User.findByIdAndUpdate(user, {
//                 fullName, bio, profilePic: upload.secure_url
//             }, { new: true });
//         }
//        return res.json({success: true, user: updatedUser})
//     } catch (error) {
//         console.log(error.message);
//       return res.json({success: false, message: error.message});
//     }
// }

import { generateToken } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res)=> {
 const { email, fullName, password, bio } = req.body;

try {
 if( !email || !fullName || !password ) {
return res.json({success: false, message: "Missing Details" });
 }
 const user = await User.findOne({ email });

if(user) {
return res.json({success: false, message: "Account already exists" });
 }

 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password, salt);

 const newUser = await User.create({
 fullName, email, password: hashedPassword, bio
 });

 const token = generateToken(newUser._id);

 return res.json({success: true, userData: newUser, token, message: "Account created successfully"})

} catch (error) {
 console.log(error);
 return res.json({success: false, message: error.message})
}
};

// controller to login the user
export const login = async (req, res)=> {
 try{
 const { email, password } = req.body;
 const userData = await User.findOne({ email });

 if (!userData) {
 return res.json({success: false, message: "User not found"});
 }

 const isPasswordCorrect = await bcrypt.compare(password, userData.password);
 if(!isPasswordCorrect){
return res.json({success: false, message: "Invalid Credentials"});
 }

 const token = generateToken(userData._id);
 return res.json({success: true, userData, token, message: "Login successful"});

 } catch (error) {
 console.log(error);
 return res.json({success: false, message: error.message})
}
};

// controller to update user profile details
export const updateProfile = async (req, res) => {
 try {
 const { profilePic, fullName, bio } = req.body;
 const userId = req.user._id;
let updatedUser;

if(!profilePic){
 updatedUser = await User.findByIdAndUpdate(userId, { fullName, bio }, { new: true });
 }
 else{
 const upload = await cloudinary.uploader.upload(profilePic)
 updatedUser = await User.findByIdAndUpdate(userId, {
 fullName, bio, profilePic: upload.secure_url
 }, { new: true });
 }
 return res.json({success: true, user: updatedUser})
 } catch (error) {
console.log(error.message);
 return res.json({success: false, message: error.message});
 }
};