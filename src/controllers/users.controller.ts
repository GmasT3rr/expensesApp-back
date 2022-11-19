import User from '../models/User'

export const createUser = (req:any,res:any) => {
    res.json({
        message:"creating user",
        API_INFO:"This method makes nothing yet"
    });
};
export const getUsers = async (req:any,res:any) => {
    try {
        const response =  await  User.find();
        res.status(200).json(response);

    } catch (err) {
        res.status(500).json(err);
    }

};
export const getUsersById = async (req:any,res:any) => {
    const emailTofind = req.body.email
    try {
        if(!emailTofind) res.status(401).json({message:'No user provided'})
        const response =  await  User.find({email:`${emailTofind}`});
        res.status(200).json(response);

    } catch (err) {
        res.status(500).json(err);
    }
};
export const deleteUserById = (req:any,res:any) => {
    res.json({
        message:"deleting user by id",
        API_INFO:"This method makes nothing yet"
    });
};
export const modifyUserById = (req:any,res:any) => {
    res.json({
        message:"modifying user",
        API_INFO:"This method makes nothing yet"
    });
};