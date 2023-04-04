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
        imageUrl: playlist.images.pop().url
    }
}