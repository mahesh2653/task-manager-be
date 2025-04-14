import UserModel from "../model/user.model";

export default class UserService {
  static createUser = async (data: any) => {
    const user = await UserModel.insertOne(data);
    return user;
  };

  static getUser = async (id: string) => {
    const user = await UserModel.findById(id);
    return user;
  };

  static getAllUser = async () => {
    const user = await UserModel.find().select("-password");
    return user;
  };

  static getUserByUserName = async (username: string) => {
    return await UserModel.findOne({ username }).lean();
  };

  static getOneUserByAny = async (filter: object) => {
    return await UserModel.findOne(filter);
  };
}
