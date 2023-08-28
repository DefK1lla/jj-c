import { IAuth, ISessionId } from "../../types/user";

import {api, endpoints_user} from "../index";
import { AxiosPromise } from "axios";

export const auth = (
    postUserForm: IAuth
): AxiosPromise<ISessionId> => {
    return api.post(endpoints_user.login, postUserForm)
}

export const logout = () => {
    return api.get(endpoints_user.logout);
}

export const signup = (
    postUserForm: IAuth
): AxiosPromise<ISessionId> => {
    return api.post(endpoints_user.signup, postUserForm)
}

export const getUser = (): AxiosPromise<IAuth> => {
    return api.get(endpoints_user.get_user)
}

export const putPassword = (
    password: string
) => {
    return api.post(endpoints_user.put_password, password)
}