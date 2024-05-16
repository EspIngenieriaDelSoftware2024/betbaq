import { BaseModel } from "../base/base.interface";

export interface UserModel extends BaseModel{
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    termsAccepted: boolean;
}