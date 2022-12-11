import Role from "../models/Role";


export const getRoles = async (req: any, res: any) => {
    try {
        const response = await Role.find();
        res.status(200).json(response);
      } catch (err) {
        res.status(500).json(err);
      }

  };