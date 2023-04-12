import { IMusic } from "./IMusic"

export interface IArstist{
    id: string,
    name: string,
    imageUrl: string
    musics?: IMusic[],
}