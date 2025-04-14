import IRoles from "./role";

export default interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
  role: IRoles;
}
