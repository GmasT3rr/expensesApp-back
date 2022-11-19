import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkDuplicateUsernameOrEmail = async (req:any,res:any,next:any) => {
    const user = await User.findOne({username: req.body.username});

    if(user) return res.status(400).json({message:"This user already exists"});

    const email = await User.findOne({email:req.body.email});

    if(email) return res.status(400).json({message:"This email already exists"});

    next();
};

export const checkRolesExists = (req:any,res:any,next:any) => {

    const roles = req.body.roles;

    if(!roles){
     return res.status(400).json({message:`Role ${roles} does not exist`});
        
    }

    next();
};