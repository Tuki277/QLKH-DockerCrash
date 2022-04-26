import { findUserService } from "../services/user.service"

export const checkPhoneNumberDuplicated = async (phoneNumber: string): Promise<boolean> => {
    const user = await findUserService({ PhoneNumber: phoneNumber})
    if (user) {
        return false;
    } else {
        return true;
    }
}

export const checkUsernameDuplicated = async (username: string): Promise<boolean> => {
    const user = await findUserService({ Username: username})
    if (user) {
        return false;
    } else {
        return true;
    }
}

export const checkCan = (status: string) => {
    switch (status) {
        case "New":
            return {
                canForward: true,
                canFinish: false, 
                canEdit: true,
                canDelete: true
            }
        case "Delivered":
            return {
                canForward: false,
                canFinish: true,
                canEdit: false,
                canDelete: false
            }
        case "Finish": 
            return {
                canForward: false,
                canFinish: false,
                canEdit: false,
                canDelete: false
            }
        case "Rejected":
            return {
                canForward: true,
                canFinish: false,
                canEdit: true,
                canDelete: true
            }
    }
}