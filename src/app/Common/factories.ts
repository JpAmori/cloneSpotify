import { IArstist } from "../Interfaces/IArtist";
import { IMusic } from "../Interfaces/IMusic";

export function newArtist(): IArstist{
    return {
        id: '',
        imageUrl: '',
        name: ''
    }
}

export function newMusic(): IMusic{
    return {
        id: '',
        title: '',
        artists:[],
        album: {
            id: '',
            name: '',
            imagemUrl: ''
        },
        time: ''
    }
}