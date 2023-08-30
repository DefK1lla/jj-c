import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../shared/types/user";

interface IUserSate {
    id: string | null
    username: string | null
}

interface IActionPayload {
    type: string
    payload: {
        id: string
        username: string
    }
}

const initialState: IUserSate = {
    id: null,
    username: null
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action: IActionPayload) => {
            state.id = action.payload.id,
            state.username = action.payload.username
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer