export interface IFolder {
    id: string | null
    name: string | null
    img: string | null
    game_id: string | null
}

export interface IGetFolder {
    id: string
}

export interface ISetFolder extends IGetFolder {}

export interface IDeleteFolder extends IGetFolder {}

export interface IUpdateFolder {
    id: string,
    name: string,
    img: string
}