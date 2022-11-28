import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";
const secret = "test";
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "user does not exit" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "20h",
    });
    res.status(200).json({ result: {
      email: oldUser.email,
      name: oldUser.name,
      _id: oldUser._id
    }, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: name,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "20h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

export const googleSignin = async(req,res)=>{
  const {email,name,token,googleId} =req.body;
  try{
   const oldUser = await UserModal.findOne({email});
   if(oldUser){
    const result ={_id:oldUser._id.toString(),email,name};
    return res.status(200).json({
      result,token
    });
   }
   const result = await UserModal.create({
    email,
    name,
    googleId
   });
   res.status(200).json({result,token})
  }
  catch(err){
     res.status(500).json({message:'Something went Wrong'})
  }
}
