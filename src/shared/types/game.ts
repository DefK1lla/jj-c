export interface IGame {
    id: string | null
    name: string | null
    img: string | null
    author_id: string | null
}

export interface IGetGame {
    id: string
}

export interface ISetGame extends IGetGame {}

export interface IDeleteGame extends IGetGame {}

export interface IUpdateGame {
    id: string,
    name?: string,
    img?: string
}