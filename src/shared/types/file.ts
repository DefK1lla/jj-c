export interface IFile {
    id: string | null,
    name: string | null,
    local: string | null,
    data: string | null,
    folder_id: string | null
}

export interface IGetFile {
    id: string
}

export interface ISetFile extends IGetFile {}

export interface IDeleteFile extends IGetFile {}

export interface IUpdateFile {
    id: string,
    name?: string,
    data?: string
}