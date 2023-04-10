import { addMilliseconds, format } from "date-fns";
import { IArstist } from "../Interfaces/IArtist";
import { IMusic } from "../Interfaces/IMusic";
import { IPlaylist } from "../Interfaces/IPlaylist";
import { IUser } from "../Interfaces/IUser";

export function SpotifyUserforUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser{
    return {
        id: user.id,
        name: user.display_name,
        imageUrl: user.images.pop().url
    }
}

export function SpotifyPlaylistforPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist{
    return {
        id: playlist.id,
        name: playlist.name,
        // imageUrl: playlist.images.pop().url
    }
}

export function SpotifyArtistforArtist(spotifyArtist: SpotifyApi.ArtistObjectFull): IArstist{
    return {
        id: spotifyArtist.id,
        name: spotifyArtist.name,
        imageUrl: spotifyArtist.images.sort((a, b) => a.width - b.width).pop().url
    }
}

export function SpotifyTrackforTrack(spotifyTrack: SpotifyApi.TrackObjectFull): IMusic{
    
    const msForMinutes = (ms: number)=>{
        const data = addMilliseconds(new Date(0), ms);
        return format(data, 'mm:ss');
    }
    
    return {
        id: spotifyTrack.uri,
        title: spotifyTrack.name,
        album:{
            id: spotifyTrack.id,
            imagemUrl: spotifyTrack.album.images.shift().url,
            name: spotifyTrack.album.name
        },
        artists: spotifyTrack.artists.map(artists => ({
            id: artists.id,
            name: artists.name
        })),
        time: msForMinutes(spotifyTrack.duration_ms)
    }
}