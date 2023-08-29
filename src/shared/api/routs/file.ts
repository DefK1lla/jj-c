import {
    IFile,
    IGetFile,
    ISetFile,
    IDeleteFile,
    IUpdateFile,
    ISetTranslate,
    INewFile,
    IGetNewFiles
} from '../../types/file'

import { api, endpoints_file} from '../index'
import { AxiosPromise } from 'axios'

export const filesGet = (
    getFilesForm: IGetFile
): AxiosPromise<IFile[]> => {
    return api.post(endpoints_file.get_files, getFilesForm)
}

export const fileGet = (
    getFileForm: IGetFile
): AxiosPromise<IFile> => {
    return api.post(endpoints_file.get_file, getFileForm)
}

export const fileSet = (
    setFileForm: ISetFile
): AxiosPromise<IFile> => {
    return api.post(endpoints_file.set_file, setFileForm)
}

export const translateSet = (
    setTranslateForm: ISetTranslate
): AxiosPromise<IFile> => {
    return api.post(endpoints_file.set_translate, setTranslateForm)
}

export const fileDelete = (
    deleteFileForm: IDeleteFile
): AxiosPromise<IFile> => {
    return api.post(endpoints_file.delete_file, deleteFileForm)
}

export const fileUpdate = (
    updateFileForm: IUpdateFile
): AxiosPromise<IFile> => {
    return api.post(endpoints_file.update_file, updateFileForm)
}

export const getNewFiles = (
    getFilesForm: IGetNewFiles
): AxiosPromise<INewFile[]> => {
    return api.post(endpoints_file.get_newfile, getFilesForm)
}