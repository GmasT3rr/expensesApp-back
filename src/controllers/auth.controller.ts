import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../config";
import Role from "../models/Role";




const encryptPassword = async function(password:any)  {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
};

const comparePassword = async function(password:any,receivedPassword:any)  {
    return await bcrypt.compare(password,receivedPassword);
};




export const signUp = async (req:any,res:any) => {

try {
    const {username,email,password,roles} = req.body;

    const newUser = new User({
        username,
        email,
        password: await encryptPassword(password)
    });


    if(roles){
        const foundRoles:any = await Role.find({name:{$in:roles}});
        newUser.roles = foundRoles.map((role:any) => role._id);
    } else {
        const role:any = await Role.findOne({name:'user'});
        newUser.roles = role._id;
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({id:savedUser._id},config.SECRET,{
        expiresIn: 86400 // 24 hs
    });
    res.status(200).json({message:'User created succesfully',token});
} catch (err) {
     res.status(401).json({err});

}


};

export const signIn = async (req:any,res:any) => {

    try {
        const userFound:any = await User.findOne({email:req.body.email}).populate("roles");

        const currentUser:any = await User.findOne({email:req.body.email});
        const userID = currentUser._id
        if(!userFound) return res.status(400).json({message:"User not found"});
    
        const roles = userFound.roles.name;
        const receivedPassword = userFound.password;
        const matchPassword = await comparePassword(req.body.password,receivedPassword);
    
        if(!matchPassword) return res.status(401).json({message:"Invalid password"});
    
        const token = jwt.sign({id:userFound._id},config.SECRET,{
            expiresIn:86400 // 24 hs
        })
    
        res.json({token,roles,userID});
        
    } catch (err) {
        res.json({err});

    }
};
