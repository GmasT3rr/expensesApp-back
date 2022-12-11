import Role from "../models/Role";
import User from "../models/User";

export const getUsers = async (req: any, res: any) => {
  try {
    const response = await User.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUsersById = async (req: any, res: any) => {
  const userTofind = req.params.id;
  try {
    if (!userTofind) res.status(401).json({ message: "No user provided" });
    const response = await User.find({ _id: `${userTofind}` });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }

};

export const deleteUserById = async (req: any, res: any) => {
  const userId = await req.params.id;
  try {
    const response = await User.findByIdAndDelete(userId);
    res.status(200).json({
      deletedUser: response,
    });
  } catch (err: any) {
    res.status(404).json({ message: err });
  }
};

export const modifyUserById = async (req: any, res: any) => {
  const userId = await req.params.id;
  const newUserRole = await req.body.roles;
  try {
    let encriptedRole: any;
    if (newUserRole) {
      const foundRoles: any = await Role.find({ name: { $in: newUserRole } });
      encriptedRole = foundRoles.map((role: any) => role._id);
      console.log("Encripted role", encriptedRole);
    }
    const response = await User.findByIdAndUpdate(
      userId,
      { roles: encriptedRole },
      { new: true }
    );

    switch (response) {
      case null:
        res.status(404).json({ message: "Este usuario no existe" });
        break;

      default:
        res.status(200).json({
          // message:"modifying user",
          // API_INFO:"This method makes nothing yet",
          userId: userId,
          encriptedRole: encriptedRole.toString(),
          newUserRole: newUserRole,
          userInfo: response,
        });
        break;
    }
  } catch (err: any) {
    switch (err.name) {
      case "CastError":
        res.status(404).json({ message: "Este usuario no existe" });
        break;

      default:
        res.status(404).json({ message: err });
        break;
    }
  }
};
