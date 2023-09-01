export interface IAuth {
    id?:string
    username: string
    password: string
    admin?: boolean
}

export interface ISessionId {
    id: string
}

export interface IResetPassword {
    id: string
    old_password: string
    new_password: string
}
