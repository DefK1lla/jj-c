import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../shared/types/user";

interface IUserSate {
    id: string | null
    username: string | null
    admin: boolean | null
}

interface IActionPayload {
    type: string
    payload: {
        id: string
        username: string
        admin: boolean
    }
}

const initialState: IUserSate = {
    id: null,
    username: null,
    admin: false
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action: IActionPayload) => {
            state.id = action.payload.id,
            state.username = action.payload.username
            state.admin = action.payload.admin
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer