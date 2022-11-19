import config from "../config";
import User from "../models/User";
import Role from "../models/Role";
import  Jwt  from "jsonwebtoken";

export const verifyToken = async (req:any,res:any,next:any) => {
try {
    const token = req.headers["x-access-token"];
    const uselessToken = req.headers["token"];
    if(uselessToken) 
    return res.status(403).json({ mesage:"Make sure you are sending 'token' as 'x-access-token'"});

    if(!token) 
    return res.status(403).json({ mesage:"No token provided"});

    const decoded:any = Jwt.verify(token,config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, {password:0});

    if(!user) return res.status(404).json({message:"User not found"});


    next();
} catch (err) {
    return res.status(401).json({message:"Unauthorized"});
}
};

    
export const isAdmin = async (req:any,res:any,next:any) => {
    const user:any = await User.findById(req.userId);
    // const roles = await Role.find({_id:{$in:user.roles.name}});
    const roles = await Role.find(user.roles);

    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === "admin"){
            next();
            return;
        }else{
            return res.status(401).json({message:"Unauthrized. Required Admin permissions"});
        }
    }


};