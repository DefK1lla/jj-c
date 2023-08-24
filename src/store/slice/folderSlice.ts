import { createSlice } from "@reduxjs/toolkit"
import { IFolder } from "../../shared/types/folder"

interface IFolderState {
    folders: {
        data: IFolder[]
        request: boolean
    }
    folder: {
        data: IFolder
        request: boolean
    }
}

interface IActionPayload {
    type: string
    payload: {
        folders?: IFolder[]
        folder?: IFolder
    }
}

const initialState: IFolderState = {
    folders: {
        data: [{
            id: null,
            name: null,
            img: null,
            game_id: null
        }],
        request: false
    },
    folder: {
        data: {
            id: null,
            name: null,
            img: null,
            game_id: null,
        },
        request: false
    }
}

const folderSlice = createSlice({
    name: 'folderSlice',
    initialState,
    reducers: {
        newFoldersRequest: (state, action: IActionPayload) => {
            state.folders.data = action.payload.folders!.map((item) => {
                return item
            });
            state.folders.request = true;
        },
        newFolderRequest: (state, action: IActionPayload) => {
            state.folder.data = action.payload.folder!
            state.folder.request = true
        }
    }
});

export const {
    newFoldersRequest,
    newFolderRequest
} = folderSlice.actions

export default folderSlice.reducer