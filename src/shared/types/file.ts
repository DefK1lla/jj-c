export interface IFile {
    id: string | null,
    name: string | null,
    local: string | null,
    data: string | null,
    folder_id: string | null,
    translate: string | null
}

export interface IGetFile {
    id: string
}

export interface ISetFile {
    name: string | null,
    local: string | null,
    data: string | null,
    folder_id: string | null,
    author_id: string
}

export interface ISetTranslate {
    id: string,
    translate: string
}

export interface IDeleteFile extends IGetFile {}

export interface IUpdateFile {
    id: string,
    name?: string,
    data?: string
}

export interface INewFile {
    id: string,
    name: string,
    local: string
}

export interface INewFiles {
    newFiles: INewFile[]
}

export interface IGetNewFiles {
    id: string
}

export interface IGetFilesByAuthorId {
    id: string
}

export interface IFilesByAuthorId extends INewFile {
    translate: any
}