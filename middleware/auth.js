import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js'
const secret = "test";

const auth = async (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length<500; 
        let decodeData;
        if(token && isCustomAuth){
            decodeData = jwt.verify(token,secret);
            req.userId = decodeData?.id;
        }else{
            decodeData = jwt.decode(token);
            const googleId = decodeData?.sub.toString();
            const user = await UserModel.findOne({googleId});
            req.userId = user?._id;
        }
        next();
    }
    catch(err){
     console.log(err);
    }
}
export default auth;