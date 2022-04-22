export interface ILogin {
    Username: string,
    Password: string
}

export interface ISystemLogin<T> {
    loggedIn: boolean,
    DataResponse: IResponse<T> | undefined,
    accessToken: string | undefined,
    Error: boolean
}

export interface IResponse<T> {
    Object?: T,
    Message?: string,
    Error?: boolean,
    AccessToken?: string
}

export interface IResponseProduct<T> {
    Object?: T[],
    Message?: string,
    Error?: boolean,
    Action?: {
        canForward?: boolean,
        canFinish?: boolean
    }
}

export interface IResponseJson<T> {
    DataResponse?: IResponse<T>
}

export interface IResponseJsonProduct<T> {
    DataResponse?: IResponseProduct<T>,
}

export interface DateTime {
    createdAt: Date;
    updatedAt: Date;
}

export interface UserDocument extends DateTime {
    Username: string;
    FullName: string;
    PhoneNumber: string;
    Password: string;
    Gender: number; // 1: Male - 2: Female
    Rule: number;
}

export interface IProductResponse {
    product: IResponseJsonProduct<IProductDocument> | undefined,
    productDetail: IResponseJsonProduct<IProductDocument> | undefined,
    addResult: IResponseJsonProduct<IProductDocument> | undefined,
}

export interface IProductDocument extends DateTime {
    _id: string;
    NameProduct: string;
    UserSend: string;
    UserSendAddress: string;
    PhoneNumberSend: string;
    UserCreated: UserDocument[];
    Status: string;
    Shipper: UserDocument[];
    Weight: Number;
    UserReceive: string;
    PhoneNumberReceive: string;
    AddressReceive: string;
    Note: String | null;
    Action: {
        canFinish: boolean,
        canForward: boolean,
        canEdit: boolean,
        canDelete: boolean
    }
}

export interface IProductDocumentPost {
    NameProduct: string;
    UserSend: string;
    UserSendAddress: string;
    PhoneNumberSend: string;
    Weight: number;
    UserReceive: string;
    PhoneNumberReceive: string;
    AddressReceive: string;
    Note: string | number;
}

export interface IProductDocumentUpdate<T> {
    model: T,
    id?: string
}