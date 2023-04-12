import { IArstist } from "../Interfaces/IArtist";
import { IMusic } from "../Interfaces/IMusic";
import { IPlaylist } from "../Interfaces/IPlaylist";

export function newArtist(): IArstist{
    return {
        id: '',
        imageUrl: '',
        name: '',
        musics: []
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

export function newPlaylist(): IPlaylist{
    return {
        id: '',
        name: '',
        musics: [],
        imageUrl: ''
    }
}