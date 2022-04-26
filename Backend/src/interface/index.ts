import mongoose from "mongoose";

export interface DateTime {
    createdAt: Date;
    updatedAt: Date;
}

export interface UserDocument extends mongoose.Document, DateTime {
    Username: string;
    FullName: string;
    PhoneNumber: string;
    Password: string;
    Gender: number; // 1: Male - 2: Female
    Rule: number;
    comparePassword(candidatePassword: string): Promise<boolean>
}

export interface IProductDocument extends mongoose.Document, DateTime {
    NameProduct: string;
    UserSend: string;
    UserSendAddress: string;
    PhoneNumberSend: string;
    UserCreated: UserDocument["_id"];
    Status: string;
    Shipper: UserDocument["_id"];
    Weight: Number;
    UserReceive: string;
    PhoneNumberReceive: string;
    AddressReceive: string;
    Note: String | null;
}

export interface IResponse<T> {
    Object?: T[],
    Message?: string,
    Error?: boolean,
    AccessToken?: string,
    Action?: {
        canForward?: boolean,
        canFinish?: boolean
    }
}