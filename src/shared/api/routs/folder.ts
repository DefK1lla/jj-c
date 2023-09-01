import {
    IFolder,
    IGetFolder,
    ISetFolder,
    IDeleteFolder,
    IUpdateFolder
} from "../../types/folder"

import { api, endpoints_folder } from "../index"
import { AxiosPromise } from "axios"

export const foldersGet = (
    getFolderForm: IGetFolder
): AxiosPromise<IFolder[]> => {
    return api.post(endpoints_folder.get_folders, getFolderForm)
}

export const folderGet = (
    getFolderForm: IGetFolder
): AxiosPromise<IFolder> => {
    return api.post(endpoints_folder.get_folder, getFolderForm)
}

export const folderSet = (
    setFolderForm: ISetFolder
): AxiosPromise<IFolder> => {
    return api.post(endpoints_folder.set_folder, setFolderForm)
}

export const folderDelete = (
    deleteFolderForm: IDeleteFolder
): AxiosPromise<IFolder> => {
    return api.post(endpoints_folder.delete_folder, deleteFolderForm)
}

export const folderUpdate = (
    updateFolderForm: IUpdateFolder
): AxiosPromise<IFolder> => {
    return api.post(endpoints_folder.update_folder, updateFolderForm)
}