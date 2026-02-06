enum RoleEnum {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface IUser {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    role: RoleEnum
}

