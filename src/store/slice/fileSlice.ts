import { createSlice } from "@reduxjs/toolkit"
import { IFile } from "../../shared/types/file"

interface IFileState {
    files: {
        data: IFile[]
        request: boolean
    }
    file: {
        data: IFile
        request: boolean
    }
}

interface IActionPayload {
    type: string
    payload: {
        files?: IFile[]
        file?: IFile
    }
}

const initialState: IFileState = {
    files: {
        data: [
            {
                id: null,
                name: null,
                data: null,
                local: null,
                folder_id: null
            }
        ],
        request: false
    },
    file: {
        data: {
            id: null,
            name: null,
            data: null,
            local: null,
            folder_id: null
        },
        request: false
    }
}

const fileSlice = createSlice({
    name: 'fileSlice',
    initialState,
    reducers: {
        newFilesRequest: (state, action: IActionPayload) => {
            state.files.data = action.payload.files!.map((item) => {
                return item
            })
            state.files.request = true
        },
        newFileRequest: (state, action: IActionPayload) => {
            state.file.data = action.payload.file!
            state.file.request = true
        }
    }
})

export const {
    newFilesRequest,
    newFileRequest
} = fileSlice.actions
export default fileSlice.reducer